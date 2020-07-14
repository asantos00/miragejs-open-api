const mockOutputFileSync = jest.fn();

jest.mock("fs-extra", () => ({
  outputFileSync: mockOutputFileSync
}));

export const getOutputFileText = async () => {
  const MirageOpenAPIGenerator = require("../src/index");

  await MirageOpenAPIGenerator.run({
    input: "./fixtures/example.yaml",
    output: "./fixtures/generated"
  });

  return mockOutputFileSync.mock.calls[0][1];
};
