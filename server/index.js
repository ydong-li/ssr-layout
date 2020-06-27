// import proxy from 'express-http-proxy'
import React from 'react'
import { renderToString } from "react-dom/server";
import Layout from '../src/layout'
const express = require('express')
var bodyParser = require('body-parser')
const rp = require('request-promise-native')


const app = express()
app.use(bodyParser.json());

app.use(express.static('build'))

app.get('/content', async (req, res) => {
  const data = await rp('http://localhost:3777/content')
  res.send(renderToString(<Layout>{<div dangerouslySetInnerHTML={{ __html: data }}></div>}</Layout>))
})

app.listen(3888)