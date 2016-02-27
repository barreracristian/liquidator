angular.module('liquidator.controllers.SiniestroController', [])

    .controller('SiniestroController', function ($scope, $rootScope, $ionicPopup, $stateParams, $state, DBService, Camera) {

        $scope.documentos = [
            {name:"Dcto. Constancia Carabineros", id:"constancia"},
            {name:"Dcto. Padron Auto", id:"padron"},
            {name:"Dcto. Licencia de Conducir", id:"licencia"},
        ];

        DBService.getSiniestro($stateParams.siniestro_id).then(
            function (siniestro) {
                $scope.siniestro = siniestro;
            },
            function (error) {
                console.log(error);
            }
        );

        $scope.takePicture = function (what) {
            Camera.getPicture().then(function (imageDATA) {
                var src = "data:image/jpeg;base64," + imageDATA;

                /*
                 if (what == 'libre') {
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
