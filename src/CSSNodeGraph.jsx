var uuid = 0;
var React = require('react/addons');
var Node = require('./Node.jsx');
var Link = require('./Link.jsx');

var CSSNodeGraph = React.createClass({
  statics: {
    nextId: function() {
      return uuid++;
    }
  },

  getInitialState: function() {
    return {
      nodes: [],
      links: [],
      crosslinks: []
    };
  },

  componentWillMount: function() {
    this.nodes = this.state.nodes;
    this.links = this.state.links;
    this.nodeProps = {
      // ...
    };
    this.linkProps = {
      linkWidth: this.props.linkWidth || "3px",
      linkColor: this.props.linkColor || "lightgrey"
    };
  },

  render: function() {
    var style = {
      position: "relative",
      overflow: "hidden",
      userSelect: "none"
    };

    return (
      <div>
        <div className="CSSNodeGraph" style={ style }>
          <div className="nodes">{ this.generateNodes() }</div>
          <div className="links">{ this.generateLinks() }</div>
        </div>
        <button onClick={this.testNodes}>add test Nodes</button>
      </div>
    );
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(this.state.crosslinks.length > 0) {

      var crosslinks = this.state.crosslinks.slice();
      for(var i=crosslinks.length-1; i>=0; i--) {
        var crosslink = crosslinks[i];
        var link = this.refs["link" + crosslink.linkid];
        var from = this.refs["node" + crosslink.from];
        var to = this.refs["node" + crosslink.to];
        link.setNodes(from, to);
      }
      this.setState({ crosslinks: [] });
    }
  },

  addNode: function(label, value, x, y) {
    var id = CSSNodeGraph.nextId();
    var key = "node" + id;
    this.nodes[id] = {
      label: label,
      value: value,
      x: x||0,
      y: y||0,
      id: id,
      key: key,
      ref: key
    };
    Object.keys(this.nodeProps).forEach(p => { this.nodes[id][p] = this.nodeProps[p]; });
    var nodes = Object.keys(this.nodes).map(id => this.nodes[id] );
    this.setState({ nodes: nodes });
    return id;
  },

  link: function(from, to, direction, label) {
    direction = direction || 0;
    label = label || "";
    var id = CSSNodeGraph.nextId();
    var key = "link" + id;
    this.links[id] = {
      from: this.nodes[from],
      to: this.nodes[to],
      direction: direction||0,
      id: id,
      key: key,
      ref: key
    };
    Object.keys(this.linkProps).forEach(p => { this.links[id][p] = this.linkProps[p]; });
    var links = Object.keys(this.links).map(id => this.links[id] );
    this.setState({ links: links });
    return id;
  },

  // RENDERING

  generateNodes: function() {
    return this.state.nodes.map(n => <Node {...n} />);
  },

  generateLinks: function() {
    return this.state.links.map(l => <Link {...l} />);
  },

  // TESTING

  testNodes: function() {
    var dims = this.getDOMNode().getBoundingClientRect();
    var nodecount = 10;
    var v = 1;
    var root = this.addNode(v,v,
      20 + Math.random()*(dims.width-40),
      20 + Math.random()*(dims.height-40)
    );
    var crosslinks = [];
    while(nodecount-->0) {
      var vl = v*2,
          vr = (v-1)/3,
          left = this.addNode(v*2,v*2,
            20 + Math.random()*(dims.width - 40),
            20 + Math.random()*(dims.height - 40)
          ),
          right = (!!vr && vr == Math.floor(vr)) ? this.addNode((v-1)/3,(v-1)/3,
            20 + Math.random()*(dims.width - 40),
            20 + Math.random()*(dims.height - 40)
          ) : false;
      crosslinks.push({ from: root, to: left, linkid: this.link(root,left) });
      if(right) { crosslinks.push({ from: root, to: right, linkid: this.link(root,right) }); }
      v = vl;
      root = left;
    }
    this.setState({ crosslinks: crosslinks });
  }
});

module.exports = CSSNodeGraph;
