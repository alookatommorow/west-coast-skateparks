var SearchContainer = React.createClass({
  getInitialState: function() {
    return {
      query: null,
      results: [],
      skateparks: null,
      showSearchResults: false
    }
  },

  componentWillMount: function() {
    this.getSkateparks();
  },

  searchSkateparks: function(query) {
    var regExp = new RegExp(query);
    return this.state.skateparks.filter(function(skatepark) {
      return skatepark.name.match(regExp) || skatepark.location.city.match(regExp);
    });
  },

  handleChange: function(event) {
    var query = event.target.value;
    if (query === '') {
      this.setState({
        results: [],
      });
    } else {
      var results = this.searchSkateparks(query);
      this.setState({
        query: query,
        results: results
      });
    }
  },

  getSkateparks: function() {
    $.ajax({
      url: '/api/skateparks',
    })
    .done(this.storeAllSkateparks)
    .fail(this.errorFunction);
  },

  storeAllSkateparks: function(response) {
    this.setState({skateparks: response});
  },

  errorFunction: function(response) {
    console.log("yer fuckin up");
  },

  render: function() {
    return (

      <div>
        <SearchForm handleChange={this.handleChange} results={this.state.results} query={this.state.query} />
        <SearchResults className="react-search-results" results={this.state.results} query={this.state.query} />
      </div>
    );
  }
});

