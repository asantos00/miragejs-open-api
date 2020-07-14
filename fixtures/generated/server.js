import { Server } from "miragejs";
const server = new Server({
  baseConfig() {
    this.urlPrefix = "http://petstore.swagger.io/api";
  }
});
