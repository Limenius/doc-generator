const {
  readFile,
} = require("./fileUtils");

async function readSpecs(path) {
  const specJson = await readFile(path);
  try {
    const spec = JSON.parse(specJson);
    return spec;
  } catch (e) {
    console.log(path+ " " +e);
  }
}

module.exports = readSpecs;