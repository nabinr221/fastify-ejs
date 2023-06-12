const Joi = require("joi");

const typeString = { type: "string" };
const typeInt = { type: "number" };

/**
 * RegEx for possword validation
 * 1 upercase 1special charector 1 lowercase 1 number at least 6 charector max 16 charactor
 *  */
const passRegExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{6,16}$/;

/**
 * signup schema
 * */
// const signupSchema = {
//   body: Joi.object({
//     name: Joi.string().min(3),
//     username: Joi.string().alphanum().min(3).max(30).required(),
//     password: Joi.string().pattern(new RegExp(passRegExp)),
//   }),
//   response: {
//     200: {
//       msg: typeString,
//     }, // sending a simple message as string
//   },
// };
const signupSchema = {
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
 * login schema
 * */
const loginSchema = {
  body: {
    type: "object",
    required: ["username", "password"],
    properties: {
      username: typeString,
      password: typeString,
    },
  },
  response: {
    200: {
      msg: typeString,
    }, // sending a simple message as string
  },
};
module.exports = { signupSchema, loginSchema };
