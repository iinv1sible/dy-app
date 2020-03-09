FROM registry.cn-hangzhou.aliyuncs.com/sherry/tomcat:8.5.15-jre8
ENV TZ=Asia/Shanghai
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo '$TZ' > /etc/timezone
ADD www /usr/local/tomcat/webapps/ROOT/yiding