'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])

    .directive('showFocus', function ($timeout) {
        return function (scope, element, attrs) {
            scope.$watch(attrs.showFocus,
                function (newValue) {
                    $timeout(function () {
                        newValue && element[0].focus();
                    });
                }, true);
        };
    })

    .factory('Data', function(){
        return { historie: [] };
    })

    .controller('RandCtrl', function ($timeout, Data) {
        var socket = io();

        this.time = 3;

        this.counter = this.time;

        this.historie = Data.historie

        var colors = ['cervena', 'zelena', 'modra', 'oranzova', 'zluta'];

        this.colors = [];

        this.kulickyReady = false;
        this.showKulicky = true;

        this.generateKulicky = function () {
            this.randomColors = [];

            for (var i = 0; i < 10; i++) {
                var pridana = false;

                while (!pridana) {
                    var nahodnaBarva = colors[Math.floor(Math.random() * colors.length)];
                    if (i == 0 || nahodnaBarva != this.randomColors[i - 1]) {
                        this.randomColors.push(nahodnaBarva);
                        pridana = true;
                    }
                }
            }

            this.kulickyReady = true;
        }

        this.generateKulicky();

        this.ukazKulicky = function () {

            this.colors = this.randomColors;
            socket.emit('kule', this.randomColors);

            this.showKulicky = true;
            this.kulickyReady = false;

            var _this = this;

            this.onTimeout = function () {
                _this.counter--;
                if (_this.counter > 0) {

                    $timeout(_this.onTimeout, 1000);
                }
                else {
                    _this.showKulicky = false;
                    _this.historie.push(_this.randomColors)

                    _this.generateKulicky();
                    _this.counter = _this.time;


                }
            };

            $timeout(this.onTimeout, 1000);

        };
    });

