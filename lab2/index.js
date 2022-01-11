const { FS } = require("./fs");

const fs = new FS();

fs.createDir("hello/new/olmo/jj");

console.assert(fs.isRoot === true);
console.assert(fs.findDir("hello").isRoot === false);
console.assert(fs.findDir("hello").subDirectories[0].name === "new");
console.assert(fs.findDir("hello").DIR_MAX_ELEMS === 3);
console.assert(
  fs.findDir("hello").findDir("new").subDirectories[0].name === "olmo"
);

fs.findDir("hello").findDir("new").createFile("by olmo", "txt1", "buffer");

console.assert(
  fs.findDir("hello").findDir("new").findFile("by olmo").consume() === "1"
);
console.assert(
  !fs.findDir("hello").findDir("new").findFile("by olmo").push("jfsdhfsfn")
);
console.assert(
  fs.findDir("hello").findDir("new").findFile("by olmo").type === "buffer"
);
console.assert(
  fs.findDir("hello").findDir("new").findFile("by olmo").text === "txt1"
);

// fs.findDir("hello").findDir("new").open();
fs.findDir("hello").findDir("new").findFile("by olmo").read();
fs.findDir("hello").findDir("new").deleteFile("by olmo");

console.assert(fs.findDir("hello").findDir("new").files.length === 0);

// fs.findDir("hello").findDir("new").open();

fs.findDir("hello")
  .findDir("new")
  .findDir("olmo")
  .moveSubDir("jj", fs.findDir("hello").findDir("new"));

console.assert(
  !!fs
    .findDir("hello")
    .findDir("new")
    .subDirectories.find((s) => s.name === "jj")
);

fs.findDir("hello").findDir("new").deleteSubDir("olmo");

console.assert(fs.findDir("hello").findDir("new").subDirectories.length === 1);
console.assert(
  fs.findDir("hello").findDir("new").subDirectories[0].name === "jj"
);

// fs.findDir("hello").findDir("new").open();
