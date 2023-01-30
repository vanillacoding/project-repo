require("dotenv").config();

const express = require("express");
const initAsyncApp = require("./src/loaders/initAsyncApp");
const loadHttpServer = require("./src/loaders/server");

loadHttpServer(initAsyncApp(express()));
