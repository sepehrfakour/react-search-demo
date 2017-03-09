const React = require('react');

const Results = require('./ResultsComponent.jsx').default,
      Sidebar = require('./SidebarComponent.jsx').default;

class SearchWindow extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      query: '',
      results: null,
      meta: {count: 0, time: 0},
      food_types: null,
      payment_options: null,
      minRating: 0,
      hits_per_page: 3,
    };
    this.updateQueryState       = this.updateQueryState.bind(this);
    this.updateResultsState     = this.updateResultsState.bind(this);
    this.updateMinRatingState   = this.updateMinRatingState.bind(this);
    this.updateHitsPerPageState = this.updateHitsPerPageState.bind(this);
    this._keyUpHandler          = (e) => this.keyUpHandler(e);
    this._facetClickHandler     = (e) => this.facetClickHandler(e);
    this._showMoreClickHandler  = (e) => this.showMoreClickHandler(e);
  }
  componentWillMount () {
    // Initialize Algolia client and helper
    let client = algoliasearch(window.ALGOLIA_APPLICATION_ID, window.ALGOLIA_SEARCH_API_KEY);
    window.ALGOLIA_HELPER = algoliasearchHelper(client, window.ALGOLIA_INDEX_NAME, {
      facets: ['food_type','stars_count','payment_options']
    });
    // Listen for results and update state accordingly
    window.ALGOLIA_HELPER.on('result', (content) => {
      let results         = content.hits,
          meta            = {count: content.nbHits, time: content.processingTimeMS},
          food_types      = content.getFacetValues('food_type'),
          payment_options = content.getFacetValues('payment_options');
      this.updateResultsState(results,meta,food_types,payment_options);
    });
    // Get initial set of results sorting by proximity (request geolocation permission; fallback to IP address)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          let latLng  = position.coords.latitude + ', ' + position.coords.longitude;
          window.ALGOLIA_HELPER.setQueryParameter('aroundLatLng', latLng).search();
        },
        (error) => { window.ALGOLIA_HELPER.setQueryParameter('aroundLatLngViaIP', true).search() }
      );
    } else {
      window.ALGOLIA_HELPER.setQueryParameter('aroundLatLngViaIP', true).search()
    }
  }
  updateQueryState (query) {
    this.setState((prevState, props) => ({
      query
    }));
  }
  updateResultsState (results,meta,food_types,payment_options) {
    this.setState((prevState, props) => ({
      results,
      meta,
      food_types,
      payment_options
    }));
  }
  updateMinRatingState (minRating) {
    this.setState((prevState, props) => ({
      minRating,
    }));
  }
  updateHitsPerPageState (hits_per_page) {
    this.setState((prevState, props) => ({
      hits_per_page
    }));
  }
  render () {
    // Set data to populate Results and Sidebar
    let results = (this.state.results) ? this.state.results : [],
        meta    = this.state.meta,
        facets  = {
          minRating: this.state.minRating,
          food_types: this.state.food_types,
          payment_options: this.state.payment_options
        };
    return (
      <div id="search-window">
        <div id="input-container">
          <input
            id="search-input"
            type="text"
            placeholder="Search for Restaurants by Name, Cuisine, Location"
            onKeyUp={this._keyUpHandler}
          />
        </div>
        <div id="display-container">
          <Sidebar facets={facets} facetClickHandler={this._facetClickHandler}/>
          <Results results={results} meta={meta} showMoreClickHandler={this._showMoreClickHandler}/>
        </div>
      </div>
    );
  }
  keyUpHandler (e) {
    let text = e.target.value;
    this.updateQueryState(text);
    window.ALGOLIA_HELPER.setQuery(text).search();
  }
  facetClickHandler (e) {
    let element    = e.target,
        facetType  = element.parentElement.getAttribute('data-facet-type'),
        facetValue = element.getAttribute('data-facet');
    if (facetType === 'stars_count') {
      let currentRating = this.state.minRating,
          newRating     = parseInt(facetValue,10);
      if (newRating === currentRating) {
        // Remove minimum rating
        this.updateMinRatingState(null);
        window.ALGOLIA_HELPER.removeNumericRefinement(facetType,'>=',currentRating).search();
      } else if (currentRating === null) {
        // Add minimum rating
        this.updateMinRatingState(parseInt(facetValue,10));
        window.ALGOLIA_HELPER.addNumericRefinement(facetType,'>=',newRating).search();
      } else {
        // Update minimum rating
        this.updateMinRatingState(newRating);
        window.ALGOLIA_HELPER.removeNumericRefinement(facetType,'>=',currentRating).search();
        window.ALGOLIA_HELPER.addNumericRefinement(facetType,'>=',newRating).search();
      }
    } else {
      window.ALGOLIA_HELPER.toggleRefinement(facetType, facetValue).search();
    }
  }
  showMoreClickHandler (e) {
    let current_hits_per_page = this.state.hits_per_page,
        new_hits_per_page     = current_hits_per_page + 3;
    this.updateHitsPerPageState(new_hits_per_page);
    window.ALGOLIA_HELPER.setQueryParameter('hitsPerPage', new_hits_per_page).search();
  }
}

export default SearchWindow;
