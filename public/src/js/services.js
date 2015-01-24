angular.module('services', []).
    factory('fbFactory', ["$firebase", function ($firebase) {
        var fr = new Firebase('https://flickering-fire-6622.firebaseio.com/events');
        
        return {
            getEvents: function() {
                return $firebase(fr).$asArray();
            },
            addEvent: function(eName, oName, oEmail) {
                var e = {eventName: eName, orgName: oName, OrgEmail:oEmail};
                fr.push(e);
            }
        };
    }
]);