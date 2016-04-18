var SearchResults = React.createClass({
  render: function(){
    var query = this.props.query
    var createBoldString = function(string) {}
    var matchInfo = [];
    var results = this.props.results.map(function(skatepark){
      matchIndex = skatepark.city.match(query) ? skatepark.city.match(query).index : skatepark.name.match(query).index;
      console.log(matchIndex);
      return <div key={skatepark.id}>
              <div>{skatepark.name}, {skatepark.city}</div>
            </div>
    });

    return (
      <div>
        {results}
      </div>
    );
  }

});
