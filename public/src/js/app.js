(function(){
  var app = angular.module('memoreez', ["services", "firebase"]);

  app.controller('EventsCtrl', ['$scope', 'eventFactory', 'guestFactory', function($scope, eventFactory, guestFactory){
    $scope.list = eventFactory.getEvents();
    // get a specific event
    console.log(eventFactory.getEvent('-JgPDtrYrbLaMcZ61JkH'), eventFactory.getGuestCount('-JgPDtrYrbLaMcZ61JkH').length );
    eventFactory.delEvent('-JgPTVAXNBh42iNSVoTF');
    //console.log(guestFactory.addGuest('-JgPDtrYrbLaMcZ61JkH', 'me', 'me@me.com', '111', '1 main', 'msg', ''));
  }]);

  app.controller('IndexCtrl', ['$scope', 'eventFactory',  function($scope, eventFactory){

    /**
    *@summary will use ng-click to submit form, gets info from ng-models
    *@param eventName
    *@param orgName organizer's name
    *@param orgEmail organizer's email
    */
    $scope.submitEvent = function(){
      console.log('----', eventFactory);
      eventFactory.addEvent($scope.eventName, $scope.orgName, $scope.orgEmail);

      console.log("event name:", $scope.eventName);
      console.log("organizer's name:", $scope.orgName);
      console.log("organizer's email:", $scope.orgEmail);
      console.log(eventFactory.getEvents());
      
    }


  }]);



  app.controller('AttendeesCtrl', ['$scope', function($scope){
    $scope.naomi = {
      name: 'Naomi',
      address: '1600 Amphiteather'
    }

    $scope.attendee = [];
    $scope.attendee.push($scope.naomi);
    $scope.attendee.push({name: 'Frank', address:'Foo123'})


    $scope.event=null;

  }]);

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

})();
