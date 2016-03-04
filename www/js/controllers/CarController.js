angular.module('liquidator.controllers.CarController', [])

    .controller('CarController', function ($scope, $rootScope, $ionicPopup, $stateParams, $state, DBService) {

        var CTX;
        var COLOR = "#F00";
        var LINE_WIDTH = 5;
        var DESFASE_Y = 50;
        var DESFASE_X = 10;

        var states = [];


        //document.addEventListener("DOMContentLoaded", function(){
        setTimeout(function () {
            $scope.newCanvas();
        }, 1000);
        //},false);

        $scope.newCanvas = function () {
            var canvasWidth = window.innerWidth - 20;
            var canvasHeight = window.innerHeight - 60;

            document.getElementById("content").style.height = canvasHeight;
            var canvas = '<canvas id="canvas" width="' + canvasWidth + '" height="' + canvasHeight + '"></canvas>';
            document.getElementById("content").innerHTML = canvas;

            // setup canvas
            CTX = document.getElementById("canvas").getContext("2d");
            CTX.strokeStyle = COLOR;
            CTX.lineWidth = LINE_WIDTH;

            var img = new Image();
            img.src = "img/auto_v.png";
            img.onload = function () {
                CTX.drawImage(img, 0, 0, canvasWidth, canvasHeight);
            };

            drawTouch();
            drawPointer();
            drawMouse();
        };

        $scope.save = function () {
            console.log("------------------ save");

            var canvas = document.getElementById("canvas");
            var img = canvas.toDataURL("image/png");

            DBService.saveImage($stateParams.siniestro_id, 'inspeccion', img).then(
                function (sucess) {
                    //TODO: $scope.goBack('car', $stateParams.siniestro_id);
                },
                function (err) {
                    console.log("save err = " + err);
                }
            );
        };

        $scope.undo = function(){
            console.log("------------------ undo");
        };

        var drawTouch = function () {
            var start = function (e) {
                CTX.beginPath();
                x = e.changedTouches[0].pageX - DESFASE_X;
                y = e.changedTouches[0].pageY - DESFASE_Y;
                CTX.moveTo(x, y);
            };
            var move = function (e) {
                e.preventDefault();
                x = e.changedTouches[0].pageX - DESFASE_X;
                y = e.changedTouches[0].pageY - DESFASE_Y;
                CTX.lineTo(x, y);
                CTX.stroke();
            };
            document.getElementById("canvas").addEventListener("touchstart", start, false);
            document.getElementById("canvas").addEventListener("touchmove", move, false);
        };

        var drawPointer = function () {
            var start = function (e) {
                e = e.originalEvent;
                CTX.beginPath();
                x = e.pageX - DESFASE_X;
                y = e.pageY - DESFASE_Y;
                CTX.moveTo(x, y);
            };
            var move = function (e) {
                e.preventDefault();
                e = e.originalEvent;
                x = e.pageX - DESFASE_X;
                y = e.pageY - DESFASE_Y;
                CTX.lineTo(x, y);
                CTX.stroke();
            };
            document.getElementById("canvas").addEventListener("MSPointerDown", start, false);
            document.getElementById("canvas").addEventListener("MSPointerMove", move, false);
        };

        var drawMouse = function () {
            var clicked = 0;
            var start = function (e) {
                clicked = 1;
                CTX.beginPath();
                x = e.pageX - DESFASE_X;
                y = e.pageY - DESFASE_Y;
                CTX.moveTo(x, y);
            };
            var move = function (e) {
                if (clicked) {
                    x = e.pageX - DESFASE_X;
                    y = e.pageY - DESFASE_Y;
                    CTX.lineTo(x, y);
                    CTX.stroke();
                }
            };
            var stop = function (e) {
                clicked = 0;
            };
            document.getElementById("canvas").addEventListener("mousedown", start, false);
            document.getElementById("canvas").addEventListener("mousemove", move, false);
            document.addEventListener("mouseup", stop, false);
        };

    });