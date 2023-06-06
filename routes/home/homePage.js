const fastifyPlugin = require("fastify-plugin");

const homeRoutes = async (fastify, opts, done) => {
  fastify.get("/", (req, reply) => {
    const data = {
      pageTitle: "Home Page",
      name: "bain",
    };
    reply.view("pages/index.ejs", data);
  });

  done();
};
module.exports = fastifyPlugin(homeRoutes);
