const { readDirectory, getFileContentHand, removeLrHand } = require('./utils');
const shell = require('shelljs');
var fs = require('fs-extra');
let path = require('path');
let originDir = 'E:/dhDevelep/FRONT';
let desDir = './source/';
// 忽略文件、文件夹
let ignoreFileList = ['node_modules', '.git', '.VSCodeCounter', 'vpp-sys'];
// 压缩的文件后缀
let compressFileSuffix = ['json', 'vue', 'ts', 'js', 'html', 'yml', 'css', 'scss'];
let filter = {
  // dereference: true,
  filter(src, dest) {
    let stat = fs.lstatSync(src);
    let isDirectory = stat.isDirectory();
    let dir = path.dirname(src);
    let dirLsit = dir.split('\\');
    if (!isDirectory) {
      dirLsit = [path.basename(src), ...dirLsit];
    } else {
      dirLsit = src.split('\\');
    }
    return dirLsit.every(item => {
      return ignoreFileList.every(name => {
        return name != item;
      });
    });
  }
};
// 复制目标目录
const copyDir = async () => {
  return new Promise(resolve => {
    fs.emptyDirSync(desDir);
    let stat = fs.lstatSync(originDir);
    let isDirectory = stat.isDirectory();
    if (isDirectory) {
      desDir = path.resolve(desDir, path.basename(originDir));
      fs.ensureDirSync(desDir);
    }
    fs.copy(originDir, desDir, filter, function (err) {
      if (err) return console.error(err);
      console.log('文件拷贝完成!');
      resolve({ code: 200 });
    });
  });
};

// 递归获取文件
const getAllFileListHand = async () => {
  let list = [];
  readDirectory(path.resolve(__dirname, desDir), list);
  list = list.filter(item => {
    let suffix = path.extname(item);
    suffix = suffix.replace('.', '');
    suffix = suffix.toLowerCase();
    return compressFileSuffix.includes(suffix);
  });
  console.log('总文件', list.length);
  console.log('开始去除注释');
  removeFileCommentHand(list);
  console.log('去除注释完成');
  // 开始格式化文件
  await prettierHand();
  console.log('开始去除换行符');
  removeLrHand(list);
  console.log('压缩结束');
};
/**
 * 格式化文件
 */
const prettierHand = () => {
  return new Promise(resolve => {
    console.log('开始格式化文件');
    shell.exec('npm run prettier', (code, std, err) => {
      console.log(err);
      if (code || code !== undefined) {
        console.log('文件格式化完成');
        resolve();
      }
    });
  });
};
/**
 * 去除注释
 */
const removeFileCommentHand = (list = []) => {
  list.forEach((item,index) => {
    console.log(item)
    // 去除注释
    getFileContentHand(item);
  });
  // 去除注释
};
const init = async () => {
  let { code } = await copyDir();
  if (code != 200) return;
  getAllFileListHand();
};
init();
// getAllFileListHand()
