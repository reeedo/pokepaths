import React, { Component } from 'react';

import { NO_TILE, INVALID_LOC, TILE_TYPES } from './enums';
import Palette from './components/Palette';
import Commander from './components/Commander';
import Grid, { gridFromData } from './components/Grid';
import './App.css';

const { START, FREE } = TILE_TYPES;

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

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokeData: { ...defaultPokeData },
      grid: gridFromData(defaultPokeData),
      selectedType: NO_TILE
    };
  }
  onSize = (size) => {
    size = parseInt(size, 10);
    if (size <= 0) {
      alert(`size '${size}' is invalid`);
      return;
    }
    this.setState(prevState => {
      const pokeData = { ...prevState.pokeData };
      // reset all the data
      pokeData.sideLength = size;
      pokeData.impassables = [];
      pokeData.startingLoc = { x: INVALID_LOC, y: INVALID_LOC };
      pokeData.endingLoc = { x: INVALID_LOC, y: INVALID_LOC };
      // rebuild the grid
      const grid = gridFromData(pokeData);
      return { pokeData, grid };
    })
  };
  onFindPath = () => {
    alert('Find path');
  }
  onTileSelected = (selectedType) => {
    this.setState(prevState => {
      return {selectedType}
    });
  };
  onTileClicked = (loc) => {
    const { selectedType } = this.state;
    if (selectedType === NO_TILE) {
      // no tile to deposit
      return;
    }
    this.setState(prevState => {
      const { grid } = prevState;
      if (selectedType === START) {
        // if this is already the start, we've nothing to do
        if (prevState.pokeData.startingLoc === loc) {
          return prevState;
        }
        // set new starting loc
        const pokeData = { ...prevState.pokeData }
        pokeData.startingLoc = loc;

        // if location is FREE, we're done
        if (grid[loc.y][loc.x] === FREE) {
          return { pokeData };
        }
        // if location is not FREE, need to update it
        grid[loc.y][loc.x] = FREE;
        return { pokeData, grid };
      }
      // set a normal tile
      // don't bother if the current location matches
      if (grid[loc.y][loc.x] === selectedType) {
        return prevState;
      }
      // we're changing it, so we need to update
      grid[loc.y][loc.x] = selectedType;
      return { grid };
    });
  };

  render() {
    return (
      <div className="editCtnr">
        <div className="controlCtnr">
          <Commander onSize={this.onSize} onFindPath={this.onFindPath} />
          <Palette
            onTileSelected={this.onTileSelected}
            selectedType={this.state.selectedType}
          />
        </div>
        <Grid
          grid={this.state.grid}
          startingLoc={this.state.pokeData.startingLoc}
          onTileClicked={this.onTileClicked}
        />
      </div>
    );
  }
};

export default App;
