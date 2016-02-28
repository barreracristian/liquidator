angular.module('liquidator.controllers.TalleresController', [])

    .controller('TalleresController', function ($scope, $ionicPopup, $timeout, $state, DBService) {

            DBService.getTalleres().then(
                function (talleres) {
                    DBService.getSiniestros().then(function(siniestros){

                        _.each(talleres, function(taller){
                            _.each(taller.sucursales, function(sucursal){
                                sucursal.n_noinspec = _.filter(siniestros, {sucursal_id:sucursal.id, estado:"No inspeccionado"}).length;
                            })
                        });

                        $scope.talleres = talleres;
                    })
                },
                function (error) {
                    console.log(error);
                }
            );

        }
    );
