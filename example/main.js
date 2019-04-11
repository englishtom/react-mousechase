import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import * as style from './style.scss';

// first we grab reference to the container node
const domContainerNode = window.document.getElementById('react-app-container');

// now mount the root app to the dom
ReactDOM.unmountComponentAtNode(domContainerNode);
ReactDOM.render(<App />, domContainerNode);
