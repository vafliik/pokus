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

    .controller('RandCtrl', function ($timeout) {
        var socket = io();

        this.time = 10;

        this.counter = this.time;

        var colors = ['cervena', 'zelena', 'modra', 'oranzova', 'zluta'];

        this.colors = [];

        this.kulickyReady = false;
        this.showKulicky = true;

        this.generateKulicky = function () {
            var obsahujeVsechny = false
            do {

                this.nahodneBarvy = [];

                for (var i = 0; i < 10; i++) {
                    var pridana = false;

                    while (!pridana) {
                        var nahodnaBarva = colors[Math.floor(Math.random() * colors.length)];

                        //pokud byla vylosovana stejna barva jako v minulem "tahu", tak ji neprida
                        if (i == 0 || nahodnaBarva != this.nahodneBarvy[i - 1]) {
                            this.nahodneBarvy.push(nahodnaBarva);
                            pridana = true;
                        }
                    }
                }

                var _this = this;
                //Kontroluje, ze vsechny barvy jsou zastoupeny
                obsahujeVsechny = colors.every(function (barva) {
                    return _this.nahodneBarvy.indexOf(barva) >= 0;
                });

            }
                //generuje, dokud nejsou vsechny barvy zastoupeny
            while (obsahujeVsechny == false);

            this.kulickyReady = true;
        };

        this.generateKulicky();

        this.ukazKulicky = function () {

            this.colors = this.nahodneBarvy;
            console.log(new Date())
            console.log(this.nahodneBarvy)

            socket.emit('kule', this.nahodneBarvy);

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

                    _this.generateKulicky();
                    _this.counter = _this.time;


                }
            };

            $timeout(this.onTimeout, 1000);

        };


    });

