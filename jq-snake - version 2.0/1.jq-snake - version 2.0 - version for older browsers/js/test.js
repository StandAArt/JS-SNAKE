"use strict";

var g = new GameMap();

g.render();

var s = new Snake(g);
s.render();
s.live();

var m = new Mouse();
g.addMouse(m);
