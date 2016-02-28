angular.module('liquidator.extras', [])

    .filter('capitalize', function () {
        return function (input, scope) {
            if (angular.isUndefined(input)) {
                return "undefined";
            }
            return input.replace(/\w\S*/g, function (input) {
                if (input.length == 1) {
                    return input.charAt(0).toLowerCase();
                } else {
                    return input.charAt(0).toUpperCase() + input.substr(1).toLowerCase();
                }
            });
        };
    })

    .filter('imagename', function () {
        return function (input, scope) {
            if (input) {
                return input.toLowerCase().replace(" ", "");
            }
        }
    })

    .filter('filtraTalleres', function () {
        return function (input, scope) {
            if (input) {
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
            }
        }
    })

    .filter('filtraSiniestros', function () {
        return function (input, scope) {
            if (input) {
                return siniestro.estado == $scope.response.estado.value;
            }
        }
    })

;


