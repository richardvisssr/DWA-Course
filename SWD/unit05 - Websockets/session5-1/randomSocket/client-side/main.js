// alert(
//   "main.js is running, but does not do anything yet.\n" +
//     "Use main.js to write the code that connects to the server using WebSocket"
// );
const messageForm = document.getElementById("messageForm");
const messageList = document.getElementById("messageList");
const webSocket = new WebSocket("ws://localhost:3000/random", [
  "protocolOne",
  "protocolTwo",
]);

function sendData() {
  var dataObject = {
    userName: document.getElementById("userNameField").value,
    maxValue: parseInt(document.getElementById("maxValueField").value),
  };

  //TODO Send the data to the server using the websocket
  webSocket.send(JSON.stringify(dataObject));

  console.log("SENT DATA:", jsonStr);
}

webSocket.onopen = function (arg) {
  const listItem = document.createElement("li");
  listItem.textContent = "WebSocket connection opened";
  messageList.appendChild(listItem);
};

webSocket.onclose = function (arg) {
  //TODO Complete this event handler
  webSocket.send("connection is closed!")
};

webSocket.onmessage = function (arg) {
  //TODO Complete this event handler
  var data = JSON.parse(arg.data);
  addMessageItem(data.userName + " : " + data.randomValue);
};

webSocket.onerror = function (arg) {
  //TODO Complete this event handler
  const listItem = document.createElement("li");
  listItem.textContent = "WebSocket connection was closed";
  messageList.appendChild(listItem);

};

/**
 * Function for adding text to the messageList element on the page
 * @param {String} text: the text to add to the messageList
 */
function addMessageItem(text) {
  var el = document.createElement("li");
  el.innerHTML = text;
  document.getElementById("messageList").appendChild(el);
}

/**
 * Function for handling form submissions
 */
document
  .getElementById("messageForm")
  .addEventListener("submit", function (eventInfo) {
    eventInfo.preventDefault();
    console.log("SUBMIT FORM");
    sendData();
  });
