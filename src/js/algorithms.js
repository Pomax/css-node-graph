module.exports = {
  /**
   * Straight up grid flow
   */
  LADDER: function(xscale, yscale) {
    yscale = yscale || xscale;

    // first children are spaced x-scale, second children are spaced y-scale.
    // This may leave nodes overlapping. We are okay with that here.
    return function reflow(node, x, y) {
      node.position.x = parseInt(x,10) || 0;
      node.position.y = parseInt(y,10) || 0;
      var links = node.links;
      if (links.length > 0) {
        reflow( links[0].node, node.position.x + xscale, node.position.y );
      }
      if (links.length > 1) {
        reflow( links[1].node, node.position.x, node.position.y + yscale);
      }
    };
  }
};
