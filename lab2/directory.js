const { File } = require("./file");

class Directory {
  DIR_MAX_ELEMS = 3;
  name;
  isRoot = false;

  files = [];
  subDirectories = [];

  constructor(name) {
    this.name = name;
  }

  checkLimits() {
    if (this.subDirectories.length + this.files.length > this.DIR_MAX_ELEMS) {
      return console.log(
        `Can't create subDir ${subDirName} - limit was reached`
      );
    }
  }

  createFile(fileName, text, fileType) {
    this.checkLimits();

    const newFile = new File(fileName, text, fileType);
    this.files.push(newFile);
    return newFile;
  }

  createSubDir(subDirName) {
    this.checkLimits();

    const newSubDir = new Directory(subDirName);
    this.subDirectories.push(newSubDir);
    return newSubDir;
  }

  deleteFile(filename) {
    const rmIndex = this.files.findIndex((file) => file.name === filename);
    this.files.splice(rmIndex, 1);
    console.log(`File '${filename}' was deleted!`);
  }

  deleteSubDir(dirname) {
    const rmIndex = this.subDirectories.findIndex(
      (dir) => dir.name === dirname
    );
    this.subDirectories.splice(rmIndex, 1);
    console.log(`'${dirname}' was deleted!`);
  }

  moveFile(filename, location) {
    const rmIndex = this.files.findIndex((dir) => dir.name === dirname);
    const file = this.files[rmIndex];
    this.files.splice(rmIndex, 1);

    location.files.push(file);
    console.log(`File '${filename}' was moved to the '${location.name}'!`);
  }

  moveSubDir(dirname, location) {
    const rmIndex = this.subDirectories.findIndex(
      (dir) => dir.name === dirname
    );
    const subDir = this.subDirectories[rmIndex];
    this.subDirectories.splice(rmIndex, 1);

    location.subDirectories.push(subDir);
    console.log(`'${dirname}' was moved to the '${location.name}'!`);
  }

  findFile(filename) {
    const found = this.files.find((file) => file.name === filename);
    if (!found.name) {
      console.log(`Can't find ${filename}`);
    }
    return found;
  }

  findDir(dirname) {
    const found = this.subDirectories.find((dir) => dir.name === dirname);
    if (!found.name) {
      console.log(`Can't find ${dirname}`);
    }
    return found;
  }

  open() {
    console.log(`Inside the ${this.name} folder:`);
    console.log(`--Files:`);
    console.log(this.files);
    console.log(`--SubDirectories:`);
    console.log(this.subDirectories);
  }
}

module.exports = { Directory };
