const fs = require("fs");
const path = require("path");
const _ = require("lodash");

function renameToSnakeCase(name) {
  return _.snakeCase(name).replace(/_/g, "-");
}

function renameFilesInDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      // 首先递归重命名子目录中的文件和目录
      renameFilesInDir(filePath);

      // 然后重命名当前目录
      const newDirName = renameToSnakeCase(file);
      if (file !== newDirName) {
        const newDirPath = path.join(dir, newDirName);
        fs.renameSync(filePath, newDirPath);
        console.log(`Renamed directory: ${filePath} -> ${newDirPath}`);
      }
    } else {
      // 对文件进行重命名
      const extname = file.endsWith(".stories.tsx")
        ? ".stories.tsx"
        : path.extname(file);

      const newFileName = `${renameToSnakeCase(
        path.basename(file, extname),
      )}${extname}`;
      if (file !== newFileName) {
        const newFilePath = path.join(dir, newFileName);
        fs.renameSync(filePath, newFilePath);
        console.log(`Renamed file: ${filePath} -> ${newFilePath}`);
      }
    }
  });
}

// 开始扫描 src 目录
renameFilesInDir("src");
