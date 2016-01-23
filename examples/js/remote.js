Parse.initialize("hZCMU3Jy9R6SfMqONzRVXQ0u7JXKCEVSkoWe7GMk", "4bhdnwddpjR0yVKzbMYmQpthI0RJlX14QED1YJ9K");

var Friend = function () {
    TruxModel.call(this);
    this.prototype = TruxModel;
};

var Friends = function () {
    TruxCollection.call(this, Friend);
    this.prototype = TruxCollection;

    this.setRequestOptions({
        'headers':{
            'X-Parse-Application-Id':'hZCMU3Jy9R6SfMqONzRVXQ0u7JXKCEVSkoWe7GMk',
            'X-Parse-REST-API-Key':'wTkqGReVql0lwym2vjObCpMElaGn3nK9v4aeSkCp',
            'Content-Type':'application/json',
            'Accept':null,
            'cache-control':null
        }
    });

    this.GET = 'https://api.parse.com/1/classes/Friends';
};

var myFriends = new Friends();

myFriends.request({
    onDone:function () {
        console.log(myFriends);
    }
});
