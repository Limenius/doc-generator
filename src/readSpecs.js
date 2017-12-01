const {
  readFile,
} = require("./fileUtils");

async function readSpecs(path) {
  const specJson = await readFile(path);
  const spec = JSON.parse(specJson);
  return spec;
}

module.exports = readSpecs;