(function(){
var module = angular.module('TimeSvc',[])

  // ====== Calendar Model ========= //

.service('Calendar', 
  [
    '$interval',
    '$rootScope',
    function($interval,$scope){

      var monthlist = this.monthlist = [0,
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];

      var cal = this;
      
      this.timer = null;
      this.hour = 0;
      this.day = 1;
      this.month = 1;
      this.monthEnd = 31;
      this.year = 2015;
      this.events = {
        'year':[],
        'month':[],
        'day':[],
        'hour':[]
      };
      this.clicked = 0;
      this.last = 1;
      this.update = {
        'year': function(){
          $scope.$broadcast('time:Year');
          cal.year += 1;

          for (i=0; i<cal.events.year.length; i++){
            cal.events.year[i]();
          };
        },

        'month': function(){
          $scope.$broadcast('time:Month');
        // set how many days are in each month

          if (cal.month < 12){  //one month passed
            cal.month += 1;
          }
          else {
            cal.month = 1;     
            cal.update.year();    //yearly update
          }

          if (cal.month === 2){
            cal.monthEnd = 28;
          }
          if ([1,3,5,7,8,10,12].indexOf(cal.month) > -1){
            cal.monthEnd = 31;
          }
          if ([4,6,9,11].indexOf(cal.month) > -1){
            cal.monthEnd = 30;
          }

          for (i=0; i<cal.events.month.length; i++){
            cal.events.month[i]();
          }
        },

        'day': function(){
          $scope.$broadcast('time:Day');

          if (cal.day < cal.monthEnd){
            cal.day +=1;  //one day passed

          }
          else {
            cal.day = 1;
            cal.update.month();  //monthly update
          }

          for (i=0; i<cal.events.day.length; i++){
            cal.events.day[i]();
          }
        },

        'hour': function(){
          $scope.$broadcast('time:Hour');

          if (cal.hour < 23){
            cal.hour += 1;    //one hour passed
            
          }

          else {
            cal.hour = 0;
            cal.update.day();  //daily update
            
          }
          for (i=0; i<cal.events.hour.length; i++){
            cal.events.hour[i]();
          }
        }
      };

      this.getDate = function(){
        return [cal.year,monthlist[cal.month],cal.day];
      };
      this.addEvent = function(interval, fn){
        if (cal.events[interval].indexOf(fn) == -1 ){
          cal.events[interval].push(fn);
        } else {
          console.log('Event already exists!')
        }
      };
      this.clearEvent = function(interval, fn){
        if (cal.events[interval].indexOf(fn) !== -1) {
          cal.events[interval].pop(fn);
        } else {
          console.log('Event not found');
        }
      }
      this.startTime = function(speed){
        $interval.cancel(this.timer);
        this.timer = $interval(function(){cal.update.hour()}, speed);   // Start 
      };
      this.stopTime = function(){
      // Stop
        $interval.cancel(this.timer);
      };

      this.buttons = {
        pause: function(){
          cal.stopTime();
          cal.buttons.active = 0;
        },
        play: function(){
          cal.startTime(100);
          cal.buttons.active = 1;
        },
        forward: function(){
          cal.startTime(50);
          cal.buttons.active = 2;
        },
        ff: function(){
          cal.startTime(25);
          cal.buttons.active = 3;
        },
        isSelected: function(button){
          return button === cal.buttons.active;
        },
        active: 0
      };

    }
  ]
)

  // !!!!!!!!!! ^ Calendar Model ^ !!!!!!!!!!!! //

.controller('timeCtrl', function($scope,Calendar){
    angular.extend($scope, {
      $id: 'Time controller',
      time: Calendar
    })  
})

.directive('timeControl', function(){
  return {
    restrict: 'E',
    scope: {},
    controller: 'timeCtrl',
    templateUrl: 'components/time/time.html'
  }
});


})();


