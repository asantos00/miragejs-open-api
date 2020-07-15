# miragejs-open-api

Generate [miragejs](https://miragejs.com/) code based on an [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification).

**Currently only supports openapi v3**

# Vision

This package aims to be used to generate a [miragejs](https://miragejs.com/) configuration while letting the user override specific routes.

The main goal is for the generator to always run, only affecting the generated files and not the user overrides, treating the generated files as disposable.

It should expose functions and utilities the user can plug into his MirageJS configuration.

# Roadmap

Currently, the package generates the routes defined on the openapi spec file. The response that mirage will return will be the first response listed on the spec file (example: a 200 for a REST GET request).

It uses the schema types and formats to generate fake data. We plan to add a file where the generator user can choose what `fakerjs` functions to run based on the names of the fields, for instance, running `faker.date.past` for a `createdAt` and `updatedAt` fields.

In the near future, MirageJS factories and Models might be generated. Currently, the API returns 'hardcoded' fake data (look at generated output below), it means that doesn't matter how many times the request is done, the data is always the same. A future solution would be to use Factories to make sure the generated data is different on every request.

The vision is to generate the complete set of Mirage entities (models, factories, route handlers) and the connections between them, allowing to use the Mirage in-memory database to CRUD records, all of this generated without the user having to configure a thing.

One of the identified difficulties of this approach is that the spec might not have enough data for the generator to be able to infer the relations.

We're very happy to accept any contributions, opinions, suggestions and why/how is it working or not for your use case.

# Usage

```sh
npx mirage-open-api --input="./example.yaml" --output="./dist/generated-mirage"
```

## Parameters

- input - `--input` - Input file path (can be local or remote)
- output - `--output` - Output folder path

# Generated output

It will generate files that can then be imported together with an existing Mirage config.

```js
// server.js

import { Server } from "miragejs";

export const configureServer = serverArgs =>
  new Server({
    urlPrefix: "http://petstore.swagger.io/api",
    ...serverArgs
  });

```

```js
// routes.js

export const defineRoutes = server => {
  /*
    POST /pets
    Creates a new pet in the store. Duplicates are allowed
  */
  server.post("/pets", (schema, request) => {
    return new Response(
      200,
      {
        "Content-Type": "application/json"
      },
      {
        name: "Emmanuelle Cartwright",
        id: "fe558cd8-78d0-b721-6ec5-44fe79c7e114",
        email: "Elva.Rodriguez@gmail.com",
        tag: "sed officia cupidatat adipisicing"
      }
    );
  });
}

```

For instance, having an existing mirage config but wanting to use the routes defined by the generated file:

```js
import { Server } from "miragejs";

import {defineRoutes} from './generated/routes';

const server = new Server({
  // User already existing mirage config,
  routes() {
    const server = this;
    defineRoutes(server);

    server.get('/pets', () => {
      // Define an override for the pets route
      return []
    }
  }
});

```
