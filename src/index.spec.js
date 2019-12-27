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

  expect(mockOutputFileSync).toHaveBeenCalledWith(
    "./dist/test-generated/routes.js",
  );
  expect(mockOutputFileSync).toHaveBeenCalledWith(
    "./dist/test-generated/server.js",
  );
});
