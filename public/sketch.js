async function communicate() {
  const data = { incoming: "Hello" };
  console.log("Communicating sending ", data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const hello_response = await fetch("/hello/", options);
  const proxy_said = await hello_response.json();
  console.log("proxy relayed this", proxy_said);
  askForPicture() ;
 //const db_json = await db_response.json();
  //console.log(db_json);
}
//communicate();
askForPicture() ;

//

async function askForPicture() {
  const data = { prompt: "Tall Frog" };
  console.log("Asking for Picture ", data);
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const picture_response = await fetch("/replicate_api/", options);
  const proxy_said = await picture_response.json();
  console.log("proxy relayed this about picture", proxy_said);
 //const db_json = await db_response.json();
  //console.log(db_json);
}
/*
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
*/
