#!/usr/bin/env bash

docker build -t registry.cn-hangzhou.aliyuncs.com/zhidianfan/mobile-web-ui:0.0.10-test .

docker login --username=371762770@qq.com --password=1234qwer registry.cn-hangzhou.aliyuncs.com

docker push registry.cn-hangzhou.aliyuncs.com/zhidianfan/mobile-web-ui:0.0.10-test
