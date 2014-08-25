(function(){
  angular.module('modules.pool', [])
  .service('Pool', function(){
    function Pool(){
      var arr = [];

      angular.extend(this, {
        getLength: function(){
          return arr.length;
        },
        arr: arr,
        findAll: function(){
          return arr;
        },
        add: function(obj){
          obj.id = arr.length;
          arr.push(obj);
        },
        remove: function(obj){

        },
        find: function (id) {
          var res = arr.filter(function(el){
            return id === el.name;
          });
          if (res.length > 0) {
            return res[0];
          } else {return 'No results'}
        },
        findBy: function (params) {
          if (typeof params === Object) {
            for (var key in params) {

            }
            var res = arr.filter(function(el){
              return
            })
          }
        }
      });

    }
    angular.extend(this, {
      POPS: new Pool(),
      cities:new Pool(),
      regions:new Pool(),
      countries:new Pool(),
      companies:new Pool(),
      products: new Pool(),
      produnits: new Pool()
    });
  })
})();