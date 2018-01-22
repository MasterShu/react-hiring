<p align="center">
    <a href="https://www.iviewui.com">
        <img width="200" src="https://i.loli.net/2018/01/22/5a6561d430240.png">
    </a>
</p>

# React Hiring
[![react](https://img.shields.io/badge/react-16.2.0-brightgreen.svg?style=flat-square)](https://github.com/facebook/react)
[![ant-design-mobile](https://img.shields.io/badge/Ant_Design_Mobile-v2.1.3-brightgreen.svg?style=flat-square)](https://github.com/ant-design/ant-design-mobile)
[![npm](https://img.shields.io/npm/l/express.svg)]()


## 当前版本：v1.0.0

`注：当前版本是本人学习和联系写的，所以会有 BUG 存在，请合理学习使用, 所用的图片类资源也是网络上找的, 涉及版权请提示删除。`

## Install
```bush
// install dependencies
npm install
```
## Run

### Development

```bush
yarn start
```
or
```bush
npm run start
```

### Production(Build)

```bush
yarn build
```

or

```bush
npm run build
```

## 简介
&emsp;&emsp;React Hiring是基于React.js，搭配使用 Ant Design Mobile UI组件库形成的一套招聘App集成解决方案，利用 socket.io 配合 express 可以即时信息聊天, 并且支持发送 emoji (这个需要在手机上使用, 电脑上emoji 支持较差)， 已配置服务端渲染， 可以客户端渲染， 也可服务端渲染， 做到首屏优化，由 MasterShu 个人开发维护。故商用请自行斟酌。

## 功能

- 登录/登出
- 即时通讯
  - 文字聊天
  - emoji 发送
- 消息中心
  - 聊天消息列表
- 大神列表
- BOSS列表
- 个人中心

## 文件结构
```shell
.
├── build  项目构建配置
├── config  项目构建配置目录 (不需要修改)
├── server  服务端源码
│   ├── model.js  模型类文件
│   ├── server.js 服务端代码
│   ├── user.js   服务端用户代码
└── src
    ├── config.js axios 全局 loading 
    ├── App.js  应用首页
    ├── index.js 首页
    ├── reducer.js  redux 统一管理
    ├── component
    │   ├── authroute  权限判断路由
    │   ├── avatar-selector  头像选择
    │   ├── boss  BOSS 页
    │   ├── chat  聊天页
    │   ├── dashboard  仪表页
    │   ├── form  高阶组件提供form方法
    │   ├── genius  大神页
    │   ├── img  头像列表资源
    │   ├── logo  登录主页页logo
    │   ├── msg  消息列表
    │   ├── navlink  底部标签
    │   ├── user  个人中心
    │   ├── usercard  个人信息卡片
    ├── container
    │   ├── bossinfo  boss 完善信息
    │   ├── geniusinfo  大神完善信息
    │   ├── login  登录
    │   ├── register  注册
    └── redux
        ├── chat.redux.js  聊天redux
        ├── chatuser.redux.js  用户列表redux
        └── user.redux.js  用户redux


```

## Links

- [MasterShu](http://blog.mastershu.club)
- [React](https://github.com/facebook/react)
- [Webpack](https://github.com/webpack/webpack)

### 💖💖 If you find this project helpful, maybe you can buy me a coffee. 💖💖
![image](https://i.loli.net/2018/01/22/5a6583d3a63bf.png)


## License
[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2018-present, MasterShu
