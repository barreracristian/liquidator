angular.module('liquidator.controllers.SucursalController', [])

    .controller('SucursalController', function ($scope, $ionicPopup, $stateParams, $state, DBService) {

            DBService.getSucursal($stateParams.sucursal_id).then(
                function (sucursal) {
                    $scope.sucursal = sucursal;
                },
                function (error) {
                    console.log(error);
                }
            );

            $scope.clearFilter = function () {
                $scope.response = {};
                $scope.response.estado = null;
            };
            $scope.clearFilter();

            $scope.filtraSiniestros = function (siniestro) {
                if ($scope.response.estado == null) {
                    return true;
                }
                return siniestro.estado == $scope.response.estado.value;
            }
        }
    );
