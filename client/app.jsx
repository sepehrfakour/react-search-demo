
// React app entry point

const React = require('react');
const ReactDOM = require('react-dom');

const Main = require('./components/MainComponent.jsx').default;

// Algolia App ID and Public Search Key global variables
window.ALGOLIA_APPLICATION_ID = '9KFLYOY1GK';
window.ALGOLIA_SEARCH_API_KEY = 'd219521c2e9a0cf7395b485789a88d4c';
window.ALGOLIA_INDEX_NAME = 'restaurants';

ReactDOM.render(
  <Main />,
  document.getElementById('react-app-container')
);
