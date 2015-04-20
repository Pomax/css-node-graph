var React = require('react');
var CSSNodeGraph

var PI = Math.PI;
var atan2 = Math.atan2;
var sqrt = Math.sqrt;

var Link = React.createClass({

  getInitialState: function() {
    return { updated: 0 };
  },

  componentWillMount: function() {
    document.addEventListener("node::moved", this.nodeMoved)
  },

  nodeMoved: function(evt) {
    var node = evt.detail.node;
    if(node === this.props.from || node === this.props.to) {
      this.setState({ updated: this.state.updated++ });
    }
  },

  render: function() {
    return (<div className="link" style={ this.generateStyle() } />);
  },

  generateStyle: function() {
    var n1 = this.props.from;
    var n2 = this.props.to;
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
      "translate("+n1.state.x+"px,"+n1.state.y+"px)",
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
