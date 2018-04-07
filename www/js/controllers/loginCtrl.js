connector.controller('LoginCtrl', function ($scope, $ionicModal) {
  console.log("hiiii login")
  //   $ionicModal.fromTemplateUrl('../modal/spinner.html', {
  //     scope: $scope,
  //     animation: 'slide-in-up'
  //   }).then(function(modal) {
  //     $scope.modal = modal;
  //   });
  //   $scope.openModal = function() {
  //     $scope.modal.show();
  //   };
  //   $scope.closeModal = function() {
  //     $scope.modal.hide();
  //   };
})
connector.controller("RedirectingCtrl", function ($scope, Service, $state, $ionicPlatform) {
  if (ionic.Platform.isAndroid()) {
    $ionicPlatform.ready(function () {
      screen.orientation.lock('portrait')
    })
    screen.orientation.lock('portrait');
  } else {
    $ionicPlatform.ready(function () {
      screen.orientation.lock('portrait')
    })
    console.log("nothing for ios")
  }
  var accessToken = $.jStorage.get("accessToken");
  if (accessToken) {
    $state.go("home");
  } else {
    $state.go("login");
  }
});

connector.controller("LoginCtrl", function ($scope, Service, $state, $ionicPlatform, $ionicModal, $timeout) {
  console.log("$$$$$$$$$$$$$$$$$$$$$hiee")
  $ionicPlatform.ready(function () {
    screen.orientation.lock('portrait')
  })

  //  $ionicModal.fromTemplateUrl('templates/model/message.html', {
  //   scope: $scope,
  //   animation: 'slide-in-up'
  // }).then(function (modal) {
  //   $scope.messageModal = modal;
  // });

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

  $scope.invalidUser = false;
  $scope.playerLogin = function (data, login) {
    console.log("datadatadata", data);
    $scope.loginPromise = Service.playerLogin(data, function (data) {
      console.log("$$$$$$$$$$$$$$$$$$$$$$$$$", data)
      $.jStorage.set("accessToken", data.data);
      if (data && !_.isEmpty(data.data)) {
        $state.go("home");
      } else if (data.error == "Member already Logged In") {
        $scope.message = {
          heading: "User Already Loged In",
          content: "User already loged in another device. Logout from that device. Try Again!!!"
        };
        $scope.showMessageModal();
      } else {
        $scope.message = {
          heading: "Incorrect Username Password",
          content: "Try Again!!!"
        };
        $scope.showMessageModal();
      }
    });
  };


  //js Storage 
  $scope.accessToken = $.jStorage.get("accessToken");
  if (!_.isEmpty($scope.accessToken)) {
    $state.go("home");
  }
  $ionicPlatform.registerBackButtonAction(function (event) {
    ionic.Platform.exitApp();
    // event.preventDefault();
  }, 100);
});
