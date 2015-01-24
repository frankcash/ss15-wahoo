angular.module('services', [])
  .factory('eventFactory', ["$firebase", function ($firebase) {
        var fr = new Firebase('https://flickering-fire-6622.firebaseio.com/events');

        return {
            getEvents: function() {
                return $firebase(fr).$asArray();
            },
            addEvent: function(eName, oName, oEmail) {
                var e = {eventName: eName, orgName: oName, OrgEmail:oEmail};
                $firebase(fr).$asArray().$add(e);
            },
            getEvent: function(id) {
                return $firebase(fr.child(id)).$asObject();
            },
            delEvent: function(id) {
                fr.child(id).remove();
            }
        };
    }])
    .factory('userFactory', ["$firebase", function ($firebase) {
      var fr = new Firebase('https://flickering-fire-6622.firebaseio.com/events');

      return {
        getUsers: function() {
          return $firebase(fr).$asArray();
        },
        addUser: function(guestName, guestEmail, guestPhone, guestAddress, guestMessage, guestImage) {
          var e = {name: guestName, email: guestEmail, phone:guestPhone, address: guestAddress, message: guestMessage, image: guestImage};
          fr.push(e);
        }, 
      };
    }]);
