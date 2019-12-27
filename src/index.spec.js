import MirageOpenAPIGenerator from "./index";

it("runs", () => {
  const mockYargs = {
    option: () => mockYargs
  };
  jest.mock("yargs", () => mockYargs);

  MirageOpenAPIGenerator.run();
});
