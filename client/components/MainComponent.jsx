const React = require('react');

const SearchWindow = require('./search/SearchWindowComponent.jsx').default;

class Main extends React.Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div id="main-window" className="row">
        <div className="col-xs-12 offset-xs-0 col-md-10 offset-md-1">
          <SearchWindow />
        </div>
      </div>
    );
  }
}

export default Main;
