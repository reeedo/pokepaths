import React from 'react';

import { TILE_TYPES, TILE_H, TILE_W, INVALID_LOC } from '../enums';
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
    // for grid rendering, we use FREE in place of START or END
    if (type === START || type === END) {
      type = FREE;
    }
    const ckey = `${rkey}_c_${col}`;
    return (
      <Tile type={type} key={ckey} row={rix} col={col} onTileClicked={onTileClicked} />
    );
  });
  return (
    <div className="gridRow" key={rkey}>{cols}</div>
  );
};

const renderBulbasaur = (loc, onTileClicked) => {
  if (loc.x === INVALID_LOC) {
    return null;
  }
  const top = loc.y * TILE_H;
  const left = 1 + loc.x * TILE_W;
  return <Tile
    type={START}
    cls="bulbasaurTile"
    style={{top, left}}
    row={loc.x}
    col={loc.y}
    onTileClicked={onTileClicked}
  />;
};

const renderFinish = (loc, onTileClicked) => {
  if (loc.x === INVALID_LOC) {
    return null;
  }
  const top = loc.y * TILE_H;
  const left = 1 + loc.x * TILE_W;
  return <Tile
    type={END}
    cls="finishTile"
    style={{top, left}}
    row={loc.x}
    col={loc.y}
    onTileClicked={onTileClicked}
  />;
};

const calcCenter = (loc) => {
  return {
    top: loc.y * TILE_H + TILE_H/2,
    left: 1 + loc.x * TILE_W + TILE_W/2
  }
};

const renderMoves = (startingLoc, endingLoc, moves) => {
  let from = calcCenter(startingLoc);
  let to = { ...from };
  const moveElts = moves.map((m, i) => {
    let cls, style;
    const key = `m_${i}`;
    switch (m) {
      case 'U':
        to.top -= TILE_H;
        cls = 'verticalMove';
        style = { ...to };
        break;
      case 'D':
        to.top += TILE_H;
        cls = 'verticalMove';
        style = { ...from };
        break;
      case 'L':
        to.left -= TILE_W;
        cls = 'horizontalMove';
        style = { ...to };
        break;
      case 'R':
        to.left += TILE_W;
        cls = 'horizontalMove';
        style = { ...from };
        break;
      default:
        break;
    }
    from = { ...to };
    return <div className={cls} style={style} key={key} ></div>;
  });
  return moveElts;
};

const Grid = ({grid, startingLoc, endingLoc, moves, onTileClicked}) => {
  return (
    <div className="gridCtnr">
      <div className="grid">
        {grid.map((row, ix) => renderRow(row, ix, onTileClicked))}
        {renderMoves(startingLoc, endingLoc, moves)}
        {renderBulbasaur(startingLoc, onTileClicked)}
        {renderFinish(endingLoc, onTileClicked)}
      </div>
    </div>
  )
}

export default Grid;