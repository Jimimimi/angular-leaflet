(function(){

angular.module('letsrule-engine',
  [
  'letsrule-db',
  'ui-devlog',
  'ui-window',
  'ui-menu',
  'ui-profile',
  'letsrule-models',
  'leaflet-directive',
  'pop-module',
  'city-module',
  'models-company'
  ]
)
.service('engine', 
  [
  'devlog',
  'Country',
  'leafletData',
  'Pool',
  'windowManager',
  '$rootScope',
  'Company',

  function($log,Country,leafletData,$Pool, $manager,$rootScope, Company){
  var engine = this;
  engine.windowManager = $manager;
  engine.ui = {
    toggle: function(){
     $manager.toggle();
    },
    render: function(data){
      $manager.setContent(data);
    }
  };
  engine.loadDb = function(db){
  
    window.engine = engine;
    engine.db = db;
    $log.addEvent('Game engine loaded');
    engine.country = new Country(db.countries[0]);
    
    // ========== cities -- should move to Map.js

    var cityIcons = {
          large: L.icon({
            iconUrl: './js/images/city_l.png',
            shadowUrl: './js/images/marker-shadow.png',
            iconSize:     [35, 42], // size of the icon
            shadowSize:   [43, 40], // size of the shadow
            iconAnchor:   [17, 40], // point of the icon which will correspond to marker's location
            shadowAnchor: [10, 35],  // the same for the shadow
            popupAnchor:  [0, -38] // point from which the popup should open relative to the iconAnchor
          }),
          small: L.icon({
            iconUrl: './js/images/city_s.png',
            shadowUrl: './js/images/marker-shadow.png',
            iconSize:     [35, 42], // size of the icon
            shadowSize:   [43, 40], // size of the shadow
            iconAnchor:   [17, 40], // point of the icon which will correspond to marker's location
            shadowAnchor: [10, 35],  // the same for the shadow
            popupAnchor:  [0, -32] // point from which the popup should open relative to the iconAnchor
          })
        };

        function checkCitySize(city){
          if (city.properties.population < 30000) {
            return {icon:cityIcons.small}
          }
          else {return {icon:cityIcons.large}}
        }

    var cityLayer = L.layerGroup();


    engine.country.regions.forEach(function(region){
      region.cities.forEach(function(city){

        $rootScope.$on('time:Day', function(){
          city.POPS.forEach(function(pop){
            pop.grow();
          })
        });
        if (city.getPopulation() < 1000) {
          city.options = {icon: cityIcons.small};
        }
        if (city.getPopulation() > 1000) {
          city.options = {icon: cityIcons.large};
        }

        cityLayer.addLayer(L.marker(city.geo,{name:city.name, icon: city.options.icon}));
      })
    });

    cityLayer.eachLayer(function(layer){
      layer.on('click', function(event){
        var city = engine.search.cities(event.target.options.name);
        $log.addEvent('clicked on ' + city.name);
        $manager.setContent({
          content_type: 'city',
          data: city
        });
        $manager.open();
      })
    });
    leafletData.getMap().then(function (map) {
      cityLayer.addTo(map);
    });
  };
  // ========== cities -- should move to Map.js

  // engine.;
  // engine.regionsById = function(q){
  //   return engine.country.regions.filter(function(region){
  //     return region.id === q
  //   })[0];
  // };

  engine.search = {

    regionsById: function(q){
      return engine.country.regions.filter(function(region){
        return region.id === q
      })[0];
    },
    regions: function(q){
      return engine.country.regions.filter(function(region){
        return region.name === q
      })[0];
    },
    cities: function(q){
      var found = false;
      var obj;
      engine.country.regions.forEach(function(region){
        region.cities.forEach(function(city){
          if (city.name === q){
            found = true;
            obj = city;
          }
        })
      });
      if (!found){
        console.log('No cities named',q,'found in the database')
      } else {
        return obj
      }
    },
    pool: $Pool


  };


  engine.render = {

  };



}])


.controller('gameEngineCtrl', ['$scope','db','engine','devlog', function($scope,$db,$engine,$log){
  $scope.$id = 'Game engine';
  $db.load('components/db/db.json')
  .then(
    function(data){
      $log.addEvent('Data loaded correctly');
      $engine.loadDb(data);
    },
    function(err){
      $log.addEvent(err)
    }
  )
  
  // if (db !== null){
  //   $engine.loadDb(db);
  // }
  
  
}])
})()