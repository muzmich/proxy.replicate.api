async function communicate() {
  const data = { incoming: "well helloooo" };
  console.log("Communicating ", data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const db_response = await fetch("/hello", options);
  const db_json = await db_response.json();
  console.log(db_json);
}
communicate();


async function askForPicture() {
  const data = '{"version": "29565a19f1fb04c8d8e9864bc08a22ce0c982398165fa4cdc61d2f2c777a35a0", "input": {"prompt": "female cyborg assimilated by alien fungus, intricate Three-point lighting portrait, by Ching Yeh and Greg Rutkowski, detailed cyberpunk in the style of GitS 1995"}}' ;
;
  console.log("Asking... ", data);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const db_response = await fetch("/hello", options);
  const db_json = await db_response.json();
  console.log(db_json);
}

-d '{"version": "29565a19f1fb04c8d8e9864bc08a22ce0c982398165fa4cdc61d2f2c777a35a0", "input": {"prompt": "female cyborg assimilated by alien fungus, intricate Three-point lighting portrait, by Ching Yeh and Greg Rutkowski, detailed cyberpunk in the style of GitS 1995"}}' \
  -H "Authorization: Token $REPLICATE_API_TOKEN" \
  -H 'Content-Type: application/json' \
  https://api.replicate.com/v1/predictions