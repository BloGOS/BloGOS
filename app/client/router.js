FlowRouter.route('/', {
    action: function (params) { 
        BlazeLayout.render("main", {content: "main"});
    }
});
FlowRouter.route('/auth', {
    action: function (params) { 
        BlazeLayout.render("auth", {content: "auth"});
    }
});
FlowRouter.route('/check_code', {
    action: function (params) { 
        BlazeLayout.render("check_code", {content: "check_code"});
    }
});
FlowRouter.route('/check_pay', {
    action: function (params) { 
        BlazeLayout.render("check_pay", {content: "check_pay"});
    }
});
FlowRouter.route('/insert', {
    action: function (params) { 
        BlazeLayout.render("insert", {content: "insert"});
    }
});
FlowRouter.route('/fileUpload', {
    action: function (params) {
	this.render("insert", {content: "insert"});
    }
});








