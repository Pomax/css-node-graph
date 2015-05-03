var React = require('react');

var Node = React.createClass({
  render: function() {
    var style = {
      position: "absolute",
      transform: "translate(" + (this.props.node.position.x + this.props.offset.x) + "px, " + (this.props.node.position.y + this.props.offset.y) + "px)",
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
      userSelect: "none",
      transition: "all 1s ease"
    };
    return (<div className="node" style={style} onClick={this.props.onClick}>{ this.props.node.label }</div>);
  }
});

module.exports = Node;
