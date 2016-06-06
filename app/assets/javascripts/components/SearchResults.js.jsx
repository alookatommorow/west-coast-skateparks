var SearchResults = React.createClass({
  render: function(){
    var stateDisplay = {
      "california": "CA",
      "oregon": "OR",
      "washington": "WA"
    }
    var query = this.props.query;
    var regExp = new RegExp(this.props.query);
    var createBoldString = function(string) {
      var matchIndex = string.match(regExp).index;
      var first = string.slice(0, matchIndex);
      var bold = string.slice(matchIndex, matchIndex + query.length);
      var last = string.slice(matchIndex + query.length);
      return <span>{first}<span className="bold">{bold}</span>{last}</span>;
    }
    var results = this.props.results.map(function(skatepark) {
      var resultDisplay = skatepark.name+", "+skatepark.location.city+", "+stateDisplay[skatepark.location.state]
      var stringus = createBoldString(resultDisplay);
      return <div key={skatepark.id}>
              <div>{stringus}</div>
            </div>
    });

    return (
      <div>
        {results}
      </div>
    );
  }

});
