const fs = require("fs");
const path = require("path");
const marked = require("marked");
const handlebars = require("handlebars");
const React = require("react");
const PageContent = require("./components/PageContent");
const Prism = require("prismjs");
const buildWebpack = require("./buildWebpack");
const renderTemplate = require("./renderTemplate");
const readSpecs = require("./readSpecs");
const buildSidebar = require("./sidebar");

const baseOutPath = path.resolve(__dirname, `../../built_docs`);
const baseInPath = path.resolve(__dirname, `../../docs/pages`);
const {
  readFile,
  readDir,
  isDirectory,
  writeFile,
  copyFile,
  mkdirP
} = require("./fileUtils");

async function build() {
  const breadcrumb = [{ title: "Liform React", path: "/" }];

  const sidebar = await buildSidebar(baseOutPath, baseInPath, "/");
  renderDir(baseOutPath, baseInPath, "/", breadcrumb, sidebar);
}

build();


async function renderDir(baseOutPath, baseInPath, prefix, breadcrumb, sidebar) {
  const spec = await readSpecs(`${baseInPath + prefix}spec.json`);
  renderItem(baseOutPath, baseInPath, prefix, breadcrumb, spec, sidebar);
  renderSubDirs(baseOutPath, baseInPath, prefix, breadcrumb, sidebar);
}

async function renderSubDirs(baseOutPath, baseInPath, prefix, breadcrumb, sidebar) {
  const items = await readDir(baseInPath + prefix);
  items.forEach(async function(item) {
    const itemPath = prefix + item;
    if (isDirectory(baseInPath + itemPath)) {
      const spec = await readSpecs(`${baseInPath + itemPath + "/"}spec.json`);
      renderDir(baseOutPath, baseInPath, itemPath + "/", [
        ...breadcrumb,
        { title: spec.title, path: itemPath + "/"}
      ], sidebar);
    }
  });
}

async function renderItem(baseOutPath, baseInPath, prefix, breadcrumb, spec, sidebar) {
  const outDir = baseOutPath + prefix;
  const inDir = baseInPath + prefix;

  const body = await readFile(`${inDir}index.md`);
  const text = marked(body);
  const code = await readFile(`${inDir}index.js`);
  const codeHl = Prism.highlight(code, Prism.languages.javascript);
  const page = renderTemplate(PageContent(text, codeHl,spec), spec, breadcrumb, sidebar);
  console.log(page)

  await mkdirP(outDir);
  await writeFile(`${outDir}index.html`, page);
  buildWebpack(outDir, inDir);
  copyPrismCss(outDir);
}


async function copyPrismCss(outDir) {
  await copyFile(path.resolve(__dirname, "../prism.css"), outDir + "prism.css");
}
