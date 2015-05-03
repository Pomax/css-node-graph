var linktypes = ["UNDIRECTED","FORWARD","BACKWARD", "BIDIRECTIONAL"];

var uid = (function() {
  var id = 1; return function() { return id++; }
}());

var Link = function(node, label, direction) {
  this.node = node;
  this.label = label;
  this.direction = direction;
};

var Node = function(content, label) {
  this.id = uid();
  this.bows = [];
  this.links = [];
  this.position = {
    x: 0,
    y: 0
  };
  this.content = content;
  this.label = label;
};

Node.prototype = {
	link: function(node, label, type) {
    label = label || "";
    type = type || Node.FORWARD;
    this.links.push(new Link(node, label, type));
	},
  bow: function(node, label, type) {
    type = type || Node.FORWARD;
    this.bows.push(new Link(node, label, type));  
  },
  reflow: function(algorithm) {
    algorithm(this, this.position.x, this.position.y);
  }
};

// link constants
linktypes.forEach(function(v,idx) {
  Node[v] = idx;
});

// reflow algorithms
var algorithms = require("./algorithms");
Object.keys(algorithms).forEach(function(name) {
  Node[name] = algorithms[name];
});

module.exports = Node;
