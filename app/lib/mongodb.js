Users = new Meteor.Collection("user");
if (Meteor.isServer) {
    Meteor.publish('userData', function () {
        console.log(newColl.find().fetch());
        return Users.find();
    });
}