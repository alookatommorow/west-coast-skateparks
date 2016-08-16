var SearchContainer = React.createClass({
  getInitialState: function() {
    return {
      query: null,
      results: [],
      skateparks: null,
      loading: false,
      showSearchResults: false
    }
  },

  searchSkateparks: function(query) {
    return this.state.skateparks.filter(this.filterAndAddIndexOfMatch(query));
  },

  filterAndAddIndexOfMatch: function(query) {
    return function(skatepark) {
      if (skatepark.name.indexOf(query) !== -1 || skatepark.location.city.indexOf(query) !== -1) {
        skatepark.string = skatepark.name+", "+skatepark.location.city+", "+stateDisplay[skatepark.location.state];
        skatepark.matchIndex = skatepark.string.indexOf(query);
        return true;
      } else {
        return false;
      }
    }
  },

  getSkateparks: function() {
    if (!this.state.skateparks) {
      this.setState({loading: true});
      $.ajax({
        url: '/api/skateparks',
      })
      .done(this.storeAllSkateparks)
      .fail(this.errorFunction);
    }
  },

  storeAllSkateparks: function(response) {
    console.log("skateparks retrieved");
    this.setState({skateparks: response, loading: false});
  },

  handleChange: function(event) {
    var query = event.target.value.toLowerCase();
    if (query === '') {
      this.setState({results: []});
    } else {
      var results = this.searchSkateparks(query);
      this.setState({
        query: query,
        results: results
      });
    }
  },

  exitResults: function() {
    document.getElementById("react-search-form").reset();
    this.setState({results: []});
  },

  errorFunction: function(response) {
    console.log("yer fuckin up");
  },

  render: function() {
    return (
      <div className="react-search-container">
        <SearchForm handleChange={this.handleChange} loading={this.state.loading} getSkateparks={this.getSkateparks} results={this.state.results} query={this.state.query} />
        <SearchResults className="react-search-results" results={this.state.results} exitResults={this.exitResults} query={this.state.query} />
      </div>
    );
  }
});