const typeString = { type: "string" };
const typeInt = { type: "number" };

const user = {
  type: "object",
  properties: {
    id: typeInt,
    name: typeString,
    username: typeString,
    password: typeString,
    gender: typeString,
    address: typeString,
    contact_number: typeInt,
    profile: { type: "object" },
  },
};

/**
 *  schema for add users
 */
const addUserSchema = {
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      id: typeInt,
      name: typeString,
      username: typeString,
      password: typeString,
      gender: typeString,
      address: typeString,
      contact_number: typeInt,
    },
  },
  response: {
    200: {
      msg: typeString,
    }, // sending a simple message as string
  },
};

/**
 *  schema for fetch all users
 */
const getUsersSchema = {
  schema: {
    response: {
      200: {
        type: "array",
        items: user,
      },
    },
  },
};

/**
 *  schema for users detail
 */
const getUserDetailsSchema = {
  params: {
    id: { type: "number" },
  },

  response: {
    200: user,
  },
};
const updateUserSchema = {
  body: {
    type: "object",
  },
  params: {
    id: { type: "number" }, // converts the id param to number
  },
  response: {
    200: {
      message: typeString,
    },
  },
};

/**
 * schema for users deletaion
 */
const deleteUserSchema = {
  params: {
    id: { type: "number" }, // converts the id param to number
  },
  response: {
    200: {
      msg: typeString,
    },
  },
};
module.exports = {
  getUsersSchema,
  getUserDetailsSchema,
  addUserSchema,
  updateUserSchema,
  deleteUserSchema,
};
