import '../assets/styles.sass';

import React from 'react';
import ReactDom from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Application from './components/App.jsx';

injectTapEventPlugin();
ReactDom.render(<Application />, document.getElementById('main'));

