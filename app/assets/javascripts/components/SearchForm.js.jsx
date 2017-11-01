var SearchForm = createReactClass({
  render: function() {
    var loadingInput = <input id="react-search-input" placeholder="Loading, please wait..." className="prompt" type='text' name='query' onChange={this.props.handleChange} />
    var readyInput = <input id="react-search-input" className="prompt" type='text' name='query' onChange={this.props.handleChange} />
    var formInput = this.props.loading ? loadingInput : readyInput;
    return (
      <div className="search">
        <form id="react-search-form">
          <div className="icon input" onClick={this.props.getSkateparks}>
            { formInput }
            <i className="fa fa-search"></i>
          </div>
        </form>
      </div>
    );
  }
})