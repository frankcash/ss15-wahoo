(function(){
  var app = angular.module('memoreez', ["services", "firebase"]);

<<<<<<< HEAD
  app.controller('EventsCtrl', ['$scope', 'eventsFactory', 'guestFactory', function($scope, eventsFactory, guestFactory){
    $scope.list = eventsFactory.getEvents();
    // get a specific event
    //console.log(eventFactory.getEvent('-JgPDtrYrbLaMcZ61JkH'));
    //eventFactory.delEvent('-JgPTVAXNBh42iNSVoTF');
    //console.log(guestFactory.addGuest('-JgPDtrYrbLaMcZ61JkH', 'me', 'me@me.com', '111', '1 main', 'msg', ''));
  
    var x = guestFactory.getGuests('-JgPDtrYrbLaMcZ61JkH');

    x.$loaded().then(function(){
      console.log('Guest has ' + x.length);
    }) 
=======
  app.controller('SpecificEventCtrl', ['$scope', 'eventFactory', 'guestFactory', function($scope, eventFactory, guestFactory){
    $scope.thisEvent = eventFactory.getEvent($scope.eventId);
    $scope.guests = guestFactory.getGuests($scope.eventId);
    console.log($scope.thisEvent);
  }])

  app.controller('EventsCtrl', ['$scope', 'eventFactory', function($scope, eventFactory){
    $scope.list = eventFactory.getEvents();
    // get a specific event
    console.log(eventFactory.getEvent('-JgPDtrYrbLaMcZ61JkH') );
    eventFactory.delEvent('-JgPGMeQZP4hX567XW59');
>>>>>>> 2ebe6bf8c1ee9491154e5272f208d810d0830c6c
  }]);

  app.controller('IndexCtrl', ['$scope', 'eventsFactory',  function($scope, eventsFactory){

    /**
    *@summary will use ng-click to submit form, gets info from ng-models
    *@param eventName
    *@param orgName organizer's name
    *@param orgEmail organizer's email
    */
    $scope.submitEvent = function(){
      console.log('----', eventFactory);
      eventsFactory.addEvent($scope.eventName, $scope.orgName, $scope.orgEmail);

      console.log("event name:", $scope.eventName);
      console.log("organizer's name:", $scope.orgName);
      console.log("organizer's email:", $scope.orgEmail);

    }


  }]);

  // TODO: create directive for showing specific user's information
  app.directive('allGuests', function(){
    return{
      restrict: 'E',
      scope: true,
      templateUrl : 'src/templates/all-guests.html'
    }
  })
  app.directive('specificEvent', function(){
    return{
      restrict: 'E',
      scope: {
        eventId : '=info' // allows passing of eventId
      },
      templateUrl: 'src/templates/specific-event.html'
    }
  });

  app.directive('myAttendee', function(){
    return{
      restrict: 'E',
      scope: true, // uses prototypical inheritence
      templateUrl: 'src/templates/my-attendee.html'
    }
  });

  app.directive('allEvents', function(){
    return{
      restrict: 'E',
      scope: true,
      templateUrl: 'src/templates/all-events.html'
    }
  });

    app.directive('myMenu', function(){
    return{
      restrict: 'E',
      scope: true,
      templateUrl: 'src/templates/my-menu.html'
    }
  });
})();
