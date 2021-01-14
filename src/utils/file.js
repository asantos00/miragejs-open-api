const prettier = require("prettier");
const { processTemplate } = require("./templates");
const uniq = require("lodash.uniq");

const buildFileContents = ({ dependencies, content, file = "" }) => {
  let contentToWrite = content;

  const [dependenciesContent] = processTemplate("dependencies", {
    dependencies: uniq(dependencies)
  });

  if (file) {
    contentToWrite = processTemplate(`file-${file}`, { content })[0];
  }

  return prettier.format(`${dependenciesContent} \n ${contentToWrite}`, {
    parser: "babel"
  });
};

module.exports = {
  buildFileContents
};
