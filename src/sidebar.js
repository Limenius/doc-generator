const Tree = require("./tree");
const readSpecs = require("./readSpecs");
const { readDir, isDirectory } = require("./fileUtils");

function buildSidebar(baseOutPath, baseInPath, prefix) {
  return new Promise(async function(resolve, reject) {
    const tree = new Tree();
    await processDir(baseOutPath, baseInPath, prefix, tree, null);
    resolve(tree);
  });
}

function processDir(baseOutPath, baseInPath, prefix, tree, parent) {
  return new Promise(async function(resolve, reject) {
    const spec = await readSpecs(`${baseInPath + prefix}spec.json`);
    let node;
    if (!parent) {
      node = { title: "Liform React", path: "/" };
      tree.add(node);
    } else {
      node = { title: spec.title, path: prefix };
      tree.add(node, parent);
    }
    await processSubDirs(baseOutPath, baseInPath, prefix, tree, node);
    resolve();
  });
}

function processSubDirs(baseOutPath, baseInPath, prefix, tree, parent) {
  return new Promise(async function(resolve, reject) {
    const items = await readDir(baseInPath + prefix);
    const tasks = items.map(item =>
      processItem(baseOutPath, baseInPath, prefix + item, tree, parent)
    );
    Promise.all(tasks).then(() => {
      resolve();
    });
  });
}

function processItem(baseOutPath, baseInPath, itemPath, tree, parent) {
  return new Promise(async function(resolve, reject) {
    if (isDirectory(baseInPath + itemPath)) {
      await processDir(baseOutPath, baseInPath, itemPath + "/", tree, parent);
      resolve();
    } else {
      resolve();
    }
  });
}

module.exports = buildSidebar;
