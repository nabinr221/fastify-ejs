"use strict";

const path = require("path");
const AutoLoad = require("@fastify/autoload");

// Pass --options via CLI arguments in command to enable these options.
module.exports.options = {};

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  fastify.register(require("@fastify/view"), {
    engine: {
      ejs: require("ejs"),
    },
    templates: "templates",
  });

  fastify.register(require("@fastify/static"), {
    root: path.join(__dirname, "public"),
  });

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "plugins"),
    options: Object.assign({}, opts),
  });

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, "routes"),
    options: Object.assign({}, opts),
  });
};
