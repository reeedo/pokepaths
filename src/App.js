import React, { Component } from 'react';

import { NO_TILE, INVALID_LOC, TILE_TYPES } from './enums';
import Palette from './components/Palette';
import Commander from './components/Commander';
import Grid, { gridFromData } from './components/Grid';
import './App.css';

const { START, FREE, BLOCKED, END } = TILE_TYPES;

const defaultPokeData = {
  sideLength: 4,
  impassables: [],
  startingLoc: { x: INVALID_LOC, y: INVALID_LOC },
  endingLoc: { x: INVALID_LOC, y: INVALID_LOC }
  // impassables: [
  //   { x: 2, y: 0 },
  //   { x: 2, y: 1 },
  //   { x: 2, y: 2 },
  // ],
  // startingLoc: { x: 1, y: 0 },
  // endingLoc: { x: 2, y: 3 }
};

const FIND_PATH_URL = 'https://frozen-reef-96768.herokuapp.com/find-path';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeData: { ...defaultPokeData },
      grid: gridFromData(defaultPokeData),
      selectedType: NO_TILE,
      errorMsg: '',
      pathResponse: '',
      moves: []
    };
  }
  onSize = (size) => {
    this.setState(prevState => {
      size = parseInt(size, 10);
      if (isNaN(size) || size <= 0) {
        return { errorMsg: `size '${size}' is invalid` };
      }
      const pokeData = { ...prevState.pokeData };
      // reset all the data
      pokeData.sideLength = size;
      pokeData.impassables = [];
      pokeData.startingLoc = { x: INVALID_LOC, y: INVALID_LOC };
      pokeData.endingLoc = { x: INVALID_LOC, y: INVALID_LOC };
      // rebuild the grid
      const grid = gridFromData(pokeData);
      // clear moves
      const moves = [];
      // clear error
      const errorMsg = '';
      return { pokeData, grid, moves, errorMsg };
    })
  };
  onFindPath = () => {
    // update pokeData from grid
    const { pokeData, grid } = this.state;
    // reset impassables just in case
    pokeData.impassables = [];
    for( let i=0; i<grid.length; i++ ) {
      const row = grid[i];
      for( let j=0; j<row.length; j++ ) {
        const tile = row[j];
        if( tile === BLOCKED ) {
          pokeData.impassables.push({x: j, y: i});
        }
      }
    }
    console.log(pokeData);
    // we should already have start and end
    fetch(FIND_PATH_URL, {
      method: 'post',
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(pokeData)
    })
      .then(response => response.json())
      .then((data) => {
        let errorMsg = '';
        let moves = [];
        if (data.moves) {
          moves = data.moves;
        } else {
          errorMsg = data.message;
        }
        this.setState({ moves, errorMsg })
      })
      .catch((error) => {
        debugger;
        const errorMsg = error.message;
        this.setState({ errorMsg, moves: [] });
      })
  }
  onTileSelected = (selectedType) => {
    this.setState(prevState => {
      return {selectedType}
    });
  };
  onTileClicked = (loc) => {
    let { selectedType } = this.state;
    if (selectedType === NO_TILE) {
      // no tile to deposit
      return;
    }
    this.setState(prevState => {
      const { grid } = prevState;
      const pokeData = { ...prevState.pokeData };
      if (selectedType === START) {
        // set new starting loc
        pokeData.startingLoc = loc;
        // overwrites end if same
        if (pokeData.endingLoc.x === loc.x && pokeData.endingLoc.y === loc.y) {
          pokeData.endingLoc = { x: INVALID_LOC, y: INVALID_LOC }
        }

        // make sure location is free
        selectedType = FREE;
      } else if (selectedType === END) {
        // set new end loc
        pokeData.endingLoc = loc;
        // overwrites start if same
        if (pokeData.startingLoc.x === loc.x && pokeData.startingLoc.y === loc.y) {
          pokeData.startingLoc = { x: INVALID_LOC, y: INVALID_LOC }
        }
        
        // make sure location is free
        selectedType = FREE;
      }
      // set the tile
      grid[loc.y][loc.x] = selectedType;
      return { pokeData, grid };
    });
  };

  render() {
    return (
      <div className="editCtnr">
        <div className="controlCtnr">
          <Commander onSize={this.onSize} onFindPath={this.onFindPath} />
          <div className="errorCtnr">
            <div className="errorMsg">
              {this.state.errorMsg}
            </div>
          </div>
          <Palette
            onTileSelected={this.onTileSelected}
            selectedType={this.state.selectedType}
          />
        </div>
        <Grid
          grid={this.state.grid}
          startingLoc={this.state.pokeData.startingLoc}
          endingLoc={this.state.pokeData.endingLoc}
          moves={this.state.moves}
          onTileClicked={this.onTileClicked}
        />
      </div>
    );
  }
};

export default App;
