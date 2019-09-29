import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import App from './App';

import { validateSelectors } from './utils/testUtilities';

configure({ adapter: new Adapter() });

const appData = [
  [
    'renders App without crashing',
    [
      { selector: '.editCtnr', count: 1 },
      { selector: '.controlCtnr', count: 1 },
      { selector: 'Commander', count: 1 },
      { selector: 'Palette', count: 1 },
      { selector: 'Grid', count: 1 },
      { selector: 'Tile', count: 16 }
    ]
  ]
];

describe('App tests', () => {
  // hijack the component setState so we can check it
  const getComponent = () => {
    return mount(<App />);
  };
  test.each(appData) ('%s', (title, selectors) => {
    const component = getComponent();
    validateSelectors(component, selectors);
  });
});
