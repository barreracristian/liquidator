angular.module('liquidator.controllers.MainController', [])

    .controller('MainController', function ($scope, $ionicPopup, $state) {

        $scope.search = function () {
            // An elaborate, custom popup
            $ionicPopup.prompt({
                title: 'Búsqueda',
                subTitle: 'Ingrese número de siniestro, marca, modelo, rut de asegurado, u otro dato a consultar.',
                inputType: 'text',
                inputPlaceholder: '36234'
            }).then(function (res) {
                if (!angular.isUndefined(res)) {
                    $state.transitionTo('busqueda', {
                        term: res
                    });
                }
            });
        };

        $scope.select = {};
        $scope.select.estados = [{
            value: 'No inspeccionado',
            label: 'No inspeccionado'
        }, {
            value: 'Sin documentos',
            label: 'Sin documentos'
        }, {
            value: 'Sin tiempo estimado',
            label: 'Sin tiempo estimado'
        }, {
            value: 'En reparacion',
            label: 'En reparacion'
        }];

        $scope.select.valores = [{
            value: '0',
            label: '0'
        }, {
            value: '2',
            label: '2'
        }, {
            value: '5',
            label: '5'
        }];

    });
