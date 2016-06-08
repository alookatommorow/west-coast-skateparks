var SearchResults = React.createClass({

  componentDidMount: function() {
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('click', this.handleOutsideClick);
  },

  componentDidUpdate: function() {
    this.selectFirstResult();
  },

  allResultElements: function() {
    return document.getElementById("react-search-results").childNodes;
  },

  handleMouseEnter: function() {
    var activeElement =  document.getElementById("active-search-result");
    if (activeElement) {
      this.deselect(activeElement);
    }
  },

  handleMouseLeave: function() {
    this.selectFirstResult();
  },

  handleOutsideClick: function(event) {
   if (event.target.className !== "item") {
    this.props.exitResults();
   }
  },

  selectFirstResult: function() {
    var firstResult = document.getElementById("react-search-results").firstChild;
    if (firstResult) {
      this.addSelect(firstResult);
    }
  },

  addSelect: function(element) {
    element.className += " active";
    element.id = "active-search-result";
  },

  deselect: function(element) {
    element.className = "item";
    element.id = "";
  },

  handleKeydown: function(event) {
    event = event || window.event;
    switch(event.which || event.keyCode) {
      case 40: // down
        this.selectNextResult();
      break;

      case 38: //up
        this.selectPreviousResult();
      break;

      case 13: // down
        event.preventDefault();
        this.visitSelectedLink();
      break;

      case 27:
        this.props.exitResults();
      break;

      default: return; // exit this handler for other keys
    }
  },

  selectNextResult: function() {
    var currentResult = document.getElementById("active-search-result");
    var nextResult = currentResult.nextSibling;
    if (nextResult) {
      this.deselect(currentResult);
      this.addSelect(nextResult);
    } else {
      return;
    }
  },

  selectPreviousResult: function() {
    var currentResult = document.getElementById("active-search-result");
    var previousResult = currentResult.previousSibling;
    if (previousResult) {
      this.deselect(currentResult);
      this.addSelect(previousResult);
    } else {
      return;
    }
  },

  visitSelectedLink: function(event) {
    var currentResult = document.getElementById("active-search-result");
    if (currentResult) {
      currentResult.firstChild.click();
    }
  },

  render: function(){
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

    var results = this.props.results.map(function(skatepark, index) {
      var resultDisplay = skatepark.name+", "+skatepark.location.city+", "+stateDisplay[skatepark.location.state];
      var stringus = createBoldString(resultDisplay);
      return <div className="item" key={skatepark.id} onMouseEnter={this.handleMouseEnter}>
              <a href={"/skateparks/"+skatepark.id}>{stringus}</a>
            </div>
    }.bind(this));

    return (
      <div id="react-search-results" className="ui divided selection list" onKeyDown={this.handleKeyDown} onMouseLeave={this.handleMouseLeave} >
        {results}
      </div>
    );
  }
});
