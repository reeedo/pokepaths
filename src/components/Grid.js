import React from 'react';

import { TILE_TYPES, TILE_SZ, INVALID_LOC } from '../enums';
import { renderTile } from '../utils/images';

const { FREE, BLOCKED, START, END } = TILE_TYPES;

const gridFromMap = gridMap => {
  const grid = new Array(gridMap.sideLength);
  for (let i=0; i<gridMap.sideLength; i++) {
    let row = new Array(gridMap.sideLength);
    row.fill(FREE);
    grid[i] = row;
  }
  gridMap.impassables.forEach(point => {
    grid[point.y][point.x] = BLOCKED;
  });
  // we'll render the starting loc as free here
  // we'll place the bulbasaur there later
  // note that this overwrites any impassable set there
  if (gridMap.startingLoc.x !== INVALID_LOC) {
    grid[gridMap.startingLoc.y][gridMap.startingLoc.x] = FREE;
  }
  // render the end loc if it is valid
  if (gridMap.endingLoc.x !== INVALID_LOC) {
    grid[gridMap.endingLoc.y][gridMap.endingLoc.x] = END;
  }
  return grid;
};

const renderCol = (type, rkey, cix) => {
  const ckey = `${rkey}_c_${cix}`;  // `
  return (
    <div className="gridElt" key={ckey}>
      {renderTile(type)}
    </div>
  );
};

const renderRow = (row, rix) => {
  const rkey = `r_${rix}`;  // `
  const cols = row.map((col, cix) => {
    return renderCol(col, rkey, cix);
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
  return renderTile(START, "bulbasaurTile", {top, left});
};

const Grid = ({gridMap}) => {
  // first transform map into grid
  const grid = gridFromMap(gridMap);
  return (
    <div className="gridCtnr">
      <div className="grid">
        {grid.map((row, ix) => renderRow(row, ix))}
        {renderBulbasaur(gridMap.startingLoc)}
      </div>
    </div>
  )
}

export default Grid;