var Node = require("./graph");

module.exports = function load(value) {

  var limit = 10;
  if(typeof document !== "undefined") {
    limit = 2 + Math.ceil(document.body.getBoundingClientRect().width / 100);
  }

  var nodes = {};
  nodes[value] = new Node(value, value);

  for (var i=1, val=value, node, lval, rval; i<limit; i++) {

    lval = val * 2;
    lnode = new Node(lval, lval);
    if (!nodes[lval]) {
      nodes[lval] = lnode;
    } else {
      lnode.shadow = true;
      nodes["shadow"+lval] = lnode;
    }
    nodes[val].link(lnode, "n/2", Node.BACKWARD);
  
    rval = (val-1) / 3;
    if (rval === Math.floor(rval)) {
      rnode = new Node(rval, rval);
      if(!nodes[rval]) {
        nodes[rval] = rnode;
      } else {
        rnode.shadow = true;
        nodes["shadow"+rval] = rnode;
      }
      nodes[val].link(rnode, "3n+1", Node.BACKWARD);
      nodes[val].bow(rnode, "⇒ "+(val+rval), false, Node.RIGHT);

      var rbval = (rval-1)/4;
      if (nodes[rbval]) {
        var rbnode = nodes["shadow"+rbval];
        if(!rbnode) { rbnode = nodes[rbval]; }
        rbnode.bow(rnode, "4n+1", Node.FORWARD, Node.BELOW);
        if(nodes[val/4]) {
          nodes[val/4].bow(nodes[val], "4n", Node.FORWARD, Node.ABOVE);
        }
      }
    }

    val = lval;
  }
  nodes[value].reflow(Node.LADDER(100, 100));

  var sval = value%2===0 ? value / 2 : 3 * value + 1;
  var superparent = new Node(sval, sval);
  if(nodes[sval]) { nodes["superparent"] = superparent; } else { nodes[sval] = superparent; }
  superparent.link(nodes[value]);
  superparent.position = { x: 0, y: -70 };
  superparent.shadow = true;

  return nodes;
};
