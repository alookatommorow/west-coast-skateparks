var SearchResults = React.createClass({
  render: function(){
    var stateDisplay = {
      "california": "CA",
      "oregon": "OR",
      "washington": "WA"
    }
    var query = this.props.query;
    var regExp = new RegExp(query);

    var createBoldString = function(string) {
      var matchIndex = string.match(regExp).index;
      var output = titleize(string);
      var first = output.slice(0, matchIndex);
      var bold = output.slice(matchIndex, matchIndex + query.length);
      var last = output.slice(matchIndex + query.length);
      return <span>{first}<span className="bold">{bold}</span>{last}</span>;
    }

    var results = this.props.results.map(function(skatepark) {
      var resultDisplay = skatepark.name+", "+skatepark.location.city+", "+stateDisplay[skatepark.location.state];
      var stringus = createBoldString(resultDisplay);
      return <div className="item" key={skatepark.id}>
              <a href={"/skateparks/"+skatepark.id}>{stringus}</a>
            </div>
    });

    return (
      <div className="react-search-results ui divided selection list">
        {results}
      </div>
    );
  }
});
