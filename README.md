# miragejs-open-api

Generate [miragejs](https://miragejs.com/) code based on an [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification).

# Usage

```sh
npx mirage-open-api --input="./example.yaml" --output="./dist/generated-mirage"
```

## Parameters

- input - `--input` - Input file path (can be local or remote)
- output - `--output` - Output folder path

# Generated output

```js
// server.js


import { Server } from "miragejs";
const server = new Server({
  baseConfig() {
    this.urlPrefix = "http://petstore.swagger.io/api";
  }
});
```

```js
// routes.js
import { Response } from "miragejs";
/*
  GET /pets
  Returns all pets from the system that the user has access to.
*/
this.get("/pets", (schema, request) => {
  return new Response(200, {}, [
    {
      name: "anim",
      id: -43222528
    },
    {
      name: "aliquip ex sint occaecat",
      id: -20747246
    },
    {
      name: "nostrud sed in a",
      id: -48761945
    },
    {
      name: "in mollit",
      id: -64292085
    }
  ]);
});

/*
  POST /pets
  Creates a new pet in the store. Duplicates are allowed
*/
this.post("/pets", (schema, request) => {
  return new Response(
    200,
    {},
    {
      name: "officia nostrud sit",
      id: -86362129
    }
  );
});

/*
  GET /pets/:id
  Returns a user based on a single ID, if the user does not have access to the pet
*/
this.get("/pets/:id", (schema, request) => {
  return new Response(
    200,
    {},
    {
      name: "labore elit commodo dolore aliquip",
      id: -67883762
    }
  );
});

/*
  DELETE /pets/:id
  deletes a single pet based on the ID supplied
*/
this.delete("/pets/:id", (schema, request) => {
  return new Response(200, {}, {});
});

```
