const express = require('express');
const Datastore = require('nedb');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Starting server at ${port}`);
});
app.use(express.static('public'));
app.use(express.json({ limit: '1mb' }));

const database = new Datastore('database.db');
database.loadDatabase();

app.post('/hello', (request, response) => {
  const data = request.body;
  data.message = "HELLOW BACK AT YOU";
  console.log(data.incoming);
  //database.insert(data);
  response.json(data);
});

app.get('/replicate_api/:prompt', async (request, response) => {

async function query(extra_data) {
   let data = {"version": "29565a19f1fb04c8d8e9864bc08a22ce0c982398165fa4cdc61d2f2c777a35a0", "input": {"prompt": "female cyborg assimilated by alien fungus, intricate Three-point lighting portrait, by Ching Yeh and Greg Rutkowski, detailed cyberpunk in the style of GitS 1995"}};
   console.log(prompt + " but hardwired for now");
  const response = await fetch(
     
    // 'https://api-inference.huggingface.co/models/EleutherAI/gpt-neo-125M',
    'https://api.replicate.com/v1/predictions',
    {
      headers: { Authorization: `Bearer ${process.env.REPLICATE_API_KEY}` },
      method: 'POST',
      body: JSON.stringify(data),
    }
  );
  const result = await response.json();
  return result;
}


app.post('/api', (request, response) => {
  const data = request.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  database.insert(data);
  response.json(data);
});

app.get('/weather/:latlon', async (request, response) => {
  console.log(request.params);
  const latlon = request.params.latlon.split(',');
  console.log(latlon);
  const lat = latlon[0];
  const lon = latlon[1];
  console.log(lat, lon);
  const api_key = process.env.API_KEY;
  const weather_url = `https://api.darksky.net/forecast/${api_key}/${lat},${lon}/?units=si`;
  const weather_response = await fetch(weather_url);
  const weather_data = await weather_response.json();

  const aq_url = `https://api.openaq.org/v1/latest?coordinates=${lat},${lon}`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();

  const data = {
    weather: weather_data,
    air_quality: aq_data
  };
  response.json(data);
});
