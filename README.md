# compressedFiles
使用node.js移除项目中单行注释、文件内代码压缩为一行(不改变原项目)
##### 一、运行
       pnpm i 或 npm install 
##### 二、修改执行文件index.js 注意事项：
     1、修改originDir(项目目录)自动复制项目进/source，
     2、ignoreFileList 忽略的文件夹目录，
     3、compressFileSuffix 需要压缩的文件后缀
     4、目前部分文件会导致删除注释时停止，暂没有找原因请编辑utis/index.js的 getFileContentHand()方法中的ignoreList过滤此文件

##### 三、运行
        node index.js

##### 四、注意
    项目逻辑为
    1、先移除项目中单行注释，
    2、prettier格式化文件（主要作用为方法、变量定义结尾添加；号）
    3、文件移除换行符（压缩一行）
    逻辑上与被压缩的代码类型无关（prettier主要作用是结尾添加;号防止压缩后代码无法运行），
    也可以自定义添加eslint强制校验、修复代码。

    
