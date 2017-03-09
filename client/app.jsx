
// React app entry point

const React = require('react');
const ReactDOM = require('react-dom');

const Main = require('./components/MainComponent.jsx').default;

// Algolia App ID and Public Search Key global variables
window.ALGOLIA_APPLICATION_ID = 'ABF3QSSV0C';
window.ALGOLIA_SEARCH_API_KEY = 'e3d710ef8f7b6bc229911927236200ae';
window.ALGOLIA_INDEX_NAME = 'restaurants';

ReactDOM.render(
  <Main />,
  document.getElementById('react-app-container')
);
