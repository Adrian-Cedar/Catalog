var app = angular.module('d3mapping', [])

//Controller inherits index.js scope
app.controller('mapController', ['$scope', '$window', '$location', function ($scope, $window, $location) {

  //Get URI Query string
  var getQueryVariable = function (variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
  }

  $scope.$watch('entries',function( entries ){
    var test = new marker( $scope.map1.studio.building,1);
    for ( i in entries ){
      if ( entries[i].type =='Studio' ){
        if ( entries[i].metadata ){
          $scope.map1.studio.draw( JSON.parse( entries[i].metadata))
        }
      }
    }
    //When studio is clicked, highlight object
    $scope.map1.studio.onClick(function(id){
      $scope.selectedObject = $scope.entries[id];
      $scope.onSelect($scope.entries[id], $scope.entries[id].type.toLowerCase());
      $scope.$apply();
    });
  })

  //Resize map objects on window resize
  angular.element($window).bind('resize', function () {
    $scope.map1.resize();
    // manuall $digest required as resize event is outside of angular
    $scope.$digest();
  })
}])
