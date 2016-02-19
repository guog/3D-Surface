jest.dontMock('../App.jsx');

import React from 'react';
import TestUtils from 'react-addons-test-utils';
const App = require('../App.jsx');

describe('App', () => {
  it('generate appname in <h1>', () => {
    const app = TestUtils.renderIntoDocument(<App />);
    const title = TestUtils.findRenderedDOMComponentWithTag(app, 'h1');
    expect(title.getDOMNode().textContent).toEqual('reactor');
  });
});
