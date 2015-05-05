var React = require('react');

var PI = Math.PI;
var atan2 = Math.atan2;
var sqrt = Math.sqrt;

var Links = React.createClass({

  render: function() {
    return <div>{ this.generateLinks() }</div>;
  },

  generateLinks: function() {
    return this.props.node.links.map(this.formLink);
  },

  formLink: function(link) {
    var n1 = this.props.node;
    var n2 = link.node;
    if(!n1 || !n2) return {};

    var x1 = n1.position.x,
        y1 = n1.position.y,
        x2 = n2.position.x,
        y2 = n2.position.y,
        dx = x2 - x1,
        dy = y2 - y1;

    var radToDeg = 180 / Math.PI,
        angle = (Math.atan2(dy,dx) * radToDeg)|0;

    var dist = sqrt(dx*dx + dy*dy)|0;

    // align with node 1
    var transforms = [
      "translate("+(15 + x1 + this.props.offset.x)+"px,"+(10 + y1 + this.props.offset.y)+"px)",
      "rotate("+angle+"deg)"
    ];

    var style = {
      position: "absolute",
      transform: transforms.join(" "),
      transformOrigin: "top left",
      width: dist + "px",
      height: (this.props.linkWidth || 2) + "px",
      backgroundColor: this.props.linkColor || "grey",
      zIndex: 1,
      userSelect: "none",
      transition: "all 1s ease"
    };

    var key = n1.content + "-" + n2.content;

    return <div className="link" style={style} key={key}/>;
  }

});

module.exports = Links;
