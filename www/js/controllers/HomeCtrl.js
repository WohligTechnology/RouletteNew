connector.controller('HomeCtrl', function ($scope, $ionicModal, Service) {
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
  $scope.userBet = function (betName) {
    console.log("betNumber", betName, typeof (betName));

    $scope.userBet1 = {
      // userId: $.jStorage.get("user")._id
    }
    $scope.userBet1.bet = betName;
    Service.saveUserBets($scope.userBet1, function (data) {
      console.log("################", data)
    });

  }
})
