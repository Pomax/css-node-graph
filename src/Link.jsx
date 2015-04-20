var React = require('react');
var CSSNodeGraph

var PI = Math.PI;
var atan2 = Math.atan2;
var sqrt = Math.sqrt;

var Link = React.createClass({

  getInitialState: function() {
    return {
      from: false,
      to: false,
      updated: 0
    };
  },

  componentWillMount: function() {
    document.addEventListener("node::moved", this.nodeMoved)
  },

  nodeMoved: function(evt) {
    var node = evt.detail.node;
    if(node === this.state.from || node === this.state.to) {
      this.setState({ updated: this.state.updated++ });
    }
  },

  setNodes: function(from, to) {
    this.setState({ from: from, to: to });
  },

  render: function() {
    return (<div className="link" style={ this.generateStyle() } />);
  },

  generateStyle: function() {
    var n1 = this.state.from;
    var n2 = this.state.to;
    if(!n1 || !n2) return {};
    var direction = this.props.direction;


    var x1 = n1.state.x,
        y1 = n1.state.y,
        x2 = n2.state.x,
        y2 = n2.state.y,
        dx = x2 - x1,
        dy = y2 - y1;

    var radToDeg = 180 / Math.PI,
        angle = (Math.atan2(dy,dx) * radToDeg)|0;

    var dist = sqrt(dx*dx + dy*dy)|0;

    // align with node 1
    var transforms = [
      "translate("+x1+"px,"+y1+"px)",
      "rotate("+angle+"deg)"
    ];

    return {
      position: "absolute",
      transform: transforms.join(" "),
      transformOrigin: "top left",
      width: dist + "px",
      height: this.props.linkWidth,
      backgroundColor: this.props.linkColor || "grey",
      zIndex: 1,
      userSelect: "none"
    };
  }

});

module.exports = Link;
