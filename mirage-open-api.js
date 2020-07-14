const faker = require("faker");

// This file has to exist on user's repo or be sent to the CLI
const propertyNameInferenceMap = {
  name: () => faker.name.findName(),
  email: () => faker.internet.email()
};

export default propertyNameInferenceMap;
