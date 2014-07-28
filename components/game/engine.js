(function(){

angular.module('letsrule-engine',
  [
  'letsrule-db',
  'ui-devlog',
  'ui-window',
  'letsrule-models',
  'leaflet-directive',
  ]
)
.service('engine', 
  [
  'devlog',
  'Country',
  'leafletData',
  'Pool',
  'windowManager',

  function($log,Country,leafletData,$Pool, $manager){
  var engine = this;
  engine.windowManager = $manager;
  engine.ui = {
    toggle: function(){
     $manager.toggle();
    },
    render: function(data){
      $manager.set('content',data);
    }
  };
  engine.loadDb = function(db){
  
    window.engine = engine;
    engine.db = db;
    $log.addEvent('Game engine loaded')
    engine.country = new Country(db.countries[0]);
    
    var cityLayer = L.layerGroup();
    engine.country.regions.forEach(function(region){
      region.cities.forEach(function(city){
        cityLayer.addLayer(L.marker(city.geo,{name:city.name}));
      })
    })
    cityLayer.eachLayer(function(layer){
      layer.on('click', function(event){
        var city = engine.search.cities(event.target.options.name)
        $log.addEvent('clicked on ' + city.name);
        console.log(city.POPS)
      })
    })
    leafletData.getMap().then(function (map) {
      cityLayer.addTo(map);
    });
  };

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


.controller('gameCtrl', ['$scope','db','engine','devlog', function($scope,$db,$engine,$log){
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