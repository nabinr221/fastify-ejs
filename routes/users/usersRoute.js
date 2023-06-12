const fastifyPlugin = require("fastify-plugin");
// const fileUpload = require("fastify-file-upload");
const {
  getUsersSchema,
  getUserDetailsSchema,
  addUserSchema,
  updateUserSchema,
  deleteUserSchema,
} = require("../../controllers/schemas/usersSchema");
const {
  getUsersHandler,
  getUserDetailsHandler,
  addUserHandler,
  updateUserHandler,
  deleteUserHandler,
} = require("../../controllers/handlers/usersHandler");

const getUserDetailsOpts = {
  schema: getUserDetailsSchema,
  handler: getUserDetailsHandler,
};

// const addUserOpts = {
//   schema: addUserSchema,
//   handler: addUserHandler,
// };

const updateUserOpts = {
  schema: updateUserSchema, // will be created in schemas/user.js
  handler: updateUserHandler, // will be created in handlers/user.js
};

const deleteUserOpts = {
  schema: deleteUserSchema, // will be created in schemas/user.js
  handler: deleteUserHandler, // will be created in handlers/user.js
};

const getUsersOpts = {
  schema: getUsersSchema,
  handler: getUsersHandler,
};

const usersRoutes = async (fastify, opts, done) => {
  await fastify.get("/users", getUsersOpts);
  await fastify.post("/users/edit/:id", updateUserOpts);
  await fastify.get("/users/:id", getUserDetailsOpts);
  await fastify.delete("/users/:id", deleteUserOpts);
  done();
};
module.exports = fastifyPlugin(usersRoutes);
