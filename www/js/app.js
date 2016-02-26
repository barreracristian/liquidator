var app = angular.module('liquidator', [
    'liquidator.services',
    'ionic',
    'ngCordova',
    'liquidator.controllers.BusquedaController',
    'liquidator.controllers.CarController',
    'liquidator.controllers.MainController',
    'liquidator.controllers.SiniestroController',
    'liquidator.controllers.SucursalController',
    'liquidator.controllers.TalleresController',
    'liquidator.services.DBService',
    'liquidator.extras',
]);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }
        if (window.StatusBar) {
            //StatusBar.styleDefault();
            window.StatusBar.styleLightContent();
        }
    });
});

app.config(function($compileProvider) {
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|geo|maps|tel):/);
});

app.config(function($stateProvider, $urlRouterProvider) {

    // Ionic uses AngularUI Router which uses the concept of states
    // Learn more here: https://github.com/angular-ui/ui-router
    // Set up the various states which the app can be in.
    // Each state's controller can be found in controllers.js
    $stateProvider
        .state('talleres', {
            url: '/talleres',
            templateUrl: 'templates/talleres.html',
            controller: 'TalleresController'
        })
        .state('sucursal', {
            url: '/sucursal/:sucursal_id',
            templateUrl: 'templates/sucursal.html',
            controller: 'SucursalController'
        })
        .state('siniestro', {
            url: '/siniestro/:siniestro_id',
            templateUrl: 'templates/siniestro.html',
            controller: 'SiniestroController',
            cache: false
        })
        .state('busqueda', {
            url: '/busqueda/:term',
            templateUrl: 'templates/busqueda.html',
            controller: 'BusquedaController'
        })
        .state('car', {
            url: '/car/:siniestro_id',
            templateUrl: 'templates/car.html',
            controller: 'CarController',
            cache: false
        });

    $urlRouterProvider.otherwise("/talleres");
});
