import React from 'react';

import { TILE_TYPES, NO_TILE } from '../enums';
import { images, imageNames } from '../utils/images';

const Palette = ({onTileSelected, selectedType}) => {
  const onSelectTile = (e) => {
    const targetType = e.target.getAttribute('type');
      if (targetType === selectedType) {
        onTileSelected(NO_TILE);
      } else {
        onTileSelected(targetType);
      }
  };
  const renderPokeTile = (type, selectedType) => {
    const selClass = selectedType === type ? 'pokeTileCtnr selected' : 'pokeTileCtnr ';
    return (
      <div className={selClass} key={imageNames[type]} type={type} onClick={onSelectTile}>
        <img
          src={images[type]}
          className="pokeTile"
          type={type}
          alt={imageNames[type]}
        />
      </div>
    );
  };
  return (
    <div className="paletteCtnr">
      {Object.values(TILE_TYPES).map(type => renderPokeTile(type, selectedType))}
    </div>
  );
}
  
export default Palette;