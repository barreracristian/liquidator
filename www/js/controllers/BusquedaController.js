angular.module('liquidator.controllers.BusquedaController', [])

    .controller('BusquedaController', function ($scope, $ionicPopup, $q, $stateParams, $state, DBService) {

        $scope.busqueda = $stateParams.term.toLowerCase();

        var ps = DBService.getSiniestros();
        var pa = DBService.getAsegurados();
        var pt = DBService.getTalleres();

        $q.all([ps, pa, pt]).then(function (values) {
            var siniestros = values[0];
            var asegurados = values[1];
            var talleres = values[2];

            _.each(siniestros, function (sin) {
                sin.asegurado = _.find(asegurados, {id: sin.asegurado_id});
                sin.taller = _.find(talleres, {sucursales: [{id: sin.sucursal_id}]});
                sin.sucursal = _.find(sin.taller.sucursales, {id: sin.sucursal_id});
            });

            $scope.siniestros = _.filter(siniestros, function(sin){
                return JSON.stringify(sin).toLowerCase().indexOf($scope.busqueda) >= 0;
            });
        });

    });
