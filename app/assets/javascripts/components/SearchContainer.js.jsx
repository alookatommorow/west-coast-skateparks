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
    return this.state.skateparks.filter(function(skatepark){
      return skatepark.city.match(regExp) ||
        skatepark.name.match(regExp);
    });
  },

  handleChange: function(event) {
    var query = event.target.value
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

  successFunction: function(response) {
    this.setState({ results: response, showSearchResults: true });
  },

  errorFunction: function(response) {
    console.log("yer fuckin up");
  },

  render: function() {
    return (
      <div>
        <div>Fuck ur bum</div>
        <SearchForm handleChange={this.handleChange} />
        <SearchResults results={this.state.results} query={this.state.query} />
      </div>
    );
  }
});

