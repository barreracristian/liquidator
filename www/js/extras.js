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
            if(input){
                return input.toLowerCase().replace(" ", "");
            }
        }
    })

;


