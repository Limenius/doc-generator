const styled = require("styled-components").default;

module.exports = styled.div`
  padding-left: ${props => (props.depth * 10 + 4) + "px"};
  padding-right: 1em;
  padding-top: 4px;
  padding-bottom: 4px;
  border: 1px solid #AAA;
  background-color: #fefefe;
`