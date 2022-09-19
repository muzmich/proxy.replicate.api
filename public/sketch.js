async function communicate() {
  const data = { incoming: "well helloooo" };
  console.log("Communicating sending ", data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const hello_response = await fetch("/hello", data);
  console.log("response to communitcation", options);
 //const db_json = await db_response.json();
  //console.log(db_json);
}
communicate();
//askForPicture() ;

//
async function askForPicture() {
  console.log("Asking ");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    //body: JSON.stringify(data),
  };
  const db_response = await fetch("/replicate_api/hey", options);
  const db_json = await db_response.json();
  console.log(db_json);
}

