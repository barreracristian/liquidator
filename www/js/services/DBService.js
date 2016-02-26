angular.module('liquidator.services.DBService', [])

    .factory('DBService', function ($q, $timeout, $http) {

        var siniestros = {};

        return {

            getTalleres: function () {
                var p = $q.defer();

                $http.get(URL + "/talleresplus").then(
                    function (data) {
                        console.log("------------------ data = " + JSON.stringify(data));
                        p.resolve(data.data);
                    },
                    function (data, status, headers, config) {
                        console.log("ERROR getTalleres status = " + status + " " + JSON.stringify(data));
                    }
                );

                return p.promise;
            },

            getSucursal: function (sucursalId) {
                var p = $q.defer();

                $http.get(URL + "/sucursalplus?id=" + sucursalId).error(function (data, status, headers, config) {
                    alert("ALERTA SUCURSALES " + status);
                }).success(function (data) {
                    //alert(JSON.stringify(data));
                    p.resolve(data);
                });

                return p.promise;
            },

            getSiniestro: function (siniestroId) {
                var p = $q.defer();

                if (siniestros[siniestroId]) {
                    p.resolve(siniestros[siniestroId]);
                } else {
                    $http.get(URL + "/siniestroplus?id=" + siniestroId).error(function (data, status, headers, config) {
                        alert("ALERTA SINIESTRO " + status);
                    }).success(function (siniestro) {
                        /*
                         fotos.inspeccion
                         fotos.constancia
                         fotos.padron
                         fotos.licencia
                         fotos.libres = [];
                         */

                        siniestro.fotos = {};
                        siniestro.fotos.libres = [];

                        siniestros[siniestro.id] = siniestro;

                        p.resolve(siniestro);
                    });
                }

                return p.promise;
            },

            busquedaSiniestros: function (term) {
                var p = $q.defer();

                $http.get(URL + "/busqueda?term=" + term).error(function (data, status, headers, config) {
                    alert("ALERTA BUSQUEDA " + status);
                }).success(function (data) {
                    //alert(JSON.stringify(data));
                    p.resolve(data);
                });
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

                if (what == 'libre') {
                    siniestros[sinId].fotos.libres.push(img);
                } else {
                    siniestros[sinId].fotos[what] = img;
                }

                p.resolve(img);

                return p.promise;
            }

        }
    });
