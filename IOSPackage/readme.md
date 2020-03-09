# 打包步骤

1. 从苹果开发者中心下载到本地安装到钥匙串

3. 安装cordova 6.x版本

   ```bash
   npm i cordova@6.x -g
   ```
   
   
   
3. 创建cordova项目

   ```bash
   cordova create yiding com.ios.ysq.canzhuoyuding.v2 易订V2
   ```

   

4. 打开xcode的项目资源目录复制images下文件

   ![image-20190531105346965](./typora-user-images/image-20190531105346965.png)

   ![image-20190531105413229](./typora-user-images/image-20190531105413229.png)

5. 修改scheme为release

   ![image-20190531105652892](./typora-user-images/image-20190531105722585.png)

6. 模拟器选择Generic IOS Device类型

   ![image-20190531105814689](./typora-user-images/image-20190531105814689.png)

7. 选择签名配置文件

   ![image-20190531110143334](./typora-user-images/image-20190531110143334.png)

8. 归档打包

   ![image-20190531105854594](./typora-user-images/image-20190531105922997.png)

   ![image-20190531105934128](./typora-user-images/image-20190531105934128.png)

   ![image-20190531105944892](./typora-user-images/image-20190531105944892.png)
   ![image-20190531105959626](./typora-user-images/image-20190531105959626.png)

   


   ![image-20190531110015440](./typora-user-images/image-20190531110015440.png)

   ![image-20190531110030122](./typora-user-images/image-20190531110030122.png)

9. 登录开发者中心配置发布信息链接地址`https://appstoreconnect.apple.com/WebObjects/iTunesConnect.woa/ra/ng/app/1459607695`

   ![image-20190531110344300](./typora-user-images/image-20190531110344300.png)

10. 添加需要构建的之前上.-user-images/image-20190531110438678.png)

11. 构建版本添加完成存储提交审核.