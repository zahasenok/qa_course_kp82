const fs = require("fs");
const crypto = require("crypto");

const { default: axios } = require("axios");

const filePath = "/clientdata/clientFile.txt";
const serverIp = process.argv[2];
const serverPort = process.argv[3];

function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || "md5")
    .update(str, "utf8")
    .digest(encoding || "hex");
}

axios(`http://${serverIp}:${serverPort}`)
  .then((res) => res.data)
  .then((data) => {
    const text = data.split(" ")[0];
    const receivedChecksum = data.split(" ")[1];
    console.log(`Received text: ${text}`);
    fs.writeFile(filePath, text, () => {
      console.log("file created on the client!");
      console.log(`Checksum on the client side: ${checksum(text)}`);
      if (checksum(text) === receivedChecksum) {
        console.log(`Checksum was verified!`);
      } else {
        throw new Error(`Wrong checksum!`);
      }
    });
  })
  .catch((err) => console.log(err.message));
