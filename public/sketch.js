var input_field = document.createElement("input");
input_field.type = "text";
input_field.id = "input_prompt";
input_field.value = "Gothic Fairy";
const container = document.getElementById("container");
container.appendChild(input_field);
input_field.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
       askForPicture(input_field.value) 
    }
});

async function askForPicture(prompt) {
  const data = { prompt: prompt, seed : 16658};
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
  document.getElementById("show_result").src = proxy_said.output[0];
  let logs = proxy_said.logs.split("\n");
  logs = logs[0].split(" ");
  let seed = logs[logs.length-1].trim();
  console.log("proxy relayed this about picture:", seed, proxy_said);
}

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
  askForPicture();
}
