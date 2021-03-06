angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
})

.factory('jpushService',['$http','$window','$document','$q',function($http,$window,$document,$q){
  var jpushServiceFactory={};
  
  //var jpushapi=$window.plugins.jPushPlugin;
    //申请权限 

  //启动极光推送
  var _init=function(config){
      //申请权限 
      $window.plugins.jPushPlugin.requestPermission();
      $window.plugins.jPushPlugin.init();
      //设置tag和Alias触发事件处理
      document.addEventListener('jpush.setTagsWithAlias',config.stac,false);
      //收到消息触发
      document.addEventListener("jpush.receiveNotification", function (event) {

        var alertContent;
        if(ionic.Platform.isAndroid()) {
            alertContent = event.alert;
        } else {
            alertContent = event.aps.alert;
        }
        alert("receiveNotification:" + alertContent);
    }, false);

      //打开推送消息事件处理
      $window.plugins.jPushPlugin.openNotificationInAndroidCallback=config.oniac;
      
      $window.plugins.jPushPlugin.setDebugMode(true);
  }
  //获取id
  var _getRegistrationID= function(){
    var deferred = $q.defer();
    $window.plugins.jPushPlugin.getRegistrationID(function(data){
      if(/"failed"/.test(data+"")){
        deferred.reject(data); 
      }else{
        deferred.resolve(data); 
      }
    });
    return deferred.promise;
  }
  //重启服务
  var _resumePush = function(){
    $window.plugins.jPushPlugin.resumePush();
  }
  //获取状态
  var _isPushStopped=function(fun){
      $window.plugins.jPushPlugin.isPushStopped(fun)
  }
  //停止极光推送
  var _stopPush=function(){
      $window.plugins.jPushPlugin.stopPush();
  }

  //设置标签和别名
  var _setTagsWithAlias=function(tags,alias){
      $window.plugins.jPushPlugin.setTagsWithAlias(tags,alias);
  }

  //设置标签
  var _setTags=function(tags){
      $window.plugins.jPushPlugin.setTags(tags);
  }

  //设置别名
  var _setAlias=function(alias){
      $window.plugins.jPushPlugin.setAlias(alias);
  }

  //系统是否启用通知
  var _getUserNotificationSettings = function(back){
    $window.plugins.jPushPlugin.getUserNotificationSettings(function(data){
      if(!!data && angular.isFunction(back)){
        back(data);
      }
    })
  }

  jpushServiceFactory.init=_init;
  jpushServiceFactory.isPushStopped=_isPushStopped;
  jpushServiceFactory.stopPush=_stopPush;
  jpushServiceFactory.resumePush=_resumePush;

  jpushServiceFactory.setTagsWithAlias=_setTagsWithAlias;
  jpushServiceFactory.setTags=_setTags;
  jpushServiceFactory.setAlias=_setAlias;
  jpushServiceFactory.getRegistrationID=_getRegistrationID;
  jpushServiceFactory.getUserNotificationSettings = _getUserNotificationSettings;
  return jpushServiceFactory;
}])


.factory('noticeService', [function () {
  var notices=[
      {id:1,msg:'消息一'},
      {id:2,msg:'消息二'},
      {id:3,msg:'消息三'},
      {id:4,msg:'消息四'},
      {id:5,msg:'消息五'},
      {id:6,msg:'消息六'},
      {id:7,msg:'消息七'},
      {id:8,msg:'消息八'}
  ];

  return {
      notices:notices
  };
}])