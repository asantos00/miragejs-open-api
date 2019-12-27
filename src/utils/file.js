const prettier = require("prettier");
const { processTemplate } = require("./templates");
const uniq = require("lodash.uniq");

const buildFileContents = ({ dependencies, content }) => {
  const [dependenciesContent] = processTemplate("dependencies", {
    dependencies: uniq(dependencies),
  });

  const prettified = prettier.format(`${dependenciesContent} \n ${content}`, {
    parser: "babel",
  });

  return prettified;
};

module.exports = {
  buildFileContents,
};
