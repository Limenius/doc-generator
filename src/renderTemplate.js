const App = require("./components/App");
const ReactDOM = require("react-dom/server");
const { ServerStyleSheet } = require("styled-components");
const React = require("react");
const Typography = require("typography");
const theme = require("typography-theme-elk-glen").default;
const typography = new Typography(theme);

const renderTemplate = (component, spec, breadcrumb, sidebar) => {
  const sheet = new ServerStyleSheet();
  const html = ReactDOM.renderToStaticMarkup(
    sheet.collectStyles(
      <App breadcrumb={breadcrumb} sidebar={sidebar}>
        {React.createElement(component)}
      </App>
    )
  );

  const styleTags = sheet.getStyleTags();
  return `
<html lang="en">

<head>
  <meta charSet="utf-8" />
  <meta httpEquiv="x-ua-compatible" content="ie=edge" />
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
  <title>${spec.title} - Liform React</title>
  <link rel="stylesheet" href="prism.css" />
  <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous">
  <style type="text/css">
  ${typography.toString()}
  </sctle>
  ${styleTags}
  <link rel="stylesheet" href="prism.css" />
</head>

<body>
  ${html}
  <script src="./bundle.js"></script>
</body>

</html>
`;
};

module.exports = renderTemplate;
