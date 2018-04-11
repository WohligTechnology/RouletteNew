connector.controller('HomeCtrl', function ($scope, $ionicModal, Service, $state, $timeout) {
  console.log("hiiii")
  //   $ionicModal.fromTemplateUrl('../modal/spinner.html', {
  //     scope: $scope,
  //     animation: 'slide-in-up'
  //   }).then(function(modal) {
  //     $scope.modal = modal;
  //   });
  // $scope.openModal = function () {
  //   $scope.modal.show();
  // };
  //   $scope.closeModal = function() {
  //     $scope.modal.hide();
  //   };

  $scope.accessToken = $.jStorage.get("accessToken");
  if (_.isEmpty($scope.accessToken)) {
    $state.go("login");
  }

  $scope.playerData = function () {
    Service.sendAccessToken(function (data) {
      $scope.singlePlayerData = data.data.data;
      $scope.image = $scope.singlePlayerData.image;
      $scope.memberId = $scope.singlePlayerData._id;
      $scope.username = $scope.singlePlayerData.username;
      $scope.userType = $scope.singlePlayerData.userType;
      $scope.balance = $scope.singlePlayerData.creditLimit + $scope.singlePlayerData.balanceUp;
      $.jStorage.set("singlePlayerData", $scope.singlePlayerData);
    })
  };

  $scope.playerData();

  $scope.coins = ["coin1", "coin2", "coin3", "coin4", "coin5", "coin6"];

  $scope.coinSelect = function (coin) {
    switch (coin) {
      case "coin1":
        console.log("#### coin1");
        $scope.coinSelects = "coin1";
        // $scope.coin1Select = true;
        // $scope.coin2Select = false;
        // $scope.coin3Select = false;
        // $scope.coin4Select = false;
        // $scope.coin5Select = false;
        // $scope.coin6Select = false;
        // $scope.coin7Select = false;
        if ($scope.coin1) {

        } else {
          $scope.coin1 = {
            coin1: true,
            amount: 0.1,
            count: 0
          }
        }
        break;
      case "coin2":
        console.log("#### coin2");
        $scope.coinSelects = "coin2";
        if ($scope.coin2) {

        } else {
          $scope.coin2 = {
            coin2: true,
            amount: 1,
            count: 0
          }
        }
        // $scope.coin1Select = false;
        // $scope.coin2Select = true;
        // $scope.coin3Select = false;
        // $scope.coin4Select = false;
        // $scope.coin5Select = false;
        // $scope.coin6Select = false;
        // $scope.coin7Select = false;
        break;
      case "coin3":
        // $scope.coin3 = true;
        $scope.coinSelects = "coin3";
        if ($scope.coin3) {

        } else {
          $scope.coin3 = {
            coin3: true,
            amount: 5,
            count: 0
          }
        }
        break;
      case "coin4":
        // $scope.coin4 = true;
        $scope.coinSelects = "coin4";
        if ($scope.coin4) {

        } else {
          $scope.coin4 = {
            coin4: true,
            amount: 10,
            count: 0
          }
        }
        break;
      case "coin5":
        // $scope.coin5 = true;
        $scope.coinSelects = "coin5";
        if ($scope.coin5) {

        } else {
          $scope.coin5 = {
            coin5: true,
            amount: 25,
            count: 0
          }
        }
        break;
      case "coin6":
        // $scope.coin6 = true;
        $scope.coinSelects = "coin6";
        if ($scope.coin6) {

        } else {
          $scope.coin6 = {
            coin6: true,
            amount: 100,
            count: 0
          }
        }
        break;
      default:
        break;
    }
  }
  $ionicModal.fromTemplateUrl('modal/message.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function (modal) {
    $scope.messageModal = modal;
  });
  $scope.showMessageModal = function () {
    $scope.messageModal.show();
    $timeout(function () {
      $scope.closeMessageModal();
    }, 2000);
  };
  $scope.closeMessageModal = function () {
    $scope.messageModal.hide();
  };

  $scope.bet = [];
  $scope.amountBet = [];
  $scope.betUser = [];
  $scope.amount = $scope.betAmount = 0;
  $scope.userBet = function (betName, bet) {
    console.log("betNumber", betName, typeof (betName));
    // $scope.bet = betName;
    var field = bet;
    $scope.bet[field] = betName;
    $scope.userBet1 = {
      user: $.jStorage.get("singlePlayerData")._id
    }
    if ($scope.coinSelects) {
      if ($scope.coinSelects == "coin1") {
        $scope.coin1[field] = true;
        $scope.coin1.count++;
        $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin1.amount;
        $scope.coinAmount[field]=$scope.coinSelects;
        $scope.amount = _.round($scope.amount + $scope.coin1.amount, 2);
      }
      if ($scope.coinSelects == "coin2") {
        $scope.coin2[field] = true;
        $scope.coin2.count++;
        $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin2.amount;
        $scope.amount = $scope.amount + $scope.coin2.amount;
      }
      if ($scope.coinSelects == "coin3") {
        $scope.coin3[field] = true;
        $scope.coin3.count++;
        $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin3.amount;
        $scope.amount = $scope.amount + $scope.coin3.amount;
      }
      if ($scope.coinSelects == "coin4") {
        $scope.coin4[field] = true;
        $scope.coin4.count++;
        $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin4.amount;
        $scope.amount = $scope.amount + $scope.coin4.amount;
      }
      if ($scope.coinSelects == "coin5") {
        $scope.coin5[field] = true;
        $scope.coin5.count++;
        $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin5.amount;
        $scope.amount = $scope.amount + $scope.coin5.amount;
      }
      if ($scope.coinSelects == "coin6") {
        $scope.coin6[field] = true;
        $scope.coin6.count++;
        $scope.userBet1.amountplaces = $scope.betAmount = $scope.coin6.amount;
        $scope.amount = $scope.amount + $scope.coin6.amount;
      }
      if ($scope.amountBet[field]) {
        $scope.amountBet[field] = $scope.amountBet[field] + $scope.betAmount;
      } else {
        $scope.amountBet[field] = $scope.betAmount;
      }
      if ($scope.betUser.length != 0) {
        var index = _.find($scope.betUser,
          function (o) {
            return o.bet == betName;
          });

        if (index == undefined) {
          $scope.betUser.push({
            bet: betName,
            amountplaces: $scope.amountBet[bet]
          });
        } else {
          index.amountplaces = $scope.amountBet[bet];
        }
      } else {
        $scope.betUser.push({
          bet: betName,
          amountplaces: $scope.amountBet[bet]
        });
      }

      console.log("$scope.betAmount", $scope.betAmount);
      console.log("$scope.amount[field]$scope.amount[field]", $scope.amountBet);
      console.log("$scope.amount $scope.amount ", $scope.amount);
      console.log(" $scope.betUser $scope.betUser ", $scope.betUser);

      console.log("$scope.userBet1", $scope.userBet1);
    } else {
      $scope.message = {
        heading: "Please Select coin",
        content: "Please Select the coin Before Bet. Try Again!!!"
      };
      $scope.showMessageModal();
    }

  }
  if ($scope.betUser) {
    // $timeout(function () {

    // }, 30000);
  }

  io.socket.on("betsNotAllowed", function (data) {
    console.log("in socket", data);
    if (data.data == "Bets are Not Allowed") {
      console.log("in timeout function ", $scope.betUser);
      if ($scope.betUser) {
        _.each($scope.betUser, function (user) {
          Service.saveUserBets(user, function (data) {
            console.log("################", data);
            $rootScope.result = data.data.results;
          })
        });
      }
      $state.go("spinner");
    }
  });

  $scope.logout = function () {
    Service.playerLogout(function (data) {
      if (data.data.value) {
        $.jStorage.deleteKey("accessToken");
        $state.go("home");
      }
    });
  }
  var btnSpin = $("#btnSpin");
  btnSpin.click(function () {
    console.log("btn clicked");
    $state.go("spinner");
  });
})
