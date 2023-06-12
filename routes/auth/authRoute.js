const fastifyPlugin = require("fastify-plugin");
const {
  singupHandler,
  loginHandler,
} = require("../../controllers/handlers/authHandler");
const {
  signupSchema,
  loginSchema,
} = require("../../controllers/schemas/authSchema");
// const multer = require("fastify-multer");

const authRoutes = async (fastify, opts, done) => {
  const signupOpts = {
    schema: signupSchema,
    handler: singupHandler,
  };
  const userLoginOpts = {
    schema: loginSchema,
    handler: loginHandler,
  };
  // const upload = multer({ dest: "../../public/image" });
  // const fileUpload = {
  //   preHandler: upload.single("avatar"),
  // };

  /**
   * user resister route for register page view
   */
  await fastify.get("/signup", (req, reply) => {
    const data = {
      pageTitle: "Signup ",
    };
    reply.view("pages/signup.ejs", data);
  });

  /**
   * user login route for login page view
   */
  await fastify.get("/login", (req, reply) => {
    const data = {
      pageTitle: "Login ",
    };
    reply.view("pages/login.ejs", data);
  });

  await fastify.post("/auth/register", signupOpts);
  await fastify.post("/auth/login", userLoginOpts);

  done();
};
module.exports = fastifyPlugin(authRoutes);
