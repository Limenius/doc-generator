const React = require("react");
const { Link } = require("rebass");

const Breadcrumb = ({ breadcrumb }) => (
  <div>
    {breadcrumb.map(({title, path}, idx) => (
    <React.Fragment key={idx}>
      <Link href={path} children={title} />{" "}
      {idx === breadcrumb.length - 1 ? "" : "/"}{" "}
    </React.Fragment>
    ))}
  </div>
);

module.exports = Breadcrumb;
