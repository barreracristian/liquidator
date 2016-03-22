angular.module('liquidator.controllers.SiniestroController', [])

    .controller('SiniestroController', function ($scope, $rootScope, $ionicPopup, $stateParams, $state,
                                                 DBService, CameraService, ComService) {

        $scope.documentos = [
            {name: "Dcto. Constancia Carabineros", id: "constancia"},
            {name: "Dcto. Padron Auto", id: "padron"},
            {name: "Dcto. Licencia de Conducir", id: "licencia"},
        ];

        var sinId = parseInt($stateParams.siniestro_id);

        DBService.getSiniestros().then(function (siniestros) {
            var sin = _.find(siniestros, {id:sinId});
            DBService.getAsegurados().then(function(asegurados){
                sin.asegurado = _.find(asegurados, {id: sin.asegurado_id});
                $scope.siniestro = sin;
            });
        });

        $scope.action = function(which){
            var action = {sinId:sinId, type:which, detail:'not available'};
            ComService.sendAction(action);
        };

        $scope.takePicture = function (what) {
            $scope.action('picture');
            CameraService.getPicture().then(function (imageDATA) {
                var src = "data:image/jpeg;base64," + imageDATA;

                /*
                 if (what == 'libres') {
                 $scope.siniestro.fotos.libres.push(src);
                 } else {
                 $scope.siniestro.fotos[what] = src;
                 }
                 */

                DBService.saveImage($scope.siniestro.id, what, src);

                //$scope.data.imagetaken = imageURI;
            }, function (err) {
                console.log(err);
            });
        };

        $scope.showCar = function (siniestro) {
            $state.go('car', {
                siniestro_id: siniestro.id
            });
        };

    });
