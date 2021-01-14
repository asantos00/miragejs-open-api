const { getOutputFileText } = require("./testHelpers");

it("generates routes with headers", async () => {
  const output = await getOutputFileText();

  expect(output).toInclude("X-Rate-Limit-Limit");
  expect(output).toInclude("X-Rate-Limit-Remaining");
  expect(output).toInclude("X-Rate-Limit-Reset");
});

it("generates findPetsRoute", async () => {
  const output = await getOutputFileText();

  expect(output).toInclude('server.get("/pets"');
  expect(output).toInclude('server.post("/pets"');
  expect(output).toInclude('server.get("/pets/:id"');
});
