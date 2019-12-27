const SwaggerParser = require("swagger-parser");
const doT = require("dot");
const fse = require("fs-extra");
const prettier = require("prettier");
const jsf = require("json-schema-faker");
const { getProcessArguments } = require("./utils/processArguments");
const contentType = "application/json";

doT.templateSettings.strip = false;
const dots = doT.process({
  path: __dirname + "/templates"
});

const replaceParamNotation = url => url.replace("{", ":").replace("}", "");

const generateRouteFromPath = (pathString, pathDefinition) => {
  const verbsInPath = Object.keys(pathDefinition);
  const handlers = verbsInPath.map(verb =>
    generateHandlerFromVerb(verb, pathString, pathDefinition[verb])
  );

  return handlers.join("\n");
};

const generateServerConfiguration = servers => {
  if (servers.length <= 0) {
    return "";
  }

  const result = dots.server({
    urlPrefix: servers[0].url
  });

  return result;
};

const generateHandlerFromVerb = (verb, pathString, verbDefinition) => {
  const path = replaceParamNotation(pathString);
  const successResponse = verbDefinition.responses[200];

  let body = {};
  let statusCode = 200;

  if (successResponse) {
    const schema = successResponse.content[contentType].schema;

    body = jsf.generate(schema);
  }

  const result = dots.handler({
    verb,
    statusCode,
    path,
    headers: JSON.stringify({}),
    description: verbDefinition.description,
    body: JSON.stringify(body, null, 4)
  });

  return result;
};

async function run() {
  const { output, input } = getProcessArguments();

  const { paths, servers } = await SwaggerParser.dereference(input);

  const serverConfig = generateServerConfiguration(servers);

  const apiPaths = Object.keys(paths)
    .map(path => generateRouteFromPath(path, paths[path]))
    .join("\n");

  const result = `${serverConfig} ${apiPaths}`;
  const prettified = prettier.format(result, { parser: "babel" });

  fse.outputFileSync(output, prettified);
}

module.exports = {
  run
};
