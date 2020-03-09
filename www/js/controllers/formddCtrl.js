angular.module('starter.controllers.formddCtrl', []).controller('formddCtrl', function ($scope,  $hezuo, $showAlert, $state, $ionicHistory) {
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = false;
  })
  $scope.data = {};
  $scope.data.name = '';
  $scope.data.tel = '';
  $scope.data.company = '';
  $scope.data.job = '';
  $scope.data.storeNum = '';
  $scope.data.city = '';
  $scope.data.p = 0;
  $scope.data.c = '请选择';
  $scope.data.vip = 1
  $scope.pros = [{id: 0, label: '请选择'}, 
                  {id: 1, label: '北京'}, 
                  {id: 2, label: '上海'}, 
                  {id: 3, label: '天津'}, 
                  {id: 4, label: '重庆'}, 
                  {id: 5, label: '河北'}, 
                  {id: 6, label: '山西'}, 
                  {id: 7, label: '内蒙古'}, 
                  {id: 8, label: '辽宁'}, 
                  {id: 9, label: '吉林'}, 
                  {id: 10, label: '黑龙江'}, 
                  {id: 11, label: '江苏'}, 
                  {id: 12, label: '浙江'}, 
                  {id: 13, label: '安徽'}, 
                  {id: 14, label: '福建'}, 
                  {id: 15, label: '江西'}, 
                  {id: 16, label: '山东'}, 
                  {id: 17, label: '河南'}, 
                  {id: 18, label: '湖北'}, 
                  {id: 19, label: '湖南'}, 
                  {id: 20, label: '广东'}, 
                  {id: 21, label: '广西'}, 
                  {id: 22, label: '海南'}, 
                  {id: 23, label: '四川'}, 
                  {id: 24, label: '贵州'}, 
                  {id: 25, label: '云南'}, 
                  {id: 26, label: '西藏'}, 
                  {id: 27, label: '陕西'}, 
                  {id: 28, label: '甘肃'}, 
                  {id: 29, label: '宁夏'}, 
                  {id: 30, label: '青海'}, 
                  {id: 31, label: '新疆'}, 
                  {id: 32, label: '香港'}, 
                  {id: 33, label: '澳门'}, 
                  {id: 34, label: '台湾'}]
  $scope.arr = new  Array();
  $scope.arr[0] = ["请选择"];
  $scope.arr[1]=["东城","西城","崇文","宣武","朝阳","丰台","石景山","海淀","门头沟","房山","通州","顺义","昌平","大兴","平谷","怀柔","密云","延庆"];
  $scope.arr[2]=["黄浦","卢湾","徐汇","长宁","静安","普陀","闸北","虹口","杨浦","闵行","宝山","嘉定","浦东","金山","松江","青浦","南汇","奉贤","崇明"];
  $scope.arr[3]=["和平","东丽","河东","西青","河西","津南","南开","北辰","河北","武清","红挢","塘沽","汉沽","大港","宁河","静海","宝坻","蓟县"];
  $scope.arr[4]=["万州","涪陵","渝中","大渡口","江北","沙坪坝","九龙坡","南岸","北碚","万盛","双挢","渝北","巴南","黔江","长寿","綦江","潼南","铜梁","大足","荣昌","壁山","梁平","城口","丰都","垫江","武隆","忠县","开县","云阳","奉节","巫山","巫溪","石柱","秀山","酉阳","彭水","江津","合川","永川","南川"];
  $scope.arr[5]=["石家庄","邯郸","邢台","保定","张家口","承德","廊坊","唐山","秦皇岛","沧州","衡水"];
  $scope.arr[6]=["太原","大同","阳泉","长治","晋城","朔州","吕梁","忻州","晋中","临汾","运城"];
  $scope.arr[7]=["呼和浩特","包头","乌海","赤峰","呼伦贝尔盟","阿拉善盟","哲里木盟","兴安盟","乌兰察布盟","锡林郭勒盟","巴彦淖尔盟","伊克昭盟"];
  $scope.arr[8]=["沈阳","大连","鞍山","抚顺","本溪","丹东","锦州","营口","阜新","辽阳","盘锦","铁岭","朝阳","葫芦岛"];
  $scope.arr[9]=["长春","吉林","四平","辽源","通化","白山","松原","白城","延边"];
  $scope.arr[10]=["哈尔滨","齐齐哈尔","牡丹江","佳木斯","大庆","绥化","鹤岗","鸡西","黑河","双鸭山","伊春","七台河","大兴安岭"];
  $scope.arr[11]=["南京","镇江","苏州","南通","扬州","盐城","徐州","连云港","常州","无锡","宿迁","泰州","淮安"];
  $scope.arr[12]=["杭州","宁波","温州","嘉兴","湖州","绍兴","金华","衢州","舟山","台州","丽水"];
  $scope.arr[13]=["合肥","芜湖","蚌埠","马鞍山","淮北","铜陵","安庆","黄山","滁州","宿州","池州","淮南","巢湖","阜阳","六安","宣城","亳州"];
  $scope.arr[14]=["福州","厦门","莆田","三明","泉州","漳州","南平","龙岩","宁德"];
  $scope.arr[15]=["南昌市","景德镇","九江","鹰潭","萍乡","新馀","赣州","吉安","宜春","抚州","上饶"];
  $scope.arr[16]=["济南","青岛","淄博","枣庄","东营","烟台","潍坊","济宁","泰安","威海","日照","莱芜","临沂","德州","聊城","滨州","菏泽"];
  $scope.arr[17]=["郑州","开封","洛阳","平顶山","安阳","鹤壁","新乡","焦作","濮阳","许昌","漯河","三门峡","南阳","商丘","信阳","周口","驻马店","济源"];
  $scope.arr[18]=["武汉","宜昌","荆州","襄樊","黄石","荆门","黄冈","十堰","恩施","潜江","天门","仙桃","随州","咸宁","孝感","鄂州"];
  $scope.arr[19]=["长沙","常德","株洲","湘潭","衡阳","岳阳","邵阳","益阳","娄底","怀化","郴州","永州","湘西","张家界"];
  $scope.arr[20]=["广州","深圳","珠海","汕头","东莞","中山","佛山","韶关","江门","湛江","茂名","肇庆","惠州","梅州","汕尾","河源","阳江","清远","潮州","揭阳","云浮"];
  $scope.arr[21]=["南宁","柳州","桂林","梧州","北海","防城港","钦州","贵港","玉林","南宁地区","柳州地区","贺州","百色","河池"];
  $scope.arr[22]=["海口","三亚"];
  $scope.arr[23]=["成都","绵阳","德阳","自贡","攀枝花","广元","内江","乐山","南充","宜宾","广安","达川","雅安","眉山","甘孜","凉山","泸州"];
  $scope.arr[24]=["贵阳","六盘水","遵义","安顺","铜仁","黔西南","毕节","黔东南","黔南"];
  $scope.arr[25]=["昆明","大理","曲靖","玉溪","昭通","楚雄","红河","文山","思茅","西双版纳","保山","德宏","丽江","怒江","迪庆","临沧"];
  $scope.arr[26]=["拉萨","日喀则","山南","林芝","昌都","阿里","那曲"];
  $scope.arr[27]=["西安","宝鸡","咸阳","铜川","渭南","延安","榆林","汉中","安康","商洛"];
  $scope.arr[28]=["兰州","嘉峪关","金昌","白银","天水","酒泉","张掖","武威","定西","陇南","平凉","庆阳","临夏","甘南"];
  $scope.arr[29]=["银川","石嘴山","吴忠","固原"];
  $scope.arr[30]=["西宁","海东","海南","海北","黄南","玉树","果洛","海西"];
  $scope.arr[31]=["乌鲁木齐","石河子","克拉玛依","伊犁","巴音郭勒","昌吉","克孜勒苏柯尔克孜","博尔塔拉","吐鲁番","哈密","喀什","和田","阿克苏"];
  $scope.arr[32]=["香港"];
  $scope.arr[33]=["澳门"];
  $scope.arr[34]=["台北","高雄","台中","台南","屏东","南投","云林","新竹","彰化","苗栗","嘉义","花莲","桃园","宜兰","基隆","台东","金门","马祖","澎湖"];
  $scope.$watch(['data.p'], function () {
    console.log($scope.data.p)
  }, true);
  $scope.submit = function () {
    if($scope.data.p==0){
      $scope.data.city = ''
    }else{
      if($scope.data.c=='请选择'){
        $scope.data.city = $scope.pros[$scope.data.p].label
      }else{
        $scope.data.city = $scope.pros[$scope.data.p].label+$scope.data.c
      }
    }
    if (!$scope.data.name) {
      $showAlert.alert('请输入您的姓名');
    } else if ((($scope.data.tel) && ($scope.data.tel.toString().length != 6) && ($scope.data.tel.toString().length != 11)) || (!$scope.data.tel)) {
      $showAlert.alert('请输入正确的手机号');
    } else {
      $hezuo.formdd(JSON.stringify($scope.data), $scope.submitSuccess, $scope.error);
    }
  }
  $scope.submitSuccess = function (data) {
    if (data.msgCode==0) {
      $showAlert.alert('提交成功');
      $ionicHistory.goBack();
    } else {
      $showAlert.alert(data.msgMessage?data.msgMessage:'提交失败');
    }
  };
  $scope.error = function (data) {
    if (data && data.msgMessage) {
      $showAlert.alert(data.msgMessage)
    } else {
      $showAlert.alert('发送失败，请检查网络');
    }
  };
  
  $scope.goBack = function(){
    $ionicHistory.goBack();
  }
})