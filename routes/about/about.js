const fastifyPlugin = require("fastify-plugin");

const aboutRoutes = async (fastify, opts, done) => {
  fastify.get("/about", (req, reply) => {
    const data = {
      pageTitle: "About Us",
      name: "bain",
    };
    reply.view("pages/about.ejs", data);
  });

  done();
};
module.exports = fastifyPlugin(aboutRoutes);
