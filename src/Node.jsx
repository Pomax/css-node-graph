var React = require('react');

var Node = React.createClass({
  render: function() {
    var node = this.props.node;
    var style = {
      position: "absolute",
      transform: "translate(" + (node.position.x + this.props.offset.x) + "px, " + (node.position.y + this.props.offset.y) + "px)",
      border: "3px solid rgba(99,175,254," + (node.shadow ? 0.5 : 1) + ")",
      boxShadow: "0 0 3px rgb(99,175,254)",
      backgroundColor: "white",
      color: "rgba(0,0,0," + (node.shadow ? 0.5 : 1) + ")",
      zIndex: 2,
      borderRadius: "999em",
      minWidth: "1em",
      minHeight: "1em",
      textAlign: "center",
      padding: "0 3px",
      cursor: "pointer",
      userSelect: "none",
      transition: "all 1s ease",
    };
    return (<div className="node" style={style} onClick={this.props.onClick}>{ node.label }</div>);
  }
});

module.exports = Node;
