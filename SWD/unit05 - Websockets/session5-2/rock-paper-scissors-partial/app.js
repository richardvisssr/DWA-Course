const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server: WebSocketServer } = require("ws");

const app = express();
const http = createServer(app);
const wss = new WebSocketServer({ server: http });

app.use(express.static(path.join(__dirname, "client-side")));

function playGame(myChoice, opponentChoice) {
  const rules = {
    rock: { scissors: true, paper: false },
    scissors: { rock: false, paper: true },
    paper: { rock: true, scissors: false },
  };

  if (myChoice !== opponentChoice) {
    return rules[myChoice][opponentChoice] ? myChoice : opponentChoice;
  }
  return undefined;
}

const messages = {
  choiceAccepted: () => ({ messageType: "CHOICE ACCEPTED" }),
  choiceNotAccepted: (reason) => ({
    messageType: "CHOICE NOT ACCEPTED",
    reason,
  }),
  opponentChoice: (opponentName) => ({
    messageType: "OPPONENT CHOICE",
    opponentName,
  }),
  win: (opponentName, opponentScore, ownScore) => ({
    messageType: "WIN",
    opponentName,
    opponentScore,
    ownScore,
  }),
  lose: (opponentName, opponentScore, ownScore) => ({
    messageType: "LOSE",
    opponentName,
    opponentScore,
    ownScore,
  }),
  tie: () => ({ messageType: "TIE" }),
  opponentLeft: (opponentName) => ({
    messageType: "OPPONENT LEFT",
    opponentName,
  }),
};

function declareWinner(wsWinner, wsLoser) {
  const winner = wsWinner.state;
  const loser = wsLoser.state;

  winner.score++;
  wsWinner.sendJSON(messages.win(loser.userName, loser.score, winner.score));
  wsLoser.sendJSON(messages.lose(winner.userName, winner.score, loser.score));
}

function declareTie(wss) {
  wss.broadcast(messages.tie());
}

wss.broadcast = (data) => {
  for (const client of wss.clients) {
    client.sendJSON(data);
  }
};

wss.on("connection", (ws) => {
  ws.sendJSON = (data) => {
    ws.send(JSON.stringify(data));
  };

  ws.state = {
    score: 0,
    choice: undefined,
    userName: undefined,
  };

  ws.on("message", (data) => {
    const parsedData = JSON.parse(data);

    if (parsedData.messageType === "CHOICE ACCEPTED") {
      return ws.sendJSON(
        messages.choiceNotAccepted("You already made a choice")
      );
    }

    ws.state.choice = parsedData.choice;
    ws.state.userName = parsedData.userName;

    ws.sendJSON(messages.choiceAccepted());

    if (wss.clients.size >= 2) {
      for (const client of wss.clients) {
        if (client !== ws) {
          client.sendJSON(messages.opponentChoice(ws.state.userName));
        }
      }
    }

    const opponent = [...wss.clients].find(
      (client) => client !== ws && client.state.choice !== undefined
    );

    if (opponent) {
      const winner = playGame(ws.state.choice, opponent.state.choice);
      if (winner === undefined) {
        declareTie(wss);
      } else {
        const wsWinner = winner === ws.state.choice ? ws : opponent;
        const wsLoser = winner === ws.state.choice ? opponent : ws;
        declareWinner(wsWinner, wsLoser);
      }

      for (const client of wss.clients) {
        client.state.choice = undefined;
      }
    }
  });

  ws.on("close", () => {
    console.log("[ws] close");
    if (ws.state.userName !== undefined) {
      wss.broadcast(messages.opponentLeft(ws.state.userName));
    }
  });
});

http.listen(3000, () => {
  console.log("The Server is listening on port 3000.");
});
