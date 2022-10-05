const express = require("express");
const loaders = require("./src/loaders");

const app = express();

loaders({ app });

module.exports = app;
