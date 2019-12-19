# miragejs-openapi

Generate [miragejs](https://miragejs.com/) code based on an [OpenAPI Specification](https://github.com/OAI/OpenAPI-Specification).

# Roadmap

- Server configuration and ~~routes (path, verb, headers, response code).~~
- Based on flag (and on REST standards) create logic do CRUD the models.
- Models based on the JsonSchema present on the spec.
- Factories for the models that generate fake data based on the type and name of the model fields.

# Generated output

```js
/*
  GET /pets
  Returns all pets from the system that the user has access to.
*/
this.get("/pets", (schema, request) => {
  return new Response(200, {}, [
    {
      name: "veniam",
      id: 79358504
    },
    {
      name: "laboris dolore",
      id: 61430864
    },
    {
      name: "sunt fugiat dolor labore anim",
      id: -51067098
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
      name: "aliqua sit quis",
      id: -79696536
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
      name: "ut",
      id: -25101238
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
