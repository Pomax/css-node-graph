var uuid = 0;
var React = require('react/addons');
var Node = require('./Node.jsx');
var Links = require('./Links.jsx');
var Bows = require('./Bows.jsx');
var load = require('./js/load');

var CSSNodeGraph = React.createClass({

  getInitialState: function() {
    return {
      nodes: load(1)
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
      <div className="CSSNodeGraph" style={ style }>
        <div className="nodes">{ this.generateNodes(offset) }</div>
        <div className="links">{ this.generateLinks(offset) }</div>
        <div className="bows">{  this.generateBows(offset) }</div>
      </div>
    );
  },

  // RENDERING

  generateNodes: function(offset) {
    var nodes = this.state.nodes;
    return Object.keys(nodes).map(k => {
      var n = nodes[k];
      return <Node node={n} key={"node" + k} onClick={this.loadNode(n.content)} offset={offset} />;
    });
  },

  generateLinks: function(offset) {
    var nodes = this.state.nodes;
    return Object.keys(nodes).map(k => {
      var n = nodes[k];
      return <Links node={n} key={"link" + k} offset={offset} />
    });
  },

  generateBows: function(offset) {
    var nodes = this.state.nodes;
    return Object.keys(nodes).map(k => {
      var n = nodes[k];
      return <Bows node={n} key={"link" + k} offset={offset} />
    });
  },

  // UTILITY

  loadNode: function(value) {
    return function() {
      this.setState({
        nodes: load(value)
      });
    }.bind(this);
  }
});

module.exports = CSSNodeGraph;
