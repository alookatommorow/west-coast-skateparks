
var SearchForm = React.createClass({
  render: function() {
    return (
      <div className="ui search react-search-form">
        <div className="ui icon input">
          <input id="react-search-input" className="prompt" type='text' name='query' onChange={this.props.handleChange} />
          <i className="search icon"></i>
        </div>
      </div>
    );
  }
})