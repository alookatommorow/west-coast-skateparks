
var SearchForm = React.createClass({
  render: function() {
    return (
      <div>
        <form className="react-search-form">
          <input type='text' name='query' onChange={this.props.handleChange} />
        </form>
      </div>
    );
  }
})