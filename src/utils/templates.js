const doT = require("dot");
const imports = require("../templates/imports");

doT.templateSettings.strip = false;
const templates = doT.process({
  path: `${__dirname}/../templates/`,
});

const getTemplateImports = name => imports[name] || [];

const processTemplate = (name, options) => {
  const template = templates[name];

  if (!template) throw new Error("Template name provided is invalid");

  const templateImports = getTemplateImports(name);

  return [template(options), templateImports];
};

module.exports = {
  templates,
  processTemplate,
  getTemplateImports,
};
