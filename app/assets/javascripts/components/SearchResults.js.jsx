var SearchResults = React.createClass({

  componentDidMount: function() {
    window.addEventListener('keydown', this.handleKeydown);
    window.addEventListener('click', this.handleOutsideClick);
  },

  componentDidUpdate: function() {
    this.deselectActive();
    this.selectFirstResult();
  },

  handleMouseLeave: function() {
    this.selectFirstResult();
  },

  handleOutsideClick: function(event) {
   if (event.target.className !== "item") {
    this.props.exitResults();
   }
  },

  handleClick: function(event) {
    if (event.target.firstChild) {
      window.location = event.target.firstChild.href;
    }
  },

  selectFirstResult: function() {
    var firstResult = document.getElementById("search-results-list").firstChild;
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

  deselectActive: function() {
    var activeElement =  document.getElementById("active-search-result");
    if (activeElement) {
      this.deselect(activeElement);
    }
  },

  handleKeydown: function(event) {
    var currentResult = document.getElementById("active-search-result");
    if (currentResult) {
      event = event || window.event;
      switch(event.which || event.keyCode) {
        case 40: // down
          this.selectNextResult(currentResult, currentResult.nextSibling);
        break;

        case 38: //up
          this.selectNextResult(currentResult, currentResult.previousSibling);
        break;

        case 13: // down
          event.preventDefault();
          this.visitSelectedLink();
        break;

        case 27: // esc
          this.props.exitResults();
        break;

        default: return; // exit this handler for other keys
      }
    }
  },

  selectNextResult: function(current, next) {
    if (next) {
      this.deselect(current);
      this.addSelect(next);
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

    var createBoldString = function(string, matchIndex, query) {
      var output = titleize(string),
          first = output.slice(0, matchIndex),
          bold = output.slice(matchIndex, matchIndex + query.length),
          last = output.slice(matchIndex + query.length);
      return <span>{first}<span className="bold">{bold}</span>{last}</span>;
    }

    var numResults = this.props.results.length,
        matchText = "Matches",
        resultsDisplay,
        boldedResultDisplay,
        link,
        numResultsDisplay;

    if (this.props.query) {
      if (numResults === 1) {
        matchText = "Match"
      }
      numResultsDisplay = <div className="item num-results"><span className="bold">{numResults} {matchText}</span></div>;
      resultsDisplay = this.props.results.map(function(skatepark) {
        boldedResultDisplay = createBoldString(skatepark.string, skatepark.matchIndex, this.props.query);
        link = "/skateparks/"+skatepark.id+"-"+skatepark.name.replace(/\//g, "-").replace(/\./, "").split(" ").join("-")+"-"+skatepark.location.city.replace(/\(|\)|\./g, "").split(" ").join("-")+"-"+skatepark.location.state;
        return <div className="item" key={skatepark.id} onMouseEnter={this.deselectActive} onClick={this.handleClick}>
                <a href={link}>{boldedResultDisplay}</a>
              </div>
      }.bind(this));
    }

    return (
      <div id="react-search-results" className="divided selection list" onKeyDown={this.handleKeyDown} onMouseLeave={this.handleMouseLeave} >
        {numResultsDisplay}
        <div id="search-results-list">
          {resultsDisplay}
        </div>
      </div>
    );
  }
});
