const React = require("react");
const { Link } = require("rebass");
const SidebarItem = require("./atoms/SidebarItem");

const Sidebar = ({ tree }) => {
  let nodes = [];
  tree.traverse((item, depth) => {
    nodes.push({ ...item.data, depth });
  });
  return (
    <div>
      {nodes.map(({ path, depth, title }, idx) => (
        <div key={path}>
          <SidebarItem depth={depth}>
            <Link key={path} href={path} children={title} />
          </SidebarItem>
        </div>
      ))}
    </div>
  );
};

module.exports = Sidebar;
