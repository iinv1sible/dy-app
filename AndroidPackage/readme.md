# 打包步骤

1. 安装cordova

  npm i cordova -g
  
2. 新建cordova项目

  cordova create yiding com.android.ysq.canzhuoyuding

3. 安装config.xml 中cordova-plugin-* 插件

  cordova plugin add ...

  微信分享插件需要配置好 wechatid: wx0df6bf52e75a7d59

4. 添加安卓平台 cordova platform add android

5. 生成未签名release.apk cordova build --release android

6. 签名apk,

  签名文件yiding.keystore，签名密码1235813 
  jarsigner -verbose -keystore yiding.keystore -signedjar yiding.apk  app-armv7-release-unsigned.apk  yiding