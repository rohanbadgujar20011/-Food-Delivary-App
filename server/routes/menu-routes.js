const express = require("express");
const menurouter = express.Router();
const { addmenu, allmenu } = require("../controller/menu-controller");
menurouter.post("/", addmenu);
menurouter.get("/", allmenu);

module.exports = menurouter;
