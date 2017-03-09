const React = require('react');

class Sidebar extends React.Component {
  constructor (props) {
    super(props);
    this.buildFacets = this.buildFacets.bind(this);
  }
  buildFacets (facet) {
    let className = (facet.isRefined || (facet.name === this.minRating)) ? 'refined' : 'unrefined';
    return (
      <li key={facet.name} data-facet={facet.name} className={className} onClick={this.clickHandler}>
        <span>{facet.name}</span>
        <span>{facet.count}</span>
      </li>
    );
  }
  render () {
    this.clickHandler      = this.props.facetClickHandler;
    this.minRating         = this.props.facets.minRating;
    let foodTypesProp      = this.props.facets.food_types,
        paymentOptionsProp = this.props.facets.payment_options;

    let validFoodTypes = ['Italian','American','Californian','French','Seafood','Japanese','Indian'],
        defaultFoodTypes = validFoodTypes.map( (type,index) => {
          return {name:type, count: null, isRefined: false}
        }),
        food_types = (foodTypesProp) ? foodTypesProp.slice(0,7) : defaultFoodTypes;
    let ratings = [...Array(6).keys()].map( (el,index) => {
          return {name:index, count: null, isRefined: false}
        });
    let validPaymentOptions = ['Visa','AMEX','Discover','MasterCard'],
        defaultpaymentOptions = validPaymentOptions.map( (item,index) => {
          return {name:item, count: null, isRefined: false}
        }),
        payment_options = (paymentOptionsProp)
          ? paymentOptionsProp.filter((option) => (validPaymentOptions.indexOf(option.name) >= 0))
          : defaultpaymentOptions;
    return (
      <div id="filter-sidebar">
        <div className="filter">
          <h3>Cuisine/Food Type</h3>
          <ul className="food-types" data-facet-type="food_type">
            {food_types.map(this.buildFacets)}
          </ul>
        </div>
        <div className="filter">
          <h3>Rating</h3>
          <ul className="stars_count" data-facet-type="stars_count">
            {ratings.map(this.buildFacets)}
          </ul>
        </div>
        <div className="filter">
          <h3>Payment Options</h3>
          <ul className="payment_options" data-facet-type="payment_options">
            {payment_options.map(this.buildFacets)}
          </ul>
        </div>
      </div>
    );
  }
}

export default Sidebar;
