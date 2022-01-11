class File {
  immutable;
  MAX_BUF_FILE_SIZE = 10000;
  name;
  text;

  constructor(name, text, type) {
    this.name = name;
    this.text = text;
    this.type = type;

    if (type === "binary") {
      this.immutable = true;
    }
    if (type === "log") {
      this.immutable = false;
    }
    if (type === "buffer") {
      this.immutable = false;
      this.MAX_BUF_FILE_SIZE = 5;
    }
  }

  read() {
    if (this.type === "buffer") {
      console.log(`Can't read from buffer file!`);
      return;
    }
    console.log(this.text);
  }

  append(text) {
    if (this.type === "log") {
      this.text.concat(text);
    } else {
      console.log(`Can't append to not-log file!`);
      return;
    }
  }

  push(text) {
    if (this.type === "buffer") {
      if (this.text + text < this.MAX_BUF_FILE_SIZE) {
        text.concat(this.text);
      } else {
        console.log(`Limit reached!`);
      }
    } else {
      console.log(`Can't push to not-buffer file!`);
      return;
    }
  }

  consume() {
    if (this.type === "buffer") {
      return this.text.slice(-1);
    } else {
      console.log(`Can't append to not-buffer file!`);
      return;
    }
  }
}

module.exports = { File };
