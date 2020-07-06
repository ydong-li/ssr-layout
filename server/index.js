// import proxy from 'express-http-proxy'
import React from "react";
import { renderToString } from "react-dom/server";
import MLayout from "../src/layout";
import getXWebContent from "./menu";
import { nextTick } from "process";
const express = require("express");
var bodyParser = require("body-parser");
const rp = require("request-promise-native");
const path = require("path");
const fs = require("fs");

const template = fs.readFileSync(
  path.resolve(__dirname, "../build/index.html"),
  "utf8"
);

const app = express();
app.use(bodyParser.json());

app.use(express.static("build"));

app.use(async (req, res, next) => {
  if (/text\/html/.test(req.headers.accept)) {
    const url = getXWebContent(req.path);
    if (url) {
      const data = await rp(`${url}/xWebContent?path=${req.path}`);
      const mainContent = renderToString(
        <MLayout>
          {<div id="x-web" dangerouslySetInnerHTML={{ __html: data }}></div>}
        </MLayout>
      );
      res.end(
        template.replace(
          /<div id="root"><\/div>/,
          `<div id="root">${mainContent}</div>`
        )
      );
    } else {
      res.end(template);
    }
  }
});

app.listen(3888);
