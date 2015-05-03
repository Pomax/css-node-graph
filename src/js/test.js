var Node = require("./graph");

var nodes = { "1": new Node(1, "1") };

for (var limit=12, i=1, val=1, node, lval, rval; i<limit; i++) {

  lval = val * 2;
  if (!nodes[lval]) {
    nodes[lval] = new Node(lval, lval);
    nodes[val].link(nodes[lval], "n/2", Node.BACKWARD);
    if (nodes[val/2]) { nodes[val/2].bow(nodes[lval], "4n"); }
  } else {
    nodes[val].bow(nodes[lval], "n/2", Node.BACKWARD);    
  }

  rval = (val-1) / 3;
  if (rval === Math.floor(rval)) {
    if(!nodes[rval]) {
      nodes[rval] = new Node(rval, rval);
      nodes[val].link(nodes[rval], "3n+1", Node.BACKWARD);
      if (nodes[(rval-1)/4]) { nodes[(rval-1)/4].bow(nodes[rval], "4n+1"); }
    } else {
      nodes[val].bow(nodes[rval], "3n+1", Node.BACKWARD);    
    }
  }

  val = lval;
}

nodes[1].reflow(Node.LADDER(100, 100));

module.exports = nodes;
