const fs = require("fs");
const crypto = require("crypto");

const express = require("express");
const app = express();

const port = process.argv[2] || 8080;
const folderName = "serverdata";
const fileName = "serverFile.txt";
const filePath = `${__dirname}/${folderName}/${fileName}`;

const string = (Math.random() + 1).toString(36).slice(2);
console.log(`Generated string: ${string}`);

function checksum(str, algorithm, encoding) {
  return crypto
    .createHash(algorithm || "md5")
    .update(str, "utf8")
    .digest(encoding || "hex");
}

console.log(`Checksum on the server side: ${checksum(string)}`);

app.get("/", (req, res) => {
  if (!fs.existsSync(`./${folderName}`)) {
    fs.mkdirSync(`./${folderName}`);
  }
  fs.writeFile(filePath, `${string} ${checksum(string)}`, () => {
    console.log("file created on the server");
    res.download(filePath);
  });
});

app.listen(port, () => {
  console.log(`Server is listening at ${port}`);
});
