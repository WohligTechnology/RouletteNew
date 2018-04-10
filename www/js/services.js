myApp = angular.module('starter.services', []);
// var url = "http://192.168.2.21:1337/api/";

// var url = "localhost:1337/api/";
// var imgurl = adminurl + "upload/";
// var imgpath = imgurl + "readFile";
var maxRow = 10;
myApp.factory('Service', function ($http, $ionicLoading, $ionicActionSheet, $timeout, $state) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data


  // io.socket.on('connect', function (socket) {
  //   socketId = io.socket._raw.id;
  //   $.jStorage.set("socketId", io.socket._raw.id);
  //   obj.connectSocket(function () {});
  // });

  var obj = {
    all: function () {
      return chats;
    },
    remove: function (chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function (chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    },
    saveUserBets: function (userBet, callback) {
      $http.post(url + 'UserBets/saveUserBets', userBet).then(function (data) {
        callback(data);
      });
    },
    playerLogin: function (data, callback) {
      return $http.post(adminurl + 'member/playerLogin', data).then(function (data) {
        data = data.data;
        callback(data);
      });
    },
    playerLogout: function (callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http.post(adminurl + 'member/logout', {
          accessToken: accessToken
        }).then(function (data) {
          callback(data);
        });
      }
    },
    passwordchange: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        return $http.post(adminurl + 'member/changePassword', data).then(function (data) {
          data = data.data;
          callback(data);
        });
      }
    },

    sendAccessToken: function (callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        $http.post(adminurl + 'member/getAccessLevel', {
          accessToken: accessToken
        }).then(function (data) {
          callback(data);
        });
      } else {
        $state.go("login");
      }
    },
    giveTip: function (data, callback) {
      var accessToken = $.jStorage.get("accessToken");
      if (!_.isEmpty(accessToken)) {
        $http.post(url + 'Table/makeTip', {
          "accessToken": accessToken,
          "amount": data.amount
        }).then(function (data) {
          callback(data);
        });
      }
    },
    searchPlayerTransaction: function (memberId, pageNo, callback) {
      if (!pageNo) {
        pageNo = 1;
      }
      $http.post(adminurl + 'transaction/searchPlayerTransactionData', {
        _id: memberId,
        pageNo: pageNo
      }).then(function (data) {
        if (data.data) {
          var totalCount = data.data.data.total;
          data.data.data.options.maxPage = _.ceil(data.data.data.total / data.data.data.options.count);
          callback(data);
        } else {}
      });
    },
  }
  return obj;
});
