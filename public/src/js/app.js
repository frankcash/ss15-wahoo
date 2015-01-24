(function(){
  var app = angular.module('memoreez', ["services", "firebase"]);

  app.controller('EventsCtrl', ['$scope', 'eventsFactory', 'guestFactory', 'memoriesFactory',
                                function($scope, eventsFactory, guestFactory, memoriesFactory){
    $scope.list = eventsFactory.getEvents();
    // get a specific event
    //console.log(eventFactory.getEvent('-JgPDtrYrbLaMcZ61JkH'));
    //eventFactory.delEvent('-JgPTVAXNBh42iNSVoTF');
    //console.log();


    var eID = '-JgRnUudgkBhCQ8q-k8W', gID = '-JgRp0GYPchfJnjtFpTD';
    var x = guestFactory.getGuests(eID);


    x.$loaded().then(function(){
      console.log('Guest has ' + x.length);
      if (x.length == 0 ) {
        guestFactory.addGuest(eID, 'me', 'me@me.com', '111', '1 main', 'msg', '').then(function(data) {
          console.log('.... data: ', data, data.key());
          gID = data.key();
        });
      }
    });

    
    $scope.uploadFile = function(element) {
        $scope.theFile =  element.files[0];
        //scope.progressVisible = false
        console.log('file is here: ', $scope.theFile);
        
        var reader = new FileReader();

        reader.onload = function(readerEvt) {
            var binaryString = readerEvt.target.result;
            $scope.blobFile = btoa(binaryString);
            //console.log($scope.blobFile);
            memoriesFactory.addMemory(eID, gID, $scope.blobFile,'image','this is my awesome', false);
        };

        reader.readAsBinaryString($scope.theFile);
 
    };

    //
    var m = memoriesFactory.getMemories(eID);
        m.$loaded().then(function(){
      console.log('Event has  ' + m.length + " memories");
    })
  }]);

  app.controller('IndexCtrl', ['$scope', 'eventsFactory',  function($scope, eventsFactory){
    /**
    *@summary allows flow control of `tab`/`menu`
    */
    this.view = 1;

    this.isSet = function(checkTab) {
      return this.view === checkTab;
    };

    this.setView = function(setTab) {
      this.view = setTab;
    };



    /**
    *@summary will use ng-click to submit form, gets info from ng-models
    *@param eventName
    *@param orgName organizer's name
    *@param orgEmail organizer's email
    */
    $scope.submitEvent = function(){
      if($scope.eventName == undefined || $scope.orgName == undefined ||
        $scope.orgEmail== undefined){
        $scope.showAlert = true;
        console.log("");
      }else{
        console.log($scope.eventName, $scope.orgName, $scope.orgEmail);
        eventsFactory.addEvent($scope.eventName, $scope.orgName, $scope.orgEmail);

      }


    }


  }]);

  app.directive('myAttendee', function(){
    return{
      restrict: 'E',
      scope: true, // uses prototypical inheritence
      templateUrl: 'src/templates/my-attendee.html'
    }
  });

  app.directive('createEvent', function(){
    return{
      restrict: 'E',
      templateUrl: 'src/templates/create-event.html'
    }
  })

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
