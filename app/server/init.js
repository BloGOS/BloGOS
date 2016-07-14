Meteor.startup(function () {
  // File upload server
  UploadServer.init({
    tmpDir: process.env.PWD + '/.uploads/tmp',
    uploadDir: process.env.PWD + '/.uploads/'
  });
  ReactiveTable.publish('blocks', function () { return Blocks; }, {});
});