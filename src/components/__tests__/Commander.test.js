import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Commander from '../Commander';
import { TILE_TYPES, NO_TILE } from '../../enums';

import { validateSelectors } from '../../utils/testUtilities';

const { FREE, BLOCKED } = TILE_TYPES;

configure({ adapter: new Adapter() });

const commanderData = [
  [
    'renders without crashing',
    [
      { selector: '.cmdCtnr', count: 1 },
      { selector: '.gridSizeCtnr', count: 1 },
      { selector: '.gridSizeLabel', count: 1 },
      { selector: '.gridSizeInput', count: 1 },
      { selector: '.runBtnCtnr', count: 1 },
      { selector: '.runBtn', count: 1 }
    ]
  ]
];
const selectorsNone = [{ selector: '.pokeTileCtnr.selected', count: 0 }];
const selectorsOne = [{ selector: '.pokeTileCtnr.selected', count: 1 }];

describe('Testing Commander Component', () => {
  const onSize = jest.fn();
  const onFindPath = jest.fn();
  const props = { onSize, onFindPath };
  const getComponent = (props) => {
    return mount(<Commander {...props} />);
  }
  test.each(commanderData) ('%s', (title, selectors) => {
    const component = getComponent(props);
    validateSelectors(component, selectors);
  });
  test('onSize called ', () => {
    const component = getComponent(props);
    // get the input item
    const input = component.find('.gridSizeInput');
    // now simulate the enter key
    input.simulate('keypress', { key: "Enter" });
    expect(onSize).toHaveBeenCalled();
  });
  test('onFindPath called', () => {
    const component = getComponent(props);
    // get the button item
    const btn = component.find('.runBtn');
    // now simulate the enter key
    btn.simulate('click');
    expect(onFindPath).toHaveBeenCalled();
  });
});