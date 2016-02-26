angular.module('liquidator.controllers.BusquedaController', [])

    .controller('BusquedaController', function ($scope, $ionicPopup, $stateParams, $state, DBService) {

        $scope.busqueda = $stateParams.term;
        DBService.busquedaSiniestros($stateParams.term).then(
            function (siniestros) {
                $scope.siniestros = siniestros;
            },
            function (error) {
                console.log(error);
            }
        );

        $scope.showSiniestro = function (siniestro) {
            $state.go('siniestro', {
                siniestro_id: siniestro.id
            });
        };

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
        };

    });
