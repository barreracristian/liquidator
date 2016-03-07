angular.module('liquidator.services.DBService', [])

    .factory('DBService', function ($q, $timeout, $http) {

        //var URL = "http://ec2-52-26-252-211.us-west-2.compute.amazonaws.com:3000/api";
        var URL = "http://localhost:3000/api";
        //var URL = "http://192.168.40.4:3000";

        var siniestros = {};

        return {

            getTalleres: function () {
                var p = $q.defer();

                $http.get(URL + "/talleres").then(
                    function (data) {
                        //console.log("------------------ talleres = " + JSON.stringify(data.data));
                        p.resolve(data.data);
                    },
                    function (data, status, headers, config) {
                        console.log("ERROR getTalleres status = " + status + " " + JSON.stringify(data));
                    }
                );

                return p.promise;
            },

            getSiniestros: function () {
                var p = $q.defer();

                $http.get(URL + "/siniestros").then(
                    function (data) {
                        _.each(data.data, function(sin){
                            sin.fotos = siniestros[sin.id] ? siniestros[sin.id].fotos : undefined;
                        });
                        p.resolve(data.data);
                    },
                    function (data, status, headers, config) {
                        console.log("ERROR getSiniestros status = " + status + " " + JSON.stringify(data));
                    }
                );

                return p.promise;
            },

            getAsegurados: function () {
                var p = $q.defer();

                $http.get(URL + "/asegurados").then(
                    function (data) {
                        //console.log("------------------ asegurados = " + JSON.stringify(data.data));
                        p.resolve(data.data);
                    },
                    function (data, status, headers, config) {
                        console.log("ERROR getAsegurados status = " + status + " " + JSON.stringify(data));
                    }
                );

                return p.promise;
            },

            saveImage: function (sinId, what, img) {
                var p = $q.defer();

                /*
                 fotos.inspeccion
                 fotos.constancia
                 fotos.padron
                 fotos.licencia
                 fotos.libres = [];
                 */

                siniestros[sinId] = siniestros[sinId] || {fotos:{}};

                if(what == 'libres'){
                    siniestros[sinId].fotos[what] = siniestros[sinId].fotos[what] || [];
                    siniestros[sinId].fotos[what].push(img);
                }else{
                    siniestros[sinId].fotos[what] = img;
                }

                p.resolve(img);

                return p.promise;
            }

        }
    });
