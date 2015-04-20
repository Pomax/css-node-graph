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
    return { nodes: [], links: [] };
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

    var nodes = this.generateNodes();
    var links = this.generateLinks();

    return (
      <div>
        <div className="CSSNodeGraph" style={ style }>
          <div className="nodes">{ nodes }</div>
          <div className="links">{ links }</div>
        </div>
        <button onClick={this.testNodes}>add test Nodes</button>
        <button onClick={this.testLinks}>add test Links</button>
        <button onClick={this.startWibble}>wibble</button>
      </div>
    );
  },

  addNode: function(label, x, y) {
    var id = CSSNodeGraph.nextId();
    var key = "node" + id;
    this.nodes[id] = { label: label, x: x||0, y: y||0, id: id, key: key, ref: key };
    Object.keys(this.nodeProps).forEach(p => { this.nodes[id][p] = this.nodeProps[p]; });
    var nodes = Object.keys(this.nodes).map(id => this.nodes[id] );
    this.setState({ nodes: nodes });
  },

  removeNode: function(id) {
    var node = this.nodes[id];
    delete this.nodes[id];
    var links = node.getLinks();
    links.forEach(function(linkid) { delete this.links[linkid]; }.bind(this));
    this.setState({ nodes: this.nodes, links: this.links });
  },

  link: function(from, to, direction, label) {
    if (from === to) return;

    direction = direction || 0;
    label = label || "";
    var id = CSSNodeGraph.nextId();
    var key = "link"+id
    from = this.refs["node"+from];
    to = this.refs["node"+to];
    if (from === to) return;

    from.link(id);
    to.link(id);
    this.links[id] = { from: from, to: to, direction: direction||0, ref: key, key: key, id: id };
    Object.keys(this.linkProps).forEach(p => { this.links[id][p] = this.linkProps[p]; });
    var links = Object.keys(this.links).map(id => this.links[id] );
    this.setState({ links: links });
  },

  // RENDERING

  generateNodes: function() {
    return this.state.nodes.map(function(n) { return <Node {...n} />; });
  },

  generateLinks: function() {
    return this.state.links.map(function(l) { return <Link {...l} />; });
  },

  // TESTING

  testNodes: function() {
    for(var i=0, size=100, dim=3; i<dim*dim; i++) {
      this.addNode(String.fromCharCode(65+i), size + (i%dim)*size, size + Math.floor(i/dim)*size);
    }
  },

  testLinks: function() {
    if(this.nodes.length === 0) return;
    var keys = Object.keys(this.nodes).map(id => id|0);
    for(var i=0; i<7; i++) {
      var n1 = (Math.random() * keys.length)|0;
      do { var n2 = (Math.random() * keys.length)|0; } while (n2 === n1);
      this.link(keys[n1], keys[n2]);
    }
  },

  startWibble: function() {
    var wibble = this.startWibble.bind(this);
    var distance = 50;
    this.nodes.forEach(n => {
      var angle = Math.random() * 2*Math.PI;
      n.x += Math.cos(angle) * distance;
      n.y += Math.sin(angle) * distance;
    });
    this.setState({ nodes: this.nodes });
    setTimeout(function() { wibble(); }, 1000);
  }
});

module.exports = CSSNodeGraph;
