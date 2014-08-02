(function() {
  var module = angular.module('letsrule-editor', ['leaflet-directive'])
  .service('db', ['$q','$http',function($q, $http){
    this.load = function(db){
        var q = $q.defer();

        $http.get(db)
        .then( 
          function(res){ // success
            q.resolve(res.data);
          },
          function(){ // failed
            q.reject('Failed to load database from ' + db);
          }
        );

        return q.promise;
    }

    this.save = function(data){
      var blob = new Blob([JSON.stringify(data,undefined,2)],{type:'application/json'});
      saveAs(blob, 'data.json');
    }
  }])
  .controller('editorCtrl', ['$scope','db','leafletData' ,function($scope,db,leafletData){

    var drawnItems = new L.FeatureGroup(),
              options = { edit: { featureGroup: drawnItems } },
              drawControl = new L.Control.Draw(options);

    db.load('/components/db/db.json').then(function(data){
      angular.extend($scope,{
        data: data,
        render: function(content){
          $scope.rendering = content;
        },
        save: function(){
          db.save($scope.data);
        },
        rendering: '',
        map: {
          center: { lat:38.34165619279593, lng:24.36767578125,zoom:7},
           controls: {
                    custom: [ drawControl ]
                }
        }
      });
      leafletData.getMap().then(function(map) {
              map.addLayer(drawnItems)

              map.on('draw:created', function (e) {
                var layer = e.layer;
                drawnItems.addLayer(layer);
                console.log(JSON.stringify(layer.toGeoJSON()));
              });
           });
      window.data = $scope.data;
    }, function(err){
      console.log('failed to load db due to ' + err)
    })
    
  }])
})();