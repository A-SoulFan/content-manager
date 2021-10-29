# 内容整理开发相关说明

yarn install 安装依赖
yarn serve 在本地服务器运行项目

## 目录解释
### 开发
主要开发基本上在**src/view**文件夹中进行，
下面几个文件夹分别对应

works:二创分享

promises：枝江诺言

live：直播归档

library：枝江文库

### 路由
本地开发查看页面，主要是直接访问路由，路由为 /#/content/名字，比如直播归档的路由就是/#/content/live
路由文件在**src/router**里

技术栈相关：vue3，和vue2的区别参考文档 
[vue2到vue3的迁移指南](https://v3.cn.vuejs.org/guide/migration/introduction.html#%E6%A6%82%E8%A7%88)



## 工作流
master分支被保护，开发在feature分支下进行，分支已经建好，对应上面提到的名称

开发到一个里程碑之后可以合并进dev分支，在确认和测试无误之后合进master
