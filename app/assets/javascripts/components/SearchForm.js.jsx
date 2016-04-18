
var SearchForm = React.createClass({
  render: function() {
    return (
      <form>
        <input type='text' name='query' onChange={this.props.handleChange} />
      </form>
    );
  }

})