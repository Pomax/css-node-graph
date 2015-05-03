var uuid = 0;
var React = require('react/addons');
var Node = require('./Node.jsx');
var Links = require('./Links.jsx');

var GraphNode = require("./js/graph");

var CSSNodeGraph = React.createClass({
  load: function(value) {
    var nodes = {};
    nodes[value] = new GraphNode(value, value);
    for (var limit=12, i=1, val=value, node, lval, rval; i<limit; i++) {
      lval = val * 2;
      if (!nodes[lval]) {
        nodes[lval] = new GraphNode(lval, lval);
        nodes[val].link(nodes[lval], "n/2", GraphNode.BACKWARD);
        if (nodes[val/2]) { nodes[val/2].bow(nodes[lval], "4n"); }
      } else {
        nodes[val].bow(nodes[lval], "n/2", GraphNode.BACKWARD);    
      }
      rval = (val-1) / 3;
      if (rval === Math.floor(rval)) {
        if(!nodes[rval]) {
          nodes[rval] = new GraphNode(rval, rval);
          nodes[val].link(nodes[rval], "3n+1", GraphNode.BACKWARD);
          if (nodes[(rval-1)/4]) { nodes[(rval-1)/4].bow(nodes[rval], "4n+1"); }
        } else {
          nodes[val].bow(nodes[rval], "3n+1", GraphNode.BACKWARD);    
        }
      }
      val = lval;
    }
    nodes[value].reflow(GraphNode.LADDER(100, 100));
    console.log(nodes);
    return nodes;
  },

  getInitialState: function() {
    return {
      nodes: this.load(1)
    };
  },

  render: function() {
    var style = {
      position: "relative",
      overflow: "hidden",
      userSelect: "none"
    };

    var offset = {
      x: 20,
      y: 100
    };

    return (
      <div>
        <div className="CSSNodeGraph" style={ style }>
          <div className="nodes">{ this.generateNodes(offset) }</div>
          <div className="links">{ this.generateLinks(offset) }</div>
        </div>
        <button onClick={this.testNodes}>add test Nodes</button>
      </div>
    );
  },

  // RENDERING

  generateNodes: function(offset) {
    var nodes = this.state.nodes;
    return Object.keys(nodes).map(k => {
      var n = nodes[k];
      return <Node node={n} key={"node" + n.content} onClick={this.loadNode(n.content)} offset={offset} />;
    });
  },

  generateLinks: function(offset) {
    var nodes = this.state.nodes;
    return Object.keys(nodes).map(k => {
      var n = nodes[k];
      return <Links node={n} key={"link" + n.content} offset={offset} />
    });
  },

  // UTILITY

  loadNode: function(value) {
    return function() {
      this.setState({
        nodes: this.load(value)
      });
    }.bind(this);
  }
});

module.exports = CSSNodeGraph;
