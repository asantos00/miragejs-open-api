# miragejs-open-api

Generate [miragejs](https://miragejs.com/) code based on an [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification).

**Currently only supports openapi v3**

# Vision

To enable generating a **pluggable** [miragejs](https://miragejs.com/) configuration with mocked data based on the user's OpenAPI spec. Generated files should be seen as disposable and able to be generated **at any time** from the spec file.

# Roadmap

Currently, the package generates the routes defined on the OpenAPI spec file, using `spec.responses.0` as the response.

To improve the quality of the mocked data, a user-customizable file is available for specifying what data to generate based on JSON keys (e.g: running `faker.date.past` for `createdAt` and `updatedAt` fields).

In the near future, MirageJS factories and Models will be exported by the generated files. At the moment the Mirage API returns 'hardcoded' fake data (look at generated output below), in the future this data should use Factories and seeds to make it more interactive and close to real.

The goal is to **generate the complete set of Mirage entities (models, factories, route handlers)** and the connections between them. It should allow to start using full featured mirage just by running the generator against a spec file.

One of the identified difficulties of this approach is that the spec might not have enough data for the generator to be able to infer the relations, but that's something still in discussion/research.

We're very happy to accept any contributions, opinions, suggestions and why/how is it working or not for your use case and what can we do to make it work.

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

# Plugging into an existing configuration

The generated files export functions that can be used together with an existing MirageJS config.

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
