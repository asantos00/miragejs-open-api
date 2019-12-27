it("runs", async () => {
  const mockOutputFileSync = jest.fn();
  jest.mock("fs-extra", () => ({
    outputFileSync: mockOutputFileSync,
  }));

  const MirageOpenAPIGenerator = require("./index");

  await MirageOpenAPIGenerator.run({
    input: "./example.yaml",
    output: "./dist/test-generated",
  });

  expect(mockOutputFileSync.mock.calls[0][0]).toBe(
    "./dist/test-generated/routes.js",
  );
  expect(mockOutputFileSync.mock.calls[1][0]).toBe(
    "./dist/test-generated/server.js",
  );
});
