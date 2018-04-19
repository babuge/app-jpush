angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,$state) {
  $scope.gotoMian =function(){
    $state.go("tab.main",{});
  }

})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('mainCtrl', ['$scope','$ionicPopup','$stateParams','$state','jpushService',
  function ($scope,$ionicPopup,$stateParams,$state,jpushService) {
    $scope.message="";

    $scope.options={
        tags:"",
        alias:""
    };

    $scope.result="";

    // $scope.$on('$ionicView.beforeEnter',function(){
    //     var url=$stateParams.url;
    //     if(url){
    //         $state.go(url);
    //     }
    // });
  //推送初始化
  var setTagsWithAliasCallback=function(event){
    window.alert('result code:'+event.resultCode+' tags:'+event.tags+' alias:'+event.alias);
    $scope.getRegistrationID();
  }
  var openNotificationInAndroidCallback=function(data){
    var json=data;
    window.alert(json);
    if(typeof data === 'string'){
      json=JSON.parse(data);
    }
    var id=json.extras['cn.jpush.android.EXTRA'].id;
    //window.alert(id);
    var alerts = json.extras['cn.jpush.android.ALERT'];
    $state.go('detail',{id:id+alerts});
  }
  var config={
    stac:setTagsWithAliasCallback,
    oniac:openNotificationInAndroidCallback
  };
    $scope.init=function(){
        jpushService.init(config);
        window.alert('执行启动');
    };

    $scope.stopPush=function(){
        jpushService.stopPush();
        window.alert('执行停止');
    };

    $scope.resumePush=function(){
        jpushService.resumePush();
        window.alert('执行重启');
    };

    $scope.getPushState=function(){
        jpushService.isPushStopped(function(data){
            if(data==0){
                window.alert('启动');
            }else{
                window.alert('停止');
            }
        });
    };

    $scope.setTags=function(){
        var tagArr=$scope.options.tags.split(',');
        setTagsWithAlias(tagArr,null);
        //jpushService.setTags(tagArr);
    }

    $scope.setAlias=function(){
        var alias=$scope.options.alias;
        setTagsWithAlias(null,alias);
        //jpushService.setAlias(alias);
    }
    $scope.getRegistrationID=function(){
        jpushService.getRegistrationID().then(function(data){
            $scope.registrationID=data;
             console.log("id"+data);
             alert("succ"+data)
        },function(err){
            $scope.registrationID=data;
            alert("err"+data);
        });
    }
    var setTagsWithAlias=function(tags,alias){
        jpushService.setTagsWithAlias(tags,alias);
    }
    $scope.setTagsWithAlias=function(){
        var tagArr=$scope.options.tags.split(',')
        if(tagArr.length==0){
            tagArr=null;
        }

        var alias=$scope.options.alias;
        if(alias===''){
            alias=null;
        }
        setTagsWithAlias(tagArr,alias);

    }
    $scope.cleanTagAndAlias=function(){
        var tags=[];
        var alias="";
        setTagsWithAlias(tags,alias);
    }
}])

.controller('listCtrl', ['$scope','noticeService' ,function ($scope,noticeService) {
    $scope.items=noticeService.notices;
}])

.controller('detailCtrl', ['$scope','$stateParams', function ($scope,$stateParams) {
    var id=$stateParams.id;
    $scope.message='消息id：'+id;
}])
