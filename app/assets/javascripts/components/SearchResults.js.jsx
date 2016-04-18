var SearchResults = React.createClass({
  render: function(){

    var results = this.props.results.map(function(skatepark){

      return <div key={skatepark.id} >
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
