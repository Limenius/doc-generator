const React = require("react");
const Breadcrumb = require("./Breadcrumb");
const Sidebar = require("./Sidebar");
const Container = require("./atoms/Container");
const LeftBar = require("./atoms/LeftBar");
const Wide = require("./atoms/Wide");

const App = ({ children, breadcrumb, sidebar }) => (
  <Container>
    <Wide>
      <Breadcrumb breadcrumb={breadcrumb} />
      <div>{children}</div>
    </Wide>
    <LeftBar>
      <Sidebar tree={sidebar} />
    </LeftBar>
  </Container>
);

module.exports = App;
