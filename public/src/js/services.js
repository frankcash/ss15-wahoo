angular.module('services', [])
  .factory('eventsFactory', ["$firebase", function ($firebase) {
        var fr = new Firebase('https://radiant-inferno-9428.firebaseio.com/ourevents');

        return {
            getEvents: function() {
                return $firebase(fr).$asArray();
            },
            addEvent: function(eName, oName, oEmail) {
                var e = {eventName: eName, orgName: oName, OrgEmail:oEmail, eTime: (new Date()).getTime() };
                return $firebase(fr).$asArray().$add(e);
            },
            getEvent: function getEvent(id){
                return $firebase(fr.child(id)).$asObject();
            },
            delEvent: function(id) {
                fr.child(id).remove();
            }
        };
    }])
    .factory('memoriesFactory', ["$firebase", function($firebase){
        var fr = new Firebase('https://radiant-inferno-9428.firebaseio.com/memories');

        return {
            addMemory: function(eventId, guestId, theblob, blobType, msg, isPrivate) {
                fr.child(eventId)
                var m = {"guestId": guestId, timestamp: (new Date()).getTime(), message: msg, "type": blobType, "private": isPrivate };
                m.blobFile = theblob;
                $firebase(fr.child(eventId)).$asArray().$add(m);
            },
            getMemoriesWithTime: function(eventId, s, e){
                return $firebase(fr.child(eventId).orderByChild('timestamp').startAt(s).endAt(e)).$asArray();
            },
            getMemories: function(eventId){
                return $firebase(fr.child(eventId).orderByChild('timestamp')).$asArray();
            },
            getMemoriesStart: function(eventId){
                return $firebase(fr.child(eventId).orderByChild('timestamp').limitToFirst(1)).$asArray();
            },
            getMemoriesEnd: function(eventId){
                 return $firebase(fr.child(eventId).orderByChild('timestamp').limitToLast(1)).$asArray();
            }

        }
    }])
    .factory('guestFactory', ["$firebase", function ($firebase) {
      var fr = new Firebase('https://radiant-inferno-9428.firebaseio.com/guests');


      return {
        getGuests: function(id) {
            // id is the event ID
          return $firebase(fr.orderByChild("eventId").equalTo(id)).$asArray();
        },
        addGuest: function(id, guestName, guestEmail, guestPhone, guestAddress, guestMessage, guestImage) {
             // id is the event ID
          var e = {eventId: id, name: guestName, email: guestEmail, phone:guestPhone, address: guestAddress, message: guestMessage, image: guestImage};
          return $firebase(fr).$asArray().$add(e);
          //console.log(g);
        },
        delGuest: function(guestId) {
             // id is the event ID
            fr.child(guestId).remove();
        },
        getGuest: function (guestId) {
             // id is the event ID
            return $firebase(fr.child(guestId)).$asObject();
        }
      };
    }]);
