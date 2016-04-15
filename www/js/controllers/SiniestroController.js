angular.module('liquidator.controllers.SiniestroController', [])

    .controller('SiniestroController', function ($scope, $rootScope, $ionicPopup, $stateParams, $state,
                                                 DBService, CameraService, ComService, SynchroService) {

        $scope.documentos = [
            {name: "Dcto. Constancia Carabineros", id: "constancia"},
            {name: "Dcto. Padron Auto", id: "padron"},
            {name: "Dcto. Licencia de Conducir", id: "licencia"},
        ];

        var sinId = parseInt($stateParams.siniestro_id);

        DBService.getSiniestros().then(function (siniestros) {
            var sin = _.find(siniestros, {id: sinId});
            DBService.getAsegurados().then(function (asegurados) {
                sin.asegurado = _.find(asegurados, {id: sin.asegurado_id});
                $scope.siniestro = sin;
            });
        });

        getPhotos();

        $scope.action = function (which) {
            ComService.sendAction(sinId, which);
        };

        document.addEventListener("deviceready", function () {
            console.log("------------------ DEVICE READY");

            $scope.takePicture = function (type) {
                $scope.action('picture');

                CameraService.getPicture($scope.siniestro.id).then(function (imageData) {

                    var photo = getPhotoObj($scope.siniestro.id, type, imageData);
                    SynchroService.save(obj);

                    //$scope.data.imagetaken = imageURI;
                }, function (err) {
                    console.log(err);
                });
            };

        }, false);

        function getPhotoObj(sinId, type, image){
            var obj = {sinId:sinId, type:type, image:image};
            $scope.photos[sinId] = $scope.photos[sinId] || {};
            $scope.photos[sinId][type] = $scope.photos[sinId][type] || [];
            $scope.photos[sinId][type].push(obj);
            return obj;
        }

        function getPhotos() {
            $scope.photos = DBService.getPhotos();

            if (false) {
                getPhotoObj('1512', 'libre', 'http://e03-elmundo.uecdn.es/assets/multimedia/imagenes/2015/11/13/14474300157302.jpg');
                getPhotoObj('1512', 'libre', 'http://los40.com/los40/imagenes/2015/01/13/album/1421169887_726886_1421169997_album_normal.jpg');
                getPhotoObj('1512', 'libre', 'http://los40.com/los40/imagenes/2015/01/13/album/1421169887_726886_1421169998_album_normal.jpg');
                getPhotoObj('1512', 'libre', 'http://los40.com/los40/imagenes/2015/01/13/album/1421169887_726886_1421169999_album_normal.jpg');
                getPhotoObj('1512', 'libre', 'http://los40.com/los40/imagenes/2015/01/13/album/1421169887_726886_1421170058_album_normal.jpg');
                getPhotoObj('1512', 'libre', 'http://los40.com/los40/imagenes/2015/01/13/album/1421169887_726886_1421170066_album_normal.jpg');
            }
        }

        $scope.showCar = function (siniestro) {
            $state.go('car', {
                siniestro_id: siniestro.id
            });
        };

    });
