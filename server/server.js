//  Entery File
// .env config
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });


// Importing Database connection module
require("./Database/connection");

// Imporing server form app.js
const server = require("./Websockets/wss");


// Server is listening
const port = process.env.PORT
server.listen(port || 5000, () => {
  console.log(
    `Server is listening at port ${port}`
  );
});