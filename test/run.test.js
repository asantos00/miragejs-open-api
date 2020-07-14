it("runs", async () => {
  const mockOutputFileSync = jest.fn();

  jest.mock("fs-extra", () => ({
    outputFileSync: mockOutputFileSync
  }));

  const MirageOpenAPIGenerator = require("../src/index");

  await MirageOpenAPIGenerator.run({
    input: "./fixtures/example.yaml",
    output: "./fixtures/generated"
  });

  // Check the file path is correct
  expect(mockOutputFileSync.mock.calls[0][0]).toBe(
    "./fixtures/generated/routes.js"
  );
  // Check for existance of some routes
  expect(mockOutputFileSync.mock.calls[0][1]).toInclude("/pets");
  expect(mockOutputFileSync.mock.calls[0][1]).toInclude("/pets/:id");

  // Check the file path is correct
  expect(mockOutputFileSync.mock.calls[1][0]).toBe(
    "./fixtures/generated/server.js"
  );
  // Check for existance of some routes
  expect(mockOutputFileSync.mock.calls[1][1]).toInclude("urlPrefix");
  expect(mockOutputFileSync.mock.calls[1][1]).toInclude("new Server");
});
