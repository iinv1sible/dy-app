angular.module('starter.controllers.wechatDataCtrl', []).controller('wechatDataCtrl', function ($scope, $state, $httpWechat, $location, $calendar, $ionicScrollDelegate) {
    $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
        viewData.enableBack = false;
        $scope.type = ''
        if($location.$$search.type=='month'){
          $scope.type = '上月'
        }else if($location.$$search.type=='week'){
          $scope.type = '上周'
        }
        $scope.showType = 1
        $scope.pieType = 1
        $scope.barType = 1
        $scope.showDataType = 1
        $scope.isInfoDataShow = true
        $scope.tableData = []
        $scope.appUserData1 = []
        $scope.appUserData2 = []
        $scope.data = {}
        $scope.params = {
          businessId: $location.$$search.businessId,
          startResvdata: $location.$$search.startResvdata,
          endResvdata: $location.$$search.endResvdata
        }
        $httpWechat.getOrderData($scope.params, function(data){
          $scope.data = data
        })
        $scope.getChartData(1)
        
        $scope.appUserDataInfo = []
        $scope.params.sort = 0
        $httpWechat.getSellerRankData($scope.params, function(data){
          $scope.appUserDataInfo = data.concat()
        })
    })
    $scope.changePage = function(num) {
        $scope.showType = num
        if(num == 1){
          $scope.showData(1)
        }else{
          $httpWechat.getVipAddRankData($scope.params, function(data){
            $scope.appUserData1 = data.concat()
            if(data.length<3){
              for(var j = 0;j<3-data.length;j++){
                $scope.appUserData1.push({
                  app_user_name: ''
                })
              }
            }
          })
          $scope.params.sort = 0
          $httpWechat.getSellerRankData($scope.params, function(data){
            $scope.appUserData2 = data.concat()
            if(data.length<3){
              for(var i = 0;i<3-data.length;i++){
                $scope.appUserData2.push({
                  appUserName: ''
                })
              }
            }
          })
        }
        $ionicScrollDelegate.scrollTop();
    }
    $scope.showData = function(num){
        $scope.showDataType = num
        $scope.getChartData(num)
    }
    $scope.getChartData = function(num){
      if(num == 1){
        $httpWechat.getOrderStatisticsData($scope.params, $scope.getChartSuccess)
      }else if(num == 2){
        $httpWechat.getVipRecordData($scope.params, $scope.getChartSuccess)
      }else if(num == 3){
        $httpWechat.getOrderRankData($scope.params, $scope.getChartSuccess)
      }else if(num == 4){
        $httpWechat.getOrderListData($scope.params, function(data){
          $scope.tableData = data
        })
      }else if(num == 5){
        $scope.params.sort = 0
        $httpWechat.getSellerRankData($scope.params, $scope.getBarSuccess)
        $httpWechat.getVipRankAllData($scope.params, $scope.getPie1Success)
        $httpWechat.getVipValueData($scope.params, $scope.getPie2Success)
      }
    }
    $scope.changeBar = function(num){
      $scope.barType = num
      $scope.params.sort = num - 1
      $httpWechat.getSellerRankData($scope.params, $scope.getBarSuccess)
    }
    $scope.changePie = function(num){
      $scope.pieType = num
      if(num == 1){
        $httpWechat.getVipValueData($scope.params, $scope.getPie2Success)
      }else{
        $httpWechat.getVipValueDetailData($scope.params, $scope.getPie2Success)
      }
    }
    $scope.getChartSuccess = function (data) {
        console.log(data);
        var colName = []
        var chartData = []
        chartData[0] = []
        chartData[1] = []
        chartData[2] = []
        chartData[3] = []
        var legent = []
        var m = new Date($location.$$search.startResvdata).getMonth()
        var y = new Date($location.$$search.startResvdata).getFullYear()
        if(m == 0){
          y = y-1
          m = 11
        }
        var days = $calendar.solarDays(y, m)
        if($scope.showDataType == 1){
          for(var i=0;i<days;i++){
            colName[i] = i+1;
            for(var j=0;j<data.length;j++){
              if(Number(data[j].day) == (i+1)){
                chartData[0][i] = data[j].allNum;
                chartData[1][i] = data[j].validNum;
                chartData[2][i] = data[j].invalidNum;
                chartData[3][i] = data[j].sepNum;
                break;
              }else{
                chartData[0][i] = 0;
                chartData[1][i] = 0;
                chartData[2][i] = 0;
                chartData[3][i] = 0;
              }
            }
          }
          legent = ['总订单数','有效订单数','退订订单数','散客订单数']
        }else if($scope.showDataType == 2){
          for(var j=0;j<data.length;j++){
            colName.push(data[j].date)
            chartData[0].push(data[j].newVipCount)
            chartData[1].push(data[j].awakenVipCount)
            chartData[2].push(data[j].sleepVipCount)
            chartData[3].push(data[j].flowVipCount)
          }
          legent = ['新增客户数','唤醒客户数','沉睡客户数','流失客户数']
        }else if($scope.showDataType == 3){
          var dataNew = []
          for(var i in data){
            legent.push(i)
            dataNew.push(data[i])
          }
          for(var i=0;i<days;i++){
            colName[i] = i+1;
            for(var j=0;j<dataNew.length;j++){
              if(dataNew[0][j] && Number(dataNew[0][j].day) == (i+1)){
                chartData[0][i] = dataNew[0][j].tableRank;
                break;
              }else{
                chartData[0][i] = 0;
              }
            }
            for(var j=0;j<dataNew.length;j++){
              if(dataNew[1][j] && Number(dataNew[1][j].day) == (i+1)){
                chartData[1][i] = dataNew[1][j].tableRank;
                break;
              }else{
                chartData[1][i] = 0;
              }
            }
            for(var j=0;j<dataNew.length;j++){
              if(dataNew[2][j] && Number(dataNew[2][j].day) == (i+1)){
                chartData[2][i] = dataNew[2][j].tableRank;
                break;
              }else{
                chartData[2][i] = 0;
              }
            }
          }
        }
        $scope.chartLineConfig = $scope.setLineConfig1(chartData, colName, legent);
    }
    $scope.getPie1Success = function (data) {
      var pieData = [{
        name: '0-25',
        y: data.rank1,
        color: '#fd4e4f',
      },
      {
        name: '25-50',
        y: data.rank2,
        color: '#95809e'
      },
      {
        name: '50-75',
        y: data.rank3,
        color: '#ffd651'
      },
      {
        name: '75-100',
        y: data.rank4,
        color: '#333333'
      }]
      $scope.chartPieConfig1 = $scope.setPieConfig1(pieData);
    }
    $scope.getPie2Success = function (data) {
      var title = '', names = []
      var colors = ['#fd4e4f', '#95809e', '#ffd651', '#333333']
      var pieData = []
      if($scope.pieType == 1){
        title = '一级分类占比'
        names = ['意向客户','活跃客户','沉睡客户','流失客户']
        var arr = []
        for(var j in data){
          arr.push(data[j])
        }
        for(var i=0;i<arr.length;i++){
          pieData.push(
            {
              name: names[i],
              y: arr[i],
              color: colors[i]
            }
          )
        }
      }else{
        title = '客户细分价值占比'
        for(var j=0;j<data.length;j++){
          pieData.push(
            {
              name: data[j].valueName,
              y: data[j].percent,
              color: colors[j]
            }
          )
        }
      }
      console.log(pieData)
      $scope.chartPieConfig2 = $scope.setPieConfig2(pieData, title);
    }
    $scope.getBarSuccess = function (data) {
        console.log(data);
        var arr1 = []
        var colName = []
        for(var j=0;j<data.length;j++){
          arr1.push(data[j].orderNum)
          colName.push(data[j].appUserName)
        }
        var title = ''
        if($scope.barType == 1){
          title = '销售前十单量'
        }else{
          title = '销售后十单量'
        }
        $scope.chartBarConfig = $scope.setBarConfig(arr1, colName, title);
    }
    $scope.setLineConfig1 = function(chartData, colName, legent){
      var series = []
      var colors = ['#fd4e4f', '#95809e', '#ffd651', '#333333']
      for(var i = 0; i < legent.length; i++){
        series.push({
          data: chartData[i],
          name: legent[i],
          type: 'line',
          color: colors[i]
        })
      }
      return {
        title: {
          text: null
        },
        xAxis: {
          categories: colName
        },
        yAxis: {
          title: {
            text: null
          }
        },
        series: series
      }
    }
    $scope.setPieConfig1 = function(pieData){
      return {
        options: {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
          },
          plotOptions: {
            pie: {
              innerSize: "0",
              allowPointSelect: true,
              cursor: 'pointer',
            }
          }
        },
        title: {
          text: '客户资料完整度全店占比'
        },
        series: [{
          type: 'pie',
          name: '预订单数',
          data: pieData
        }]
      };
    }
    $scope.setPieConfig2 = function(pieData, title){
      return {
        options: {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false
          },
          plotOptions: {
            pie: {
              innerSize: "0",
              allowPointSelect: true,
              cursor: 'pointer',
            }
          }
        },
        title: {
          text: title
        },
        series: [{
          type: 'pie',
          name: '预订单数',
          data: pieData
        }]
      };
    }
    $scope.setBarConfig = function(chartData, colName, title){
      return {
        title: {
          text: title
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
          name: '订单数量',
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