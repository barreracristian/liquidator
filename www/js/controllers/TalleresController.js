angular.module('liquidator.controllers.TalleresController', [])

    .controller('TalleresController', function ($scope, $ionicPopup, $timeout, $state, DBService) {

            DBService.getTalleres().then(
                function (talleres) {
                    $scope.talleres = talleres;
                },
                function (error) {
                    console.log(error);
                }
            );

        }
    );
