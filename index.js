const SwaggerParser = require("swagger-parser");
const doT = require("dot");
const fs = require("fs");
const prettier = require("prettier");
const jsf = require("json-schema-faker");

const contentType = "application/json";

doT.templateSettings.strip = false;
const dots = doT.process({
  path: "./templates"
});

const replaceParamNotation = url => url.replace(/{/g, ":").replace(/}/g, "");

const generateRouteFromPath = (pathString, pathDefinition) => {
  const verbsInPath = Object.keys(pathDefinition);
  const handlers = verbsInPath.map(verb =>
    generateHandlerFromVerb(verb, pathString, pathDefinition[verb])
  );

  return handlers.join("\n");
};

const generateHandlerFromVerb = (verb, pathString, verbDefinition) => {
  console.log(`${verb} ${pathString}`);
  const path = replaceParamNotation(pathString);
  const successResponse = verbDefinition.responses[200];

  let body = {};
  let statusCode = 200;

  if (successResponse && successResponse.schema) {
    // const schema = successResponse.content[contentType].schema;
    const schema = successResponse.schema;

    // console.log("Schema:", JSON.stringify(schema, null, 4));
    jsf.option({
      alwaysFakeOptionals: true,
      ignoreProperties: [(property, key) => console.log(property, key)]
    })
    body = jsf.generate(schema);
    // console.log("Generated:", JSON.stringify(body, null, 4));
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
  const { paths } = await SwaggerParser.dereference("example-v2.json");

  const apiPaths = Object.keys(paths)
    .map(path => generateRouteFromPath(path, paths[path]))
    .join("\n");

  const prettified = prettier.format(apiPaths, { parser: "babel" });

  fs.writeFileSync("./dist/mirage.js", prettified, "utf-8");
}

(async () => {
  run();
})();
