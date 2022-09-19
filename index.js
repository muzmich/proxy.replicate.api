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
  const data = request.params;

  console.log("got something ", data);
  //database.insert(data);
  data.message = "HELLOW BACK AT YOU";
  data.justforshow = "wow";
  response.json(data);
});

app.get("/query/:propmpt", async (request, response) => {
  console.log(request.params);
  let data = {
    version: "29565a19f1fb04c8d8e9864bc08a22ce0c982398165fa4cdc61d2f2c777a35a0",
    input: {
      prompt:
        "female cyborg assimilated by alien fungus, intricate Three-point lighting portrait, by Ching Yeh and Greg Rutkowski, detailed cyberpunk in the style of GitS 1995",
    },
  };

  console.log(request.params.prompt + " but hardwired for now");
  const api_key = process.env.API_KEY;
  const replicate_url = `'https://api.replicate.com/v1/predictions',`;
  const replicate_response = await fetch(
    // 'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M',
    replicate_url,
    {
      headers: { Authorization: `Bearer ${api_key}` },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();

  return result;
  
});
