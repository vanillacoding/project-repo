const express = require("express");
const loaders = require("./src/loader");

const app = express();

loaders({ app });

module.exports = app;
