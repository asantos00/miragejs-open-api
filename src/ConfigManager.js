const { getProcessArguments } = require("./utils/processArguments");

const ConfigManager = (function() {
  let instance;
  function create() {
    const { output, input } = getProcessArguments();
    return {
      output,
      input,
    };
  }

  if (!instance) {
    instance = create();
  }
  return instance;
})();

module.exports.ConfigManager = ConfigManager;
