import React from 'react';

import { TILE_TYPES, TILE_SZ, INVALID_LOC } from '../enums';
import { renderTile } from '../utils/images';
import Tile from './Tile';

const { FREE, BLOCKED, START, END } = TILE_TYPES;

export const gridFromData = pokeData => {
  const grid = new Array(pokeData.sideLength);
  for (let i=0; i<pokeData.sideLength; i++) {
    let row = new Array(pokeData.sideLength);
    row.fill(FREE);
    grid[i] = row;
  }
  pokeData.impassables.forEach(point => {
    grid[point.y][point.x] = BLOCKED;
  });
  // we'll render the starting loc as free here
  // we'll place the bulbasaur there later
  // note that this overwrites any impassable set there
  if (pokeData.startingLoc.x !== INVALID_LOC) {
    grid[pokeData.startingLoc.y][pokeData.startingLoc.x] = FREE;
  }
  // render the end loc if it is valid
  if (pokeData.endingLoc.x !== INVALID_LOC) {
    grid[pokeData.endingLoc.y][pokeData.endingLoc.x] = END;
  }
  return grid;
};

const renderRow = (row, rix, onTileClicked) => {
  const rkey = `r_${rix}`;  // `
  const cols = row.map((type, col) => {
    // for grid rendering, we use FREE in place of START
    if (type === START) {
      type = FREE;
    }
    return (
      <Tile type={type} row={rix} col={col} onTileClicked={onTileClicked} />
    );
  });
  return (
    <div className="gridRow" key={rkey}>{cols}</div>
  );
};

const renderBulbasaur = (loc) => {
  if (loc.x === INVALID_LOC) {
    return null;
  }
  const top = loc.y * TILE_SZ;
  const left = loc.x * TILE_SZ;
  return <Tile
    type={START}
    cls="bulbasaurTile"
    style={{top, left}}
    row={loc.x}
    col={loc.y}
  />;
};

const Grid = ({grid, startingLoc, onTileClicked}) => {
  return (
    <div className="gridCtnr">
      <div className="grid">
        {grid.map((row, ix) => renderRow(row, ix, onTileClicked))}
        {renderBulbasaur(startingLoc)}
      </div>
    </div>
  )
}

export default Grid;