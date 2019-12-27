function getProcessArguments() {
  const argv = require("yargs")
    .option("o", {
      alias: "output",
      describe: "Output file path with miragejs generated code.",
      type: "string",
      nargs: 1,
      default: "./miragejs.js"
    })
    .option("i", {
      alias: "input",
      describe: "Input file path/url with open api specification.",
      type: "string",
      nargs: 1,
      demand: "An input path/url is required"
    }).argv;
  return argv;
}

module.exports = {
  getProcessArguments
};
