# miragejs-openapi

Generate [miragejs](https://miragejs.com/) code based on an [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification).

# Thoughts about architecture

- See other code generation tools ([openapi-ts](https://www.npmjs.com/package/openapi-ts)).
- Probably use a templating engine (doT seems cool).

# Roadmap

- Server configuration and routes (path, verb, headers, arguments, response code).
- Based on flag (and on REST standards) create logic do CRUD the models.
- Models based on the JsonSchema present on the spec.
- Factories for the models that generate fake data based on the type and name of the model fields.
