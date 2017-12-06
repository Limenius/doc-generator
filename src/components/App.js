const React = require("react");
const Breadcrumb = require("./Breadcrumb");
const Sidebar = require("./Sidebar");
const Container = require("./atoms/Container");
const ContentContainer = require("./atoms/ContentContainer");
const LeftBar = require("./atoms/LeftBar");
const Wide = require("./atoms/Wide");

const App = ({ children, breadcrumb, sidebar }) => (
  <Container>
    <Wide>
      <ContentContainer>
        <Breadcrumb breadcrumb={breadcrumb} />
        <div>{children}</div>
      </ContentContainer>
    </Wide>
    <LeftBar>
      <Sidebar tree={sidebar} />
    </LeftBar>
  </Container>
);

module.exports = App;
