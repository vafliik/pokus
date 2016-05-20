'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [])

    .controller('RandCtrl', function($timeout){
        this.time = 10;

        this.counter = this.time;

        var colors = ['cervena', 'zelena', 'modra', 'oranzova', 'zluta'];

        this.colors = [];

        this.kulickyReady = false;
        this.showKulicky = true;

        this.generateKulicky = function() {
            this.randomColors = [];

            for (var i = 0; i < 10; i++) {
                var pridana = false;

                while (!pridana) {
                    var nahodnaBarva = colors[Math.floor(Math.random()*colors.length)];
                    if (i == 0 || nahodnaBarva != this.randomColors[i-1]) {
                        this.randomColors.push(nahodnaBarva);
                        pridana = true;
                    }
                }
            }

            this.kulickyReady = true;
        }

        this.generateKulicky();

        this.doGreeting = function() {

            this.colors = this.randomColors;

            this.showKulicky = true;
            this.kulickyReady = false;

            var _this = this;

            this.onTimeout = function(){
                _this.counter--;
                if (_this.counter > 0) {

                    $timeout(_this.onTimeout,1000);
                }
                else {
                    _this.showKulicky = false;
                    _this.generateKulicky();
                    _this.counter = _this.time;

                }
            };

            $timeout(this.onTimeout,1000);

        };
    });
