import React from 'react';

import { TILE_TYPES } from '../enums';

import bulbasaur from '../assets/bulbasaur.png';
import finishtile from '../assets/finishtile.png';
import grasstile from '../assets/grasstile.png';
import rocktile from '../assets/rocktile.png';

const { FREE, BLOCKED, START, END } = TILE_TYPES;

const images = {
  [FREE]: grasstile,
  [BLOCKED]: rocktile,
  [START]: bulbasaur,
  [END]: finishtile
};

const imageNames = {
  [FREE]: 'grasstile',
  [BLOCKED]: 'rocktile',
  [START]: 'bulbasaur',
  [END]: 'finishtile'
};

const renderTile = (type, cls, style) => {
  return <img src={images[type]} alt={type} className={cls} style={style} />
};

export {
  images,
  imageNames,
  renderTile
}