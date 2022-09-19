const express = require("express");
const Datastore = require("nedb");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const database = new Datastore("database.db");
database.loadDatabase();

app.post("/hello", (request, response) => {
  const data = request.body;

  console.log("got something ", data);
  //database.insert(data);
  data.message = "HELLOW BACK AT YOU";
  data.justforshow = "wow";
  console.log("returning ", data);
  response.json(data);
});

app.post("/replicate_api", async (request, response) => {
  const api_key = process.env.REPLICATE_API_KEY;
  const model_url =
    "https://api.replicate.com/v1/models/stability-ai/stable-diffusion";
  //  GET                 https://api.replicate.com/v1/models/{model_owner}/{model_name}
  let modelVersionOptions = {
    headers: { Authorization: `Token ${api_key}` },
    method: "GET",
  };
  const models_response = await fetch(model_url, modelVersionOptions);
  const models_result = await models_response.json();
  let version = models_result.latest_version.id;
  console.log("models response", version);
  let data = {
    version: version,
    input: {
      prompt: request.body.prompt,
    },
  };
  console.log(data.input.prompt, data.version);

  // console.log("token", api_key, data);
  const replicate_url = "https://api.replicate.com/v1/predictions";
  const options = {
    headers: { Authorization: `Token ${api_key}` },
    method: "POST",
    body: JSON.stringify(data),
  };

  const replicate_response = await fetch(replicate_url, options);
  const replicate_result = await replicate_response.json();
  console.log(replicate_result);
  response.json(replicate_result);
});
