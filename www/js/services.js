var module = angular.module('liquidator.services', []);

//var URL = "http://52.27.219.34:9000";
var URL = "http://localhost:9000";
//var URL = "http://192.168.0.103:9000";
//var URL = "http://192.168.0.107:9000";



module.factory('Camera', function ($q, $cordovaCamera) {

    return {
        getPicture: function () {
            var q = $q.defer();

            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL, //FILE_URI,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: false,
                encodingType: Camera.EncodingType.JPEG,
                //targetWidth: 100,
                //targetHeight: 100,
                correctOrientation: true,
                saveToPhotoAlbum: true,
                popoverOptions: CameraPopoverOptions
            };

            $cordovaCamera.getPicture(options).then(
                function (imageData) {
                    // Do any magic you need
                    q.resolve(imageData);

                },
                function (err) {
                    q.reject(err);
                });

            return q.promise;
        }
    }

});