const { Directory } = require("./directory");

class FS {
  directories = [];
  files = [];
  isRoot = true;

  createDir(dirname) {
    const subdirsNames = dirname.split("/");
    let dirPointer = this;
    for (const subdirName of subdirsNames) {
      if (dirPointer.isRoot) {
        const foundDirectory = this.directories.find(
          (dir) => dir.name === subdirName
        );
        if (foundDirectory) {
          dirPointer = foundDirectory;
        } else {
          const newDir = new Directory(subdirName);
          this.directories.push(newDir);
          dirPointer = newDir;
        }
      } else {
        const foundSubDirectory = dirPointer.subDirectories.find(
          (dir) => dir.name === subdirName
        );
        if (!foundSubDirectory) {
          const newSubDir = dirPointer.createSubDir(subdirName);
          dirPointer = newSubDir;
        }
      }
    }
    return dirPointer;
  }

  findDir(dirname) {
    const found = this.directories.find((dir) => dir.name === dirname);
    if (!found) {
      console.log(`Can't find ${dirname}`);
    }
    return found;
  }

  deleteDir(dirname) {
    const rmIndex = this.directories.findIndex((dir) => dir.name === dirname);
    this.directories.splice(rmIndex, 1);
  }
}

module.exports = { FS };
