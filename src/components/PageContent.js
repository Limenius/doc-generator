const React = require("react");

const PageContent = (markdown, code, spec) => () => (
  <div>
    <h1>{spec.title}</h1>
    <div dangerouslySetInnerHTML={{__html: markdown}}></div>
    <div id="placeholder"/>
    <pre dangerouslySetInnerHTML={{__html: code}}/>
  </div>
);

module.exports = PageContent;
