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
const api_key = process.env.REPLICATE_API_KEY;
var version = null;


async function getModel() {
  const model_url =
    "https://api.replicate.com/v1/models/stability-ai/stable-diffusion";
  let modelVersionOptions = {
    headers: { Authorization: `Token ${api_key}` },
    method: "GET",
  };
  const models_response = await fetch(model_url, modelVersionOptions);
  const models_result = await models_response.json();
  version = models_result.latest_version.id;
  console.log("models response", version);
}


//REPLICATE FOR IMAGE BASED ON PROMPT
app.post("/replicate_api", async (request, response) => {
  getModel();  //could be outside of this call
  //START PREDICTION
  let data = {
    version: version,
    input: {
      prompt: request.body.prompt,
    },
  };
  const replicate_url = "https://api.replicate.com/v1/predictions";
  const options = {
    headers: {
      Authorization: `Token ${api_key}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify(data),
  };

  const replicate_response = await fetch(replicate_url, options);
  const replicate_result = await replicate_response.json();
  const prediction_id = replicate_result.id;

  //USE PREDICTION ID TO GET THE URL OF THE PICTURE
  const get_prediction_url =
    "https://api.replicate.com/v1/predictions/" + prediction_id;
  const header = {
    Authorization: `Token ${api_key}`,
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  //console.log(get_prediction_url, { headers: header });

  let get_prediction_response = null;
  let predictionStatus = null;
  let get_prediction_result = null;
  do {
    get_prediction_response = await fetch(get_prediction_url, {
      headers: header,
    });
    get_prediction_result = await get_prediction_response.json();
    predictionStatus = get_prediction_result.status;
    await sleep(500);
  } while (["starting", "processing"].includes(predictionStatus));
  console.log(get_prediction_result);
  response.json(get_prediction_result);
});

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.post("/hello", (request, response) => {
  const data = request.body;

  console.log("got something ", data);
  //database.insert(data);
  data.message = "HELLOW BACK AT YOU";
  data.justforshow = "wow";
  console.log("returning ", data);
  response.json(data);
});
