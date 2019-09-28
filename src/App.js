import React, { Component } from 'react';

import { NO_TILE, INVALID_LOC } from './enums';
import Palette from './components/Palette';
import Commander from './components/Commander';
import Grid from './components/Grid';
import './App.css';

const defaultGridMap = {
  sideLength: 4,
  impassables: [],
  startingLoc: { x: INVALID_LOC, y: INVALID_LOC },
  endingLoc: { x: INVALID_LOC, y: INVALID_LOC }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gridMap: { ...defaultGridMap },
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
      const gridMap = { ...prevState.gridMap };
      gridMap.sideLength = size;
      return { gridMap };
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
        <Grid gridMap={this.state.gridMap}/>
      </div>
    );
  }
};

export default App;
