var React = require('react');
var Hammer = require("hammerjs");

var Node = React.createClass({

  getInitialState: function() {
    return {
      label: this.props.label||"",
      x: this.props.x|0,
      y: this.props.y|0,
      offset: { x: 0, y: 0 },
      links: []
    };
  },

  componentWillMount: function() {
    this.links = this.state.links;
  },

  signalUpdated: function() {
    document.dispatchEvent(new CustomEvent("node::moved", { detail: { node: this }}));
  },

  componentDidUpdate: function(prevProps, prevState) {
    if(prevProps.x !== this.props.x || prevProps.y !== this.props.y) {
      this.setState({ x: this.props.x|0, y: this.props.y|0 }, this.signalUpdated);
    }
  },

  componentDidMount: function() {
    var dims = this.getDOMNode().getBoundingClientRect();
    var offset = { y: -((dims.height/2)|0), x: -((dims.width/2)|0) };
    this.setState({ offset: offset });
    document.addEventListener("mousemove", this.reposition);
    document.addEventListener("mouseup", this.commitPosition);
  },

  render: function() {
    var style = {
      position: "absolute",
      transform: "translate("+this.state.x+"px, "+this.state.y+"px)",
      left: this.state.offset.x + "px",
      top: this.state.offset.y + "px",
      border: "3px solid rgb(99,175,254)",
      boxShadow: "0 0 3px rgb(99,175,254)",
      backgroundColor: "white",
      zIndex: 2,
      borderRadius: "999em",
      minWidth: "1em",
      minHeight: "1em",
      textAlign: "center",
      padding: "0 3px",
      cursor: "pointer",
      userSelect: "none"
    };
    return (<div className="node" style={ style } onMouseDown={ this.markPosition }>{ this.state.label}</div>);
  },

  markPosition: function(evt) {
    if (this.positioning) return;
    this.positioning = true;
    this.markx = this.state.x - evt.clientX;
    this.marky = this.state.y - evt.clientY;
  },

  reposition: function(evt) {
    if (this.positioning) {
      var nx = evt.clientX + this.markx,
          ny = evt.clientY + this.marky;
      this.setState({ x: nx, y: ny }, this.signalUpdated);
    }
  },

  commitPosition: function(evt) {
    this.positioning = false;
  },

  getLinks: function() {
    return this.state.links;
  },

  link: function(id) {
    this.links.push(id);
    this.setState({ links: this.links });
  },

  instantiate: function(links) {
    var links = this.state.links.map(l => {
      if (typeof l !== "number") { return l; }
      return links[l];
    });
    this.setState({ links: links });
  }

});

module.exports = Node;
