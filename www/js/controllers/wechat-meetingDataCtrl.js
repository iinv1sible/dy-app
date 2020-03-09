angular.module('starter.controllers.wechatMeetingDataCtrl', []).controller('wechatMeetingDataCtrl', function ($scope, $state, $httpWechat, $location, $ionicScrollDelegate) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
        $scope.type = ''
        $scope.showDataType = 1
        $scope.isInfoDataShow = true
        if($location.$$search.type=='month'){
          $scope.type = '上月'
        }else if($location.$$search.type=='week'){
          $scope.type = '上周'
        }else if($location.$$search.type=='day'){
          $scope.type = '昨天'
        }
        $scope.thData = [
          ['序号','线索来源','顾客姓名','宴会时间','宴会类型','状态'],
          ['序号','生成时间','顾客姓名','所属营销','宴会类型','状态'],
          ['序号','确认时间','顾客姓名','所属营销','宴会类型','确认方式'],
          ['序号','举办时间','顾客姓名','所属营销','宴会类型','金额'],
          ['序号','跟进对象','宴会类型','跟进人','跟进日期','跟进情况','跟进提醒']
        ]
        $scope.tableThData = $scope.thData[0]
        $scope.tableData = []
        $scope.data = {}
        $scope.params = {
          businessId: $location.$$search.businessId,
          startResvdata: $location.$$search.startResvdata,
          endResvdata: $location.$$search.endResvdata
        }
        $httpWechat.getMOrderData($scope.params, function(data){
          $scope.data = data
        })
        $scope.getTableData(1)
    })
    $scope.showData = function(num, status){
        $scope.showDataType = num
        $scope.tableThData = $scope.thData[num-1]
        $scope.getTableData(num, status)
    }
    $scope.getTableData = function(num, status) {
      if(num == 1){
        $httpWechat.getMNewKeyData($scope.params, function(data){
          $scope.tableData = data
        })
      } else if(num == 5){
        $httpWechat.getMNewRecordData($scope.params, function(data){
          $scope.tableData = data
        })
        $httpWechat.getMRecordRankData($scope.params, $scope.getChartSuccess)
      }else{
        $scope.params.status = status
        $httpWechat.getMNewOrderData($scope.params, function(data){
          $scope.tableData = data
        })
      }
    }
    $scope.getChartSuccess = function (data) {
        console.log(data);
        var colName = [];
        var arr1 = []
        for(var j=0;j<data.length;j++){
          arr1.push(data[j].resordNum);
          colName.push(data[j].appUserName)
        }
        $scope.chartLineConfig = $scope.setLineConfig1(arr1, colName);
    }
    $scope.setLineConfig1 = function(chartData, colName){
      return {
        title: {
          text: '跟进数量'
        },
        xAxis: {
          categories: colName
        },
        yAxis: {
          title: {
            text: null
          }
        },
        series: [{
          data: chartData,
          name: '跟进数量',
          type: 'bar',
          color: '#fd4e4f',
          showInLegend: false
        }]
      }
    }

    $scope.showInfoData = function(){
      $scope.isInfoDataShow = !$scope.isInfoDataShow
    }
})