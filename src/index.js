const SwaggerParser = require("swagger-parser");
const fse = require("fs-extra");
const { processTemplate } = require("./utils/templates");
const { buildFileContents } = require("./utils/file");
const { ConfigManager } = require("./ConfigManager");
const jsf = require("json-schema-faker");
const contentType = "application/json";

const replaceParamNotation = url => url.replace("{", ":").replace("}", "");

const generateRouteFromPath = (pathString, pathDefinition) => {
  const verbsInPath = Object.keys(pathDefinition);

  return verbsInPath.reduce((acc, verb) => {
    const [content, dependencies] = generateHandlerFromVerb(
      verb,
      pathString,
      pathDefinition[verb],
    );

    const currentContent = acc[0] || "";
    const currentDependencies = acc[1] || [];
    return [
      `${currentContent} \n ${content}`,
      [...dependencies, ...currentDependencies],
    ];
  }, []);
};

const generateRoutes = paths => {
  const [content, dependencies] = Object.keys(paths).reduce((acc, path) => {
    const [content, dependencies] = generateRouteFromPath(path, paths[path]);

    const currentContent = acc[0] || "";
    const currentDependencies = acc[1] || [];
    return [
      `${currentContent} \n ${content}`,
      [...dependencies, ...currentDependencies],
    ];
  }, []);

  fse.outputFileSync(
    `${ConfigManager.output}/routes.js`,
    buildFileContents({
      dependencies,
      content,
    }),
  );
};

const generateServerConfiguration = servers => {
  const urlPrefix = servers && servers.length > 0 ? servers[0].url : null;

  const [serverConfiguration, dependencies] = processTemplate("server", {
    urlPrefix,
  });

  const fileContents = buildFileContents({
    dependencies,
    content: serverConfiguration,
  });

  fse.outputFileSync(`${ConfigManager.output}/server.js`, fileContents);
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
  const [result, dependencies] = processTemplate("handler", {
    verb,
    statusCode,
    path,
    headers: JSON.stringify({}),
    description: verbDefinition.description,
    body: JSON.stringify(body, null, 4),
  });

  return [result, dependencies];
};

async function run() {
  const { paths, servers } = await SwaggerParser.dereference(
    ConfigManager.input,
  );

  generateRoutes(paths);

  generateServerConfiguration(servers);
}

module.exports = {
  run,
};
