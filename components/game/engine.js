(function(){

angular.module('letsrule-engine',['letsrule-db','ui-devlog','letsrule-models','leaflet-directive'])
.service('engine', ['devlog','Country','leafletData',function($log,Country,leafletData){
  var engine = this;

  engine.loadDb = function(db){
    // var q = $q.defer();
    window.engine = engine;
    engine.db = db;
    $log.addEvent('Game engine loaded')
    engine.country = new Country(db.countries[0]);
    
    var cityLayer = L.layerGroup();
    engine.country.regions.forEach(function(region){
      region.cities.forEach(function(city){
        cityLayer.addLayer(L.marker(city.geo));
      })
    })

    leafletData.getMap().then(function (map) {
      cityLayer.addTo(map);
    });
  };

  engine.regions = function(q){
    return engine.country.regions.filter(function(region){
      return region.name === q
    })[0];
  };
  engine.regionsById = function(q){
    return engine.country.regions.filter(function(region){
      return region.id === q
    })[0];
  }



}])


.controller('gameCtrl', ['db','engine','devlog', function($db,$engine,$log){
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