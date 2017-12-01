const build = require("./builder");
const path = require("path");

const baseInPath = process.cwd()+"/"+process.argv[2];
const baseOutPath = process.cwd()+"/"+process.argv[3];

build(baseOutPath, baseInPath);
