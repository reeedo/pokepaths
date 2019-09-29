import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Tile from '../Tile';
import { TILE_TYPES } from '../../enums';

import { validateSelectors } from '../../utils/testUtilities';

const { START, FREE } = TILE_TYPES;

configure({ adapter: new Adapter() });

const tileData = [
  [
    'renders without crashing - no props',
    {},
    [
      { selector: 'Tile', count: 1 },
      { selector: '.gridElt', count: 1 },
      { selector: 'img', count: 1 }
    ]
  ],
  [
    'renders with valid props',
    { type: FREE, cls: 'tileClass', style: { top: 0, left: 0 }, row: 0, col: 0},
    [
      { selector: 'Tile', count: 1 },
      { selector: '.gridElt', count: 1 },
      { selector: 'img', count: 1 },
      { selector: '.tileClass', count: 1 },
    ]
  ],
  [
    'renders START tile with valid props',
    { type: START, cls: 'tileClass', style: { top: 0, left: 0 }, row: 0, col: 0},
    [
      { selector: 'Tile', count: 1 },
      { selector: '.gridElt', count: 0 },
      { selector: 'img', count: 1 },
      { selector: '.tileClass', count: 1 },
    ]
  ]
]

describe('Testing Tile Component', () => {
  const onTileClicked = jest.fn();
  const getComponent = (props) => {
    return mount(<Tile {...props} onTileClicked={onTileClicked} />);
  }
  test.each(tileData) ('%s', (title, props, selectors) => {
    const component = getComponent(props);
    validateSelectors(component, selectors);
  });
  test('onTileClicked called with valid location', () => {
    const props = { type: FREE, row: 2, col: 1 };
    const component = getComponent(props);
    component.find('img').simulate('click');
    expect(onTileClicked).toHaveBeenCalledWith({ x: 1, y: 2});
  });
});