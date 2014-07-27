(function(){

angular.module('letsrule-engine',['letsrule-db','ui-devlog','letsrule-models','leaflet-directive'])
.service('engine', ['devlog','Country','leafletData',function($log,Country,leafletData){
  var engine = window.engine = this;

  engine.loadDb = function(db){
    // var q = $q.defer();
    engine.db = db;
    $log.addEvent('Game engine loaded')
    engine.country = new Country(db.data.countries[0]);
    
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



}])


.controller('gameCtrl', ['db','engine','$timeout', function($db,$engine,$timeout){
  $timeout(function(){
    $engine.loadDb($db);
    
  }, 300)
  
  
}])
})()