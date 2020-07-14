import { Response } from "miragejs";
exports.defineRoutes = server => {
  /*
    GET /pets
    Returns all pets from the system that the user has access to.
  */
  server.get("/pets", (schema, request) => {
    return new Response(
      200,
      [
        {
          "X-Rate-Limit-Limit": 65616891
        },
        {
          "X-Rate-Limit-Remaining": -5778245
        },
        {
          "X-Rate-Limit-Reset": -91670657
        }
      ],
      [
        {
          name: "dolor exercitatio",
          id: 29357135
        },
        {
          name: "consequat dolore commodo deserunt ut",
          id: 480358
        },
        {
          name: "magna in et non",
          id: -9885571
        },
        {
          name: "irure cupidatat",
          id: 94518056
        },
        {
          name: "reprehen",
          id: -19333368
        }
      ]
    );
  });

  /*
    POST /pets
    Creates a new pet in the store. Duplicates are allowed
  */
  server.post("/pets", (schema, request) => {
    return new Response(
      200,
      {},
      {
        name: "est ullamco cillum ipsum",
        id: -20544101
      }
    );
  });

  /*
    GET /pets/:id
    Returns a user based on a single ID, if the user does not have access to the pet
  */
  server.get("/pets/:id", (schema, request) => {
    return new Response(
      200,
      {},
      {
        name: "commodo fugiat in",
        id: 28763206
      }
    );
  });

  /*
    DELETE /pets/:id
    deletes a single pet based on the ID supplied
  */
  server.delete("/pets/:id", (schema, request) => {
    return new Response(200, {}, {});
  });
};
