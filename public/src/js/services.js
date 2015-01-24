angular.module('services', [])
  .factory('eventsFactory', ["$firebase", function ($firebase) {
        var fr = new Firebase('https://flickering-fire-6622.firebaseio.com/events');

        return {
            getEvents: function() {
                return $firebase(fr).$asArray();
            },
            addEvent: function(eName, oName, oEmail) {
                var e = {eventName: eName, orgName: oName, OrgEmail:oEmail };
                $firebase(fr).$asArray().$add(e);
            },
            getEvent: function getEvent(id){
                return $firebase(fr.child(id)).$asObject();
            },
            delEvent: function(id) {
                fr.child(id).remove();
            }
        };
    }]).factory('memoriesFactory', ["$firebase", function($firebase){
        var fr = new Firebase('https://flickering-fire-6622.firebaseio.com/events');
        
        return {
            addMemory: function(eventId, guestId, blobUrl, blobType, msg) {
                var m = {"guestId": guestId, timestamp: (new Date()).getTime(), message: msg, "type": blobType };
                // TODO transloadit to something 
                $firebase(fr.child(eventId).child('memories')).$asArray().$add(m);   
            }
        }
    }])
    .factory('guestFactory', ["$firebase", function ($firebase) {
      var fr = new Firebase('https://flickering-fire-6622.firebaseio.com/events');


      return {
        getGuests: function(id) {
            // id is the event ID
          return $firebase(fr.child(id).child('guests')).$asArray();
        },
        addGuest: function(id, guestName, guestEmail, guestPhone, guestAddress, guestMessage, guestImage) {
             // id is the event ID
          var e = {name: guestName, email: guestEmail, phone:guestPhone, address: guestAddress, message: guestMessage, image: guestImage};
          $firebase(fr.child(id).child('guests')).$asArray().$add(e);
        },
        delGuest: function(id, guestId) {
             // id is the event ID
            fr.child(id).child('guests').child(guestId).remove();
        },
        getGuest: function (id, guestId) {
             // id is the event ID
            return $firebase(fr.child(id).child('guests').child(guestId)).$asObject();
        }
      };
    }]);
