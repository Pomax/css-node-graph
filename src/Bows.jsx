var React = require('react');
var Node = require('./js/graph');

var PI = Math.PI;
var atan2 = Math.atan2;
var sqrt = Math.sqrt;

var Bows = React.createClass({

  render: function() {
    return <div>{ this.generateBows() }</div>;
  },

  generateBows: function() {
    return this.props.node.bows.map(this.formBow);
  },

  formBow: function(link) {
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

    if (link.orientation === Node.RIGHT) {
      x1 += 30;
    }

    // align with node 1
    var transforms = [
      "translate("+(15 + x1 + this.props.offset.x)+"px,"+(10 + y1 + this.props.offset.y)+"px)",
      "rotate("+angle+"deg)"
    ];

    var style = {
      position: "absolute",
      transform: transforms.join(" "),
      transformOrigin: "top left",
      width: dist,
      height: 30,
      border: "0px solid",
      borderColor: "rgba(123, 123, 255, 0.5)",
      borderRadius: 30,
      zIndex: 1,
      userSelect: "none",
      textAlign: "center",
      transition: "all 1s ease"
    };

    var spanStyle = {
      display: "block",
      position: "relative",
      textAlign: "left",
      transformOrigin: "center center"
    };

    if (link.orientation === Node.ABOVE || link.orientation === Node.RIGHT) {
      style.borderTopWidth = (this.props.linkWidth || 2)
      if (link.orientation === Node.ABOVE) {
        style.marginTop = -style.height;
        spanStyle.top = "-1.25em";
      } else {
        style.marginTop = 0;
        spanStyle.transform = "translate(0,-70px) rotate(-90deg)";
      }
    }
    else if (link.orientation === Node.BELOW) {
      style.borderBottomWidth = (this.props.linkWidth || 2)
      spanStyle.bottom = "-2em";
    }

    var key = n1.content + "-" + n2.content;

    return <div className="bow" style={style} key={key}>
      <span style={spanStyle}>{ link.label }</span>
    </div>;
  }

});

module.exports = Bows;
