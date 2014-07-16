

 var app = angular.module("lets-rule", ["leaflet-directive","Time"]);
        app.controller("mapCtrl", [ "$scope", "leafletData", "leafletBoundsHelpers","$http", function($scope, leafletData, leafletBoundsHelpers, $http) {
          

            var bounds = leafletBoundsHelpers.createBoundsFromArray([
                [ 25.958044673317843, -4.833984374999999 ],
                [ 56.31653672211301, 36.25488281249999 ]
            ]);
            var maxbounds = {
                  southWest:{lat:32.45415593941475,lng:13.831787109375},
                  northEast:{lat:61.23853141060282,lng:-2.7575683593749996}
                }

            angular.extend($scope, {
                bounds: bounds,
                //maxbounds: maxbounds,
                center: { lat:38.34165619279593, lng:24.36767578125,zoom:7},
                defaults: {
                  tileLayer: 'tiles/{z}/{x}/{y}.png',
                  tileLayerOptions: {
                    continuousWorld: false
                  },
                  maxZoom: 9,
                  minZoom: 7,
                  zoomControl: false,
                  attributionControl: false,
                  continuousWorld: false
                }
            });

            $scope.$on("leafletDirectiveMap.geojsonMouseover", function(ev, leafletEvent) {
                countryMouseover(leafletEvent);
            });

            $scope.$on("leafletDirectiveMap.geojsonClick", function(ev, featureSelected, leafletEvent) {
                countryClick(featureSelected, leafletEvent);
            });

            function countryClick(country, event) {
                console.log(country.properties.name);
            };

            function countryMouseover(leafletEvent) {
                var layer = leafletEvent.target;
                layer.setStyle({
                    weight: 2,
                    color: '#666',
                    fillColor: 'blue',
                    opacity:1,
                    fillOpacity:0.2
                });
                layer.bringToFront();
            };

            function style(feature) {
                return {
                    fillColor: 'blue',
                    weight: 2,
                    opacity: 0,
                    color: '#222',
                    dashArray: '3',
                    fillOpacity: 0
                };
            };

            // Put the countries on an associative array
                $scope.countries = {};
                for (var i=0; i< data.features.length; i++) {
                    var country = data.features[i];
                    $scope.countries[country.properties.id] = country;
                }

                // Get the countries geojson data from a JSON
                
                    angular.extend($scope, {
                        geojson: {
                            data: data,
                            style: style,
                            resetStyleOnMouseout: true
                        }
                    });
            

        }]);