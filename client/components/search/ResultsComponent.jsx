const React = require('react');

class Results extends React.Component {
  constructor (props) {
    super(props);
    this.buildResults = this.buildResults.bind(this);
  }
  buildResults (result) {
    return (
      <div key={result.objectID} id={'r-' + result.objectID} className="result">
        <div className="result-img" style={{backgroundImage:'url(' + result.image_url + ')'}}></div>
        <div className="result-body">
          <div>
            <h2 className="result-name" dangerouslySetInnerHTML={{__html: result._highlightResult.name.value}}></h2>
          </div>
          <div>
            <span className="result-rating">
              <span>{result.stars_count}</span>
              <span data-rating={Math.floor(result.stars_count)}></span>
            </span>
            <span className="result-reviews">{'(' + result.reviews_count + ' reviews)'}</span>
          </div>
          <div>
            <span className="result-cuisine">{result.food_type}</span>
            <span className="spacer"> | </span>
            <span className="result-area">{result.area}</span>
            <span className="spacer"> | </span>
            <span className="result-price-range">{result.price_range}</span>
          </div>
        </div>
      </div>
    );
  }
  render () {
    let results  = this.props.results,
        meta     = this.props.meta,
        showMore = this.props.showMoreClickHandler,
        title    = meta.count + ' results found ',
        time     = 'in ' + parseFloat(meta.time / 1000).toFixed(3) + ' seconds';
    return (
      <div id="results-container">
        <h3>{title}<span>{time}</span></h3>
        <div id="results">
          {results.map(this.buildResults)}
        </div>
        <div id="paginate-container">
          <button id="show-more-button" onClick={showMore}>Show More</button>
        </div>
      </div>
    );
  }
}

export default Results;
