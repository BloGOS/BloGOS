Template.insert.events({
    "submit": function(event, template) {
        Meteor.call("addPosts", {
            pageId: Session.get('pageId'),
            message: template.find('#post').value
        }, function (err) {
            if (err) {
                throw(error);
            } else {
                template.find('#post').value = "";
            }
        });
        event.preventDefault();
    }
});