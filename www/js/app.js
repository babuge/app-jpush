// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform,$state,jpushService) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //推送初始化
    var setTagsWithAliasCallback=function(event){
      window.alert('result code:'+event.resultCode+' tags:'+event.tags+' alias:'+event.alias);
    }
    var openNotificationInAndroidCallback=function(data){
      var json=data;
      window.alert(json);
      if(typeof data === 'string'){
        json=JSON.parse(data);
      }
      var id=json.extras['cn.jpush.android.EXTRA'].id;
      //window.alert(id);
      var alert = json.extras['cn.jpush.android.ALERT'];
      $state.go('detail',{id:id+alert});
    }
    var config={
      stac:setTagsWithAliasCallback,
      oniac:openNotificationInAndroidCallback
    };

    jpushService.init(config);

    //启动极光推送服务
    window.plugins.jPushPlugin.init();
    window.plugins.jPushPlugin.setDebugMode(true);
  });

  window.onerror = function(msg, url, line) {
   var idx = url.lastIndexOf("/");
   if(idx > -1) {
    url = url.substring(idx+1);
   }
   alert("ERROR in " + url + " (line #" + line + "): " + msg);
   return false;
  };
  
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })
  .state('tab.main',{
    url:'/main?url',
    views:{
      'tab-dash':{
        templateUrl: "templates/main.html",
        controller:'mainCtrl'
      }
    }
  })
  .state('tab.list',{
    url:'/list',
    views:{
      'tab-dash':{
        templateUrl:'templates/list.html',
        controller:'listCtrl'
      }
    }
  })
  .state('tab.detail',{
    url:'/detail?id',
    views:{
      'tab-dash':{
        templateUrl:'templates/detail.html',
        controller:'detailCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
