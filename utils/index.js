var fs = require('fs-extra');
let path = require('path');
/**
 * 删除注释 // | /**
 * @param {*} content
 * @returns
 */
const delCommnetHand = content => {
  var reg = /("([^\\\"]*(\\.)?)*")|('([^\\\']*(\\.)?)*')|(\/{2,}.*?(\r|\n))|(\/\*(\n|.)*?\*\/)/g; // 正则表达式
  let noCommentContent = content.replace(reg, function (word) {
    // 去除注释后的文本
    return /^\/{2,}/.test(word) || /^\/\*/.test(word) ? '' : word;
  });
  return noCommentContent;
};

/**
 * 递归遍历目录文件
 * @param {*} pathName
 * @param {*} list
 */
const readDirectory = (pathName, list = []) => {
  let files = fs.readdirSync(pathName);
  files?.forEach(item => {
    let filePath = path.join(pathName, item);
    let fileState = fs.statSync(filePath);
    if (fileState.isDirectory()) {
      readDirectory(filePath, list);
    } else {
      list.push(filePath);
    }
  });
};

/**
 * 文件去除注释
 * @param {*} filePath
 */
let ignoreList = ['validate.js']; // 问题文件列表
const getFileContentHand = filePath => {
  if (ignoreList.includes(path.basename(filePath))) {
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');
  // 去除注释的内容
  let noCommentContent = delCommnetHand(content);
  let error = fs.writeFileSync(filePath, noCommentContent);
  if (error) {
    console.log('文件删除注释处理错误', filePath);
  } else {
    // console.log('去除注释完成:', filePath);
  }
};

/**
 * 删除换行符
 * @param {} filePath
 */
const removeLrHand = filePathList => {
  const regex = /[\r\n]+/gi;
  filePathList.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    // 去除注释的内容
    let noCommentContent = content.replace(regex, '');
    let error = fs.writeFileSync(filePath, noCommentContent);
    if (error) {
      console.log('文件删除换行符处理错误', filePath);
    }
  });
};

module.exports = {
  delCommnetHand,
  readDirectory,
  getFileContentHand,
  removeLrHand
};
