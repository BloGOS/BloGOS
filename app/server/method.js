var blockChain = new Array();
// Async function
var asyncGetTransactions = function () {
  console.log("Started get transactions data");
  setTimeout(function(callback) {

  // Hex to String
  function hex2s(hexx) {
    if (hexx == undefined)
      return 'undefined';
    var hex = hexx.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
      str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
  }

  // CoinStack API
  var accessKey = "8061c671bae4953bc65e7031e676a2";
  var secretKey = "f10de9b10f22087a3bdaf74aafc35d";
  var client = new CoinStack(accessKey, secretKey);
  client.getTransactions("1KGDsKmJo9hMRh53XJLqsGKw23MXfHZWbE", function (err, result) {
    for (var i in result) {
      client.getTransaction(result[i], function (e, r) {
        if (!e) {
          blockChain.push(hex2s(r.outputs[0].data));
        }
      });
    }
    //console.log(result);
    console.log(blockChain[10]);
  });
  }, 3000);
}

Meteor.methods({
  'asyncGetTransactions': function () {
    try {
      console.log("Started parsing");
      var syncGetTransactions = Meteor.wrapAsync(asyncGetTransactions);
      syncGetTransactions();
      console.log("Finishied get transactions data");
      var id = new Array(30);
      var b_no = new Array(30);
      var code = new Array(30);
      var code_date = new Array(30);

      // id: 001, 002, ..., 030
      function leadingZeros(n, digits) {
        var zero = '';
        n = n.toString();
        if (digits > n.length) {
          for (var i = 0; digits - n.length > i; i++) {
            zero += '0';
          }
        }
        return zero + n;
      }
      for (var i = 0; i < 30; i++)
        id[i] = String(leadingZeros(i + 1, 3));

      // parse blockChain
      for (var i = 0; i < id.length; i++) {
        for (var j = 0; j < blockChain.length; j++) {
          if (id[i] == blockChain[j].split("|")[0]) {
            if (blockChain[j].split("|")[1] == 'r') {
              b_no[i] = blockChain[j].split("|")[3];
            }
            if (blockChain[j].split("|")[1] == 'c') {
              code[i] = blockChain[j].split("|")[2];
              code_date[i] = blockChain[j].split("|")[3];
            }
          }
        }
      }

      // insert collection
      for (var i = 0; i < id.length; i++) {
        if (id[i] != undefined)
          Blocks.insert({ id: id[i], b_no: b_no[i], code: code[i], code_date: code_date[i] });
      }
      ReactiveTable.publish('blocks', function () { return Blocks; }, {});
      console.log("Finished parse");
    } catch (e) {
      console.log("async error : " + e);
    }
  },
  "addPosts": function (obj) {
    check(this.userId, String);
    Posts.insert({
      author: {
        _id: this.userId,
        name: Meteor.user().username,
        profile_image: Gravatar.imageUrl(Meteor.user().emails[0].address, { d: "retro" })
      },
      pageId: obj.pageId,
      message: obj.message,
      createdAt: new Date()
    });
  }
});
