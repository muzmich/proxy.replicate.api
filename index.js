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
  let data = {
    version: "a9758cbfbd5f3c2094457d996681af52552901775aa2d6dd0b17fd15df959bef",
    input: {
      prompt: request.body.prompt
    }
  };
 console.log(data.input.prompt, data.version);
  const api_key = process.env.REPLICATE_API_KEY;
 // console.log("token", api_key, data);
  const replicate_url = "https://api.replicate.com/v1/predictions";
  const options = {
    headers: { Authorization: `Token ${api_key}` },
    method: "POST",
    body: JSON.stringify(data)
  };
  

  const replicate_response = await fetch(replicate_url, options);
  const replicate_result = await replicate_response.json();
  console.log(replicate_result);
  response.json(replicate_result);

  // return result;
});
