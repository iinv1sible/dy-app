angular.module('starter.controllers.sidedishCtrl', []).controller('SidedishCtrl', function ($scope, $httpOrder, $httpConfig, $ionicPopup, $ionicScrollDelegate, $ionicLoading, $showAlert, $T) {
  // 套餐列表
  $scope.mealSetList = []
  // 搜索关键词
  $scope.search = ''
  // 是否显示已点
  $scope.yidian = false
  // businessInfo.dishs-菜品列表
  $scope.businessInfo = {}
  // 已选菜品
  $scope.dishSelected = {}
  // 菜肴个数
  $scope.caiyaoNum = 0
  // 菜肴总金额
  $scope.caiyaoAll = 0
  // 登录信息
  $scope.info = JSON.parse(localStorage['info'])
  // 页面右侧显示菜单列表-筛选后
  $scope.dishList = []
  // 当前选中类别总菜单
  $scope.dishListAll = []
  // 展示详情（修改或新增页面）
  $scope.showDetail = false
  // 当前选中类别
  $scope.category = null
  // 详情数据
  $scope.detailData = {}
  $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
    viewData.enableBack = true
    $scope.getDishSetList()
  })
  $scope.getDishSetList = function () {
    $httpConfig.getDishSetList($scope.info.businessId, function (data) {
      $scope.mealSetList = data.map(function (item) {
        return $.extend(true, {}, item, { status: !!item.status })
      })
    }, function () {
      $showAlert.alert('加载套餐列表失败')
    })
  }
  $scope.formatContent = function (content) {
    return (JSON.parse(content.replace(/\'/g, '"')) || []).map(function (item) {
      return item.cmNum > 1 ? item.cmmc + '*' + item.cmNum : item.cmmc
    }).join(',')
  }
  $scope.blockCai = function () {
    $scope.showDetail = true
    $scope.yidian = false
    if (!$scope.businessInfo.dishs) {
      $ionicLoading.show({
        template: $T.T('加载中...')
      })
      $httpOrder.getDish($scope.info, function (data) {
        $scope.businessInfo.dishs = data.dishs
        $ionicLoading.hide()
      }, function () {
        $showAlert.alert('加载菜单失败')
      })
    }
    $ionicScrollDelegate.scrollTop();
  }
  $scope.handleDetail = function (data) {
    $scope.detailData = $.extend(true, {}, data)
    $scope.blockCai()
    if ($scope.detailData.id || $scope.detailData.id === 0) {
      var selectedList = {}
      var caiyaoNum = 0
      var caiyaoAll = 0
      JSON.parse($scope.detailData.templateContent.replace(/\'/g, '"')).map(function (item) {
        selectedList[item.cmbh] = $.extend(true, {}, item, { selectNum: item.cmNum })
        caiyaoNum += item.cmNum
        caiyaoAll += item.cmNum * item.cmje
      })
      $scope.dishSelected = $.extend(true, {}, selectedList)
      $scope.caiyaoNum = caiyaoNum
      $scope.caiyaoAll = caiyaoAll
      $scope.dishSetName = $scope.detailData.templateName
    }
  }
  $scope.preview = function () {
    if ($scope.yidian == true) {
      $scope.yidian = false;
    } else {
      $scope.search = '';
      $scope.yidian = true;
    }
  }
  $scope.clickDelete = function () {
    $ionicPopup.confirm({
      cssClass: "er-popup",
      template: $T.T('是否确认删除') + ($scope.detailData.templateName || ''),
      title: $T.T('删除套餐'),
      scope: $scope,
      buttons: [
        {text: $T.T('取消')},
        {
          text: `<b>${$T.T('确认')}</b>`,
          type: 'button-assertive',
          onTap: function () {
            // 删除套餐
            $httpConfig.deleteDishSet({
              id: $scope.detailData.id
            }, function () {
              $showAlert.alert('删除成功')
              $scope.hideDetail()
              $scope.getDishSetList()
            }, function (data) {
              $showAlert.alert('删除失败')
            })
          }
        }
      ]
    });
  }
  $scope.changeDalei = function (category) {
    $scope.search = ''
    var id = category.id
    $scope.category = id
    $scope.dishListAll = ($scope.businessInfo.dishs.filter(function(item) {
      return item.id === id
    })[0] || {}).cms || []
    $scope.dishList = $scope.dishListAll
    $ionicScrollDelegate.$getByHandle('cmScroll').scrollTop();
  }
  $scope.plusDish = function (dish) {
    if (!$scope.dishSelected[dish.cmbh]) {
      $scope.dishSelected[dish.cmbh] = $.extend(true, {}, dish, { selectNum: 1 })
    } else {
      $scope.dishSelected[dish.cmbh] = $.extend(true, {}, dish, { selectNum: $scope.dishSelected[dish.cmbh].selectNum + 1 })
    }
    // 金额
    $scope.caiyaoAll = ($scope.caiyaoAll * 100 + dish.cmje * 100) / 100
    // 数量
    $scope.caiyaoNum++
  }
  $scope.minusDish = function (dish) {
    if ($scope.dishSelected[dish.cmbh].selectNum === 1) {
      delete $scope.dishSelected[dish.cmbh]
    } else {
      $scope.dishSelected[dish.cmbh] = $.extend(true, {}, dish, { selectNum: $scope.dishSelected[dish.cmbh].selectNum - 1 })
    }
    $scope.caiyaoAll -= dish.cmje
    $scope.caiyaoNum--
  }
  $scope.clearChart = function () {
    $scope.caiyaoAll = 0
    $scope.caiyaoNum = 0
    $scope.dishSelected = {}
  }
  $scope.hideDetail = function () {
    $scope.showDetail = false
    $scope.detailData = {}
    $scope.dishSetName = ''
    $scope.clearChart()
  }
  $scope.selectCai = function () {
    var selectArr = []
    $scope.dishList = $scope.dishListAll.filter(function (item) {
      return item.cmmc.indexOf($scope.search) >= 0 || item.cmmcPy.indexOf($scope.search) >= 0
    })
  }
  $scope.saveDishSet = function () {
    if (!$scope.dishSetName) {
      $showAlert.alert('请输入套餐名称')
      return
    }
    var templateContent = []
    for (var cmbh in $scope.dishSelected) {
      var dish = $scope.dishSelected[cmbh]
      templateContent.push({
        cmmc: dish.cmmc,
        cmbh: dish.cmbh,
        cmje: dish.cmje,
        cmNum: dish.selectNum,
      })
    }
    if (templateContent.length === 0) {
      $showAlert.alert('请至少选择一种菜品')
      return
    }
    // 修改
    if ($scope.detailData.id || $scope.detailData.id === 0) {
      $httpConfig.editDishSet({
        // 为适应门店后台格式，替换"为'
        templateContent: JSON.stringify(templateContent).replace(/\"/g, "'"),
        businessId: $scope.info.businessId,
        templateName: $scope.dishSetName,
        templateSum: $scope.caiyaoAll + '',
        status: $scope.detailData.status ? 1 : 0,
        id: $scope.detailData.id
      }, function () {
        $showAlert.alert('修改成功')
        $scope.hideDetail()
        $scope.getDishSetList()
      }, function (data) {
        $showAlert.alert('修改失败')
      })
    } else {
      // 新增
      $httpConfig.addDishSet({
        templateContent: JSON.stringify(templateContent).replace(/\"/g, "'"),
        businessId: $scope.info.businessId,
        templateName: $scope.dishSetName,
        templateSum: $scope.caiyaoAll + '',
        status: '1'
      }, function () {
        $showAlert.alert('新增成功')
        $scope.hideDetail()
        $scope.getDishSetList()
      }, function (data) {
        $showAlert.alert('新增失败')
      })
    }
  }
  $scope.onStatusChange = function ($event, item) {
    $httpConfig.editDishSet({
      templateContent: item.templateContent,
      businessId: $scope.info.businessId,
      templateName: item.templateName,
      templateSum: item.templateSum,
      status: $event.target.checked ? 1 : 0,
      id: item.id
    }, function () {
      $scope.getDishSetList()
    }, function () {
      $showAlert.alert('修改失败')
    })
  }
  $scope.formatCaiyaoAll = function (num) {
    return parseInt(num)
  }
})
