## Koa2 + mongodb 微信小程序服务器
---
### 说明
使用Koa2 + mongodb编写的微信小程序后台服务器，用于开发微信小程序的后台交互。<br>
目前已完成根据小程序传回code，后台通过微信api获取openid的功能<br>

---
### 运行方式
>  安装nodejs和mongodb<br>

使用：将该repository克隆到本地目录，运行

```npm install```

在config/default.js中配置小程序的appid和appSecret并启动mongodb数据库，运行

```node app```
