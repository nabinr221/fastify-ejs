"use strict";

const fp = require("fastify-plugin");
const path = require("path");
// the use of fastify-plugin is required to be able
// to export the decorators to the outer scope

module.exports = fp(async function (fastify, opts) {
  fastify.register(require("@fastify/view"), {
    engine: {
      ejs: require("ejs"),
    },
    root: path.join(__dirname, "../templates"),
    layout: "pages/layout.ejs",
    includeViewExtension: true,
  });
});
