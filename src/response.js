const jsf = require("json-schema-faker");
const faker = require("faker");
const propertyNameInferenceMap = require("../mirage-open-api");

jsf.option("alwaysFakeOptionals", true);
jsf.extend("faker", () => faker);

function inferBasedOnPropertyName(json) {
  if (Array.isArray(json)) {
    return json.map(i => inferBasedOnPropertyName(i));
  }

  return Object.keys(json).reduce((final, key) => {
    let value = json[key];
    const isKeyPresent = !!propertyNameInferenceMap[key];

    if (typeof value === "object") {
      value = inferBasedOnPropertyName(value);
    }

    return Object.assign({}, final, {
      [key]: isKeyPresent ? propertyNameInferenceMap[key]() : value
    });
  }, {});
}

exports.getResponse = openApiResponse => {
  let headers = {};
  let body = {};

  if (!openApiResponse) {
    return null;
  }

  if (openApiResponse.content) {
    const [contentType] = Object.keys(openApiResponse.content);

    headers["Content-Type"] = contentType;

    const schema = openApiResponse.content[contentType].schema;

    body = inferBasedOnPropertyName(jsf.generate(schema));
  }

  if (openApiResponse.headers) {
    headers = Object.keys(openApiResponse.headers).reduce((acc, headerKey) => {
      return Object.assign({}, acc, {
        [headerKey]: jsf.generate(openApiResponse.headers[headerKey].schema)
      });
    }, headers);
  }

  return { headers, body };
};
