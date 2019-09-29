import React from 'react';

import { INVALID_LOC, TILE_TYPES } from '../enums';
import { images } from '../utils/images';

const { START, END } = TILE_TYPES;

const Tile = ({ type, cls, style, row, col, onTileClicked }) => {
  const onClick = (e) => {
    const r = e.target.getAttribute('row') || INVALID_LOC;
    const c = e.target.getAttribute('col') || INVALID_LOC;
    const loc = {
      x: parseInt(c, 10),
      y: parseInt(r, 10)
    };
    onTileClicked(loc);
  }
  const imgComponent = (
    <img
      src={images[type]}
      alt={type}
      className={cls}
      style={style}
      onClick={onClick}
      row={row}
      col={col}
    />
  );
  if (type === START || type === END) {
    // when rendering the bulbasaur or finish tile, we don't wrap it
    // since it is an overlay
    return imgComponent;
  }
  // normal grid tile
  return (
    <div className="gridElt">
      {imgComponent}
    </div>
  );
};

export default Tile;