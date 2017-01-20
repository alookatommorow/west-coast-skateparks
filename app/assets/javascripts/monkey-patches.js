Array.prototype.deleteById = function(id) {
  var index = this.findIndex(function(el) { return el.id === id; }),
      marker = this.splice(index, 1)[0];

  return marker;
};
