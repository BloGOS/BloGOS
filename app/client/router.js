FlowRouter.route('/', {
    action: function() {
        Session.set('pageId');
    }
});
FlowRouter.route('/main/:main', {
    name: 'main',
    action: function(params) {
        Session.set('main', params.main);
    }
});
FlowRouter.route('/auth/:auth', {
    name: 'auth',
    action: function (params) {
        this.render('auth');
    }
})
