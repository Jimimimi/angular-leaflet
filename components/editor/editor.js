(function() {
  function editorCtrl ($scope,$http,db,leafletData){

    var drawnItems = new L.FeatureGroup(),
              options = { edit: { featureGroup: drawnItems } },
              drawControl = new L.Control.Draw(options),
              geojson;

              $http.get('/components/db/attica-flat.geojson')
                .success(function(data){
                  geojson =  data;
              var geo = L.geoJson(geojson,{
                onEachFeature: function(feature,layer){
                  if(feature.geometry.type=="MultiPolygon"){
                    layer.eachLayer(function(child_layer){
                      drawnItems.addLayer(child_layer);
                    });
                  } else {
                    drawnItems.addLayer(layer);
                  }
                }
              });
              });
              function style(feature) {
          return {
              fillColor: 'blue',
              weight: 2,
              opacity: 1,
              color: '#222',
              dashArray: '3',
              fillOpacity: 1
          };
      };
              
    function productCategories(products){
      var obj = {}, arr=[];
      products.forEach(function(prod){
        if (!obj[prod.category]){
          obj[prod.category] = [];
        }
        obj[prod.category].push(prod);
      });
      for (var cat in obj){
        var name = cat.replace(cat.charAt(0), cat.charAt(0).toUpperCase())
        arr.push({name:name,products:obj[cat]})
      };
      return arr;

    }

    db.load('/components/db/db.json').then(function(data){
      angular.extend($scope,{
        data: data,
        render: function(content){
          $scope.rendering = content;
        },
        save: function(){
          db.save($scope.data);
        },
        create: function(content_type){
          switch(content_type) {
            case 'poptype':
              var data = {},
                  obj = {
                content_type: 'poptype',
                data: data
              };
              if ($scope.data.poptypes){
                $scope.data.poptypes.push(data)
              } else {
                $scope.data.poptypes = [data];
              }
              $scope.render(obj)
              break;
            case 'product':
              var data = {},
                  obj = {
                content_type: 'product',
                data: data
              };
              if ($scope.data.products){
                $scope.data.products.push(data)
              } else {
                $scope.data.products = [data];
              }
              $scope.render(obj)
              break;
            case 'country':
              var data = {},
                  obj = {
                content_type: 'country',
                data: data
              };
              $scope.data.countries.push(data)
              $scope.render(obj)
              break;
          }
        },
        rendering: {
          content_type: 'home'
        },
        map: {
          center: { lat:38.34165619279593, lng:24.36767578125,zoom:7},
          controls: {
            custom: [ drawControl ]
          },
          geo: {
            data:geojson,
            style: style
          }
        }

      });

      leafletData.getMap().then(function(map) {
              map.addLayer(drawnItems)
              //drawnItems.addLayer()
              // map.addLayer($scope.map.geo)
              window.map = map;
              map.on('draw:created', function (e) {
                var layer = e.layer;
                drawnItems.addLayer(layer);
                console.log(JSON.stringify(layer.toGeoJSON()));
              });
              map.on('draw:edited', function (e) {
                var layers = e.layers;
                layers.eachLayer(function (layer) {
                    //do whatever you want, most likely save back to db
                });
              });

           });
      window.data = $scope.data;

      $scope.menu =
        {
          products :productCategories($scope.data.products),
          productContent: function(product){
            var obj = $scope.data.products.filter(function(p){
              return p.name === product
            })[0];
            return obj;
          },
          getUsedBy: function(need){
            var usedBy = [];
            $scope.data.products.forEach(function(product){
              if (product.needs.indexOf(need) !== -1){
                usedBy.push(product);
              }
            })
            return usedBy;
          }
        }
    }, function(err){
      console.log('failed to load db due to ' + err)
    })
    
  };
  

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
      var blob = new Blob([angular.toJson(data,true)],{type:'application/json'});
      saveAs(blob, 'data.json');
    }
  }])
  .controller('editorCtrl', ['$scope','$http','db','leafletData' ,editorCtrl])
.directive('contenteditable', function() {
  return {
    require: 'ngModel',
    scope: true,
    link: function(scope, elm, attrs, ctrl) {
      // view -> model
      elm.on('blur', function() {
        scope.$apply(function() {
          ctrl.$setViewValue(elm.html());
        });
      });

      // model -> view
      ctrl.$render = function() {
        elm.html(ctrl.$viewValue);
      };

      // load init value from DOM
      // ctrl.$setViewValue(elm.html());
    }
  };
})
.directive('myMenu', function(){
  return {
    scope: true,
    restrict: 'E',
    templateUrl: '/components/editor/navbar.html',
    link: function(scope,element){

    }
  }
})
.directive('repeat', function() {
  return function(scope, element, attrs) {
    if (scope.$last){
      $('#main-menu').metisMenu();
    }
  };
})
;
})();