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
        $scope.coinSelects = "coin2";
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
  $scope.amount = 0;
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
        $scope.userBet1.amountplaces = $scope.coin1.amount;
        $scope.amount = $scope.amount + $scope.coin1.amount;
      }
      if ($scope.coinSelects == "coin2") {
        $scope.coin2[field] = true;
        $scope.coin2.count++;
        $scope.userBet1.amountplaces = $scope.coin2.amount;
        $scope.amount = $scope.amount + $scope.coin2.amount;
      }
      if ($scope.coinSelects == "coin3") {
        $scope.coin3[field] = true;
        $scope.coin3.count++;
        $scope.userBet1.amountplaces = $scope.coin3.amount;
        $scope.amount = $scope.amount + $scope.coin3.amount;
      }
      if ($scope.coinSelects == "coin4") {
        $scope.coin4[field] = true;
        $scope.coin4.count++;
        $scope.userBet1.amountplaces = $scope.coin4.amount;
        $scope.amount = $scope.amount + $scope.coin4.amount;
      }
      if ($scope.coinSelects == "coin5") {
        $scope.coin5[field] = true;
        $scope.coin5.count++;
        $scope.userBet1.amountplaces = $scope.coin5.amount;
        $scope.amount = $scope.amount + $scope.coin5.amount;
      }
      if ($scope.coinSelects == "coin6") {
        $scope.coin6[field] = true;
        $scope.coin6.count++;
        $scope.userBet1.amountplaces = $scope.coin6.amount;
        $scope.amount = $scope.amount + $scope.coin6.amount;
      }

      console.log("$scope.amount $scope.amount ", $scope.amount);
      console.log("$scope.bet$scope.bet", $scope.bet[field], $scope.coin1);
      console.log("$scope.bet$scope.bet", $scope.bet[field], $scope.coin2);

      $scope.userBet1.bet = betName;
      console.log("$scope.userBet1", $scope.userBet1);
      Service.saveUserBets($scope.userBet1, function (data) {
        console.log("################", data)
      });
    } else {
      $scope.message = {
        heading: "Please Select coin",
        content: "Please Select the coin Before Bet. Try Again!!!"
      };
      $scope.showMessageModal();
    }

  }
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
