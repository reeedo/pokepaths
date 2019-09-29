import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Palette from '../Palette';
import { TILE_TYPES, NO_TILE } from '../../enums';

import { validateSelectors } from '../../utils/testUtilities';

const { FREE, BLOCKED } = TILE_TYPES;

configure({ adapter: new Adapter() });

const paletteData = [
  [
    'renders without crashing - no props',
    {},
    [
      { selector: 'Palette', count: 1 },
      { selector: '.paletteCtnr', count: 1 },
      { selector: '.pokeTileCtnr', count: 4 }
    ]
  ],
  [
    'renders with valid props',
    { selectedType: FREE },
    [
      { selector: 'Palette', count: 1 },
      { selector: '.paletteCtnr', count: 1 },
      { selector: '.pokeTileCtnr', count: 4 },
      { selector: '.pokeTileCtnr.selected', count: 1 }
    ]
  ]
];
const selectorsNone = [{ selector: '.pokeTileCtnr.selected', count: 0 }];
const selectorsOne = [{ selector: '.pokeTileCtnr.selected', count: 1 }];

describe('Testing Palette Component', () => {
  const onTileSelected = jest.fn();
  const getComponent = (props) => {
    return mount(<Palette {...props} onTileSelected={onTileSelected} />);
  }
  test.each(paletteData) ('%s', (title, props, selectors) => {
    const component = getComponent(props);
    validateSelectors(component, selectors);
  });
  test('onTileClicked called with expected type', () => {
    const props = { selectedType: NO_TILE };
    const component = getComponent(props);
    // first verify that the ctnr is not selected
    validateSelectors(component, selectorsNone);
    // now select one
    component.find('.pokeTileCtnr').first().simulate('click');
    // should be the FREE tile
    expect(onTileSelected).toHaveBeenCalledWith(FREE);
  });
  test('onTileClicked called with no type', () => {
    const props = { selectedType: FREE };
    const component = getComponent(props);
    // first verify that the ctnr is selected
    validateSelectors(component, selectorsOne);
    // now select one
    component.find('.pokeTileCtnr').first().simulate('click');
    // should be the FREE tile
    expect(onTileSelected).toHaveBeenCalledWith(NO_TILE);
  });
});