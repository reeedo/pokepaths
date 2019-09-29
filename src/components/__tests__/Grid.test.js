import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Grid from '../Grid';
import { TILE_TYPES, INVALID_LOC } from '../../enums';

import { validateSelectors } from '../../utils/testUtilities';

const { FREE, BLOCKED, END } = TILE_TYPES;

configure({ adapter: new Adapter() });

const tileData = [
  [
    'renders Grid without crashing - valid props',
    {grid: [], startingLoc: {x: INVALID_LOC, y: INVALID_LOC}, endingLoc: {x: INVALID_LOC, y: INVALID_LOC}},
    [
      { selector: 'Grid', count: 1 },
      { selector: '.gridCtnr', count: 1 },
      { selector: '.grid', count: 1 }
    ]
  ],
  [
    'renders Grid without crashing - valid props',
    {grid: [[FREE],[FREE]], startingLoc: {x: 0, y: 0}, endingLoc: {x: 0, y: 1}},
    [
      { selector: 'Grid', count: 1 },
      { selector: '.gridCtnr', count: 1 },
      { selector: '.grid', count: 1 },
      { selector: '.gridRow', count: 2 },
      { selector: 'Tile', count: 4 },
      { selector: '.bulbasaurTile', count: 1 },
      { selector: '.finishTile', count: 1 }
    ]
  ],
  [
    'renders big grid without crashing - valid props',
    {grid: [[FREE, BLOCKED],[FREE, FREE]], startingLoc: {x: 0, y: 0}, endingLoc: {x: 1, y: 1}},
    [
      { selector: 'Grid', count: 1 },
      { selector: '.gridCtnr', count: 1 },
      { selector: '.grid', count: 1 },
      { selector: '.gridRow', count: 2 },
      { selector: 'Tile', count: 6 },
      { selector: '.bulbasaurTile', count: 1 },
      { selector: '.finishTile', count: 1 },
      { selector: '[alt="free"]', count: 3 },
      { selector: '[alt="end"]', count: 1 },
      { selector: '[alt="blocked"]', count: 1 }
    ]
  ]
];

describe('Testing Grid Component', () => {
  const onTileClicked = jest.fn();
  const getComponent = (props) => {
    return mount(<Grid {...props} onTileClicked={onTileClicked} />);
  }
  test.each(tileData) ('%s', (title, props, selectors) => {
    const component = getComponent(props);
    validateSelectors(component, selectors);
  });
  test('onTileClicked called with valid location', () => {
    const props = { grid: [[FREE, BLOCKED],[FREE, FREE]], startingLoc: {x: 0, y: 0}, endingLoc: {x: 1, y: 1} };
    const component = getComponent(props);
    component.find('img').first().simulate('click');
    expect(onTileClicked).toHaveBeenCalledWith({x: 0, y: 0});
  });
});