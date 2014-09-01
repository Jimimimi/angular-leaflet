(function(){
// Map module

var module = angular.module('letsrule-map',
  [
    'leaflet-directive'
  ]
)

// Map Controller

.controller('mapCtrl', 
  [ 
    '$scope', 
    'leafletData', 
    'leafletBoundsHelpers',
    '$http', 
    'devlog',
    'engine',

    function($scope, leafletData, leafletBoundsHelpers, $http, $log, $engine) {

      var bounds = leafletBoundsHelpers.createBoundsFromArray([
          [ 25.958044673317843, -4.833984374999999 ],
          [ 56.31653672211301, 36.25488281249999 ]
      ]);
      var maxbounds = {
            southWest:{lat:32.45415593941475,lng:13.831787109375},
            northEast:{lat:61.23853141060282,lng:-2.7575683593749996}
          }

      angular.extend($scope, {
          $id : 'Map controller',
          bounds: bounds,
          //maxbounds: maxbounds,
          center: { lat:38.34165619279593, lng:24.36767578125,zoom:7},
          defaults: {
            //tileLayer: './tiles/{z}/{x}/{y}.png',
            tileLayer: 'http://otile1.mqcdn.com/tiles/1.0.0/osm/{z}/{x}/{y}.png',
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

      $scope.$on('leafletDirectiveMap.geojsonMouseover', function(ev, leafletEvent) {
          regionMouseover(leafletEvent);
      });

      $scope.$on('leafletDirectiveMap.geojsonClick', function(ev, featureSelected, leafletEvent) {
          regionClick(featureSelected, leafletEvent);
          
      });

      function regionClick(feature, event) {
          var region = $engine.search.regionsById(feature.properties.id);
          $log.addEvent(region.name);
          zoomToRegion(event);
      };

      function zoomToRegion(leafletEvent) {
        var layer = leafletEvent.target;
        layer.setStyle({
            weight: 2,
            color: '#666',
            opacity: 1,
            fillColor: 'red',
            fillOpacity: 0.5
          });
        leafletData.getMap().then(function (map) {
          map.fitBounds(layer.getBounds());
          
        });
      };

      function regionMouseover(leafletEvent) {
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

      
      // function setRegions(regions){
      //   regions.data.features.forEach(function(region){
      //     region.properties.population = 0;
      //     region.properties.gdp = 0;
      //   })
      // }

                // Put the countries on an associative array
      // $scope.countries = {};
      //   for (var i=0; i< data.features.length; i++) {
      //     var country = data.features[i];
      //     $scope.countries[country.properties.id] = country;
      // }

                    // Get the countries geojson data from a JSON
                    
      angular.extend($scope, {
          regions: {
              data: data,
              style: style,
              resetStyleOnMouseout: true
          }
      });

      // setRegions($scope.regions);
    }
  ]
);

})();