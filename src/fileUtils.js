const fs = require("fs");
const mkdirp = require("mkdirp");

const readFile = path => {
  return new Promise((resolve, reject) => {
    fs.readFile(path, "utf-8", (err, body) => resolve(body));
  });
};

const readDir = path => {
  return new Promise((resolve, reject) => {
    fs.readdir(path, (err, item) => resolve(item));
  });
};

const writeFile = (path, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, err => resolve());
  });
};

const mkdirP = path => {
  return new Promise((resolve, reject) => {
    mkdirp(path, () => resolve());
  });
};

const copyFile = (pathIn, pathOut) => {
  return new Promise((resolve, reject) => {
    fs.copyFile(pathIn, pathOut, err => resolve());
  });
};

const isDirectory = source => fs.lstatSync(source).isDirectory();

module.exports = {
  readFile,
  readDir,
  writeFile,
  mkdirP,
  copyFile,
  isDirectory
};
