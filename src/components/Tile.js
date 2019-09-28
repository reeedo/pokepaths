import React from 'react';

import { INVALID_LOC, TILE_TYPES } from '../enums';
import { images } from '../utils/images';

const Tile = ({ type, cls, style, row, col, onTileClicked }) => {
  const ckey = `r_${row}_c_${col}`;  // `
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
  if (type === TILE_TYPES.START) {
    // when rendering the bulbasaur, we don't wrap it
    // since it is an overlay
    return imgComponent;
  }
  // normal grid tile
  return (
    <div
      className="gridElt"
      key={ckey}
    >
      {imgComponent}
    </div>
  );
};

export default Tile;