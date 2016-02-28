angular.module('liquidator.controllers.SucursalController', [])

    .controller('SucursalController', function ($scope, $ionicPopup, $stateParams, $state, DBService) {

            var sucId = parseInt($stateParams.sucursal_id);

            DBService.getTalleres().then(function (talleres) {
                $scope.taller = _.find(talleres, {sucursales: [{id: sucId}]});
                //console.log("------------------ taller = " + JSON.stringify($scope.taller));
                var suc = _.find($scope.taller.sucursales, {id: sucId});

                DBService.getSiniestros().then(function (siniestros) {
                    suc.siniestros = _.filter(siniestros, {sucursal_id: sucId});

                    DBService.getAsegurados().then(function (asegurados) {
                        _.each(suc.siniestros, function (siniestro) {
                            siniestro.asegurado = _.find(asegurados, {id:siniestro.asegurado_id});
                        });
                        //console.log("------------------ suc = " + JSON.stringify(suc));
                        $scope.sucursal = suc;
                    });
                });
            });

        }
    );
