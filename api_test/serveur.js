// server.js
const app = require("./app");
const port = 3000;

app.listen(port, () => {
  console.log(`Serveur écoutant sur le port ${port}`);
});
