Template.main.helpers({
  'page': function() {
      return Session.get('pageId') || 'popular';
  }
});
