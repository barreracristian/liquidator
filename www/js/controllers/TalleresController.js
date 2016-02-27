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

            $scope.clearFilter = function () {
                $scope.response = {};
                $scope.response.estado = null;
                $scope.response.valor = null;
            };

            $scope.clearFilter();


            $scope.filtraTalleres = function (item) {
                if ($scope.response.estado == null || $scope.response.valor == null) {
                    return true;
                }

                var estad = $scope.response.estado.value;
                var valor = $scope.response.valor.value;

                if (estad == 'No inspeccionado') {
                    return item.n_noinspec > valor;
                } else if (estad == 'Sin documentos') {
                    return item.n_sindoc > valor;
                } else if (estad == 'Sin tiempo estimado') {
                    return item.n_sintiempo > valor;
                } else if (estad == 'En reparacion') {
                    return item.n_enrepara > valor;
                }
            };

            $scope.badgeClass = function (number) {
                if (number > 10) {
                    //return "_badge _badge-assertive";
                    return "";
                } else if (number > 5) {
                    //return "_badge _badge-energized";
                    return "";
                } else {
                    //return "_badge _default";
                    return "";
                }
            };
        }
    );
