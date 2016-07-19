import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './check_code.html';

blockChain = new Array();
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
});
if (Meteor.isClient) {
    Template.check_code.helpers({
        fields: function () {
            return ['id', 'b_no', 'code', 'code_date'];
        },
        tableSettings: function () {
            return {
                fields: [
                    { key: 'id', label: '아이디' },
                    { key: 'b_no', label: '사업자번호' },
                    { key: 'code', label: '사유코드' },
                    { key: 'code_date', label: '날짜' }
                ]
            }
        }
    });
    Template.check_code.events({
        'click button'(event, instance) {
            var id = new Array(30);
            var b_no = new Array(30);
            var code = new Array(30);
            var code_date = new Array(30);
            var code_date_tmp = new Array(30);

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
                            code_date_tmp[i] = blockChain[j].split("|")[3];
                        }
                    }
                }
            }

            // Date
            for (var i = 0; i < id.length; i++) {
                if (code_date_tmp[i] != undefined) {
                    var date_tmp = new Date(code_date_tmp[i] * 1000);
                    code_date[i] = date_tmp.getFullYear() + "/" + (date_tmp.getMonth() + 1) + "/" + date_tmp.getDate();
                }
            }

            // insert collection
            for (var i = 0; i < id.length; i++) {
                if (id[i] != undefined)
                    Blocks.insert({ id: id[i], b_no: b_no[i], code: code[i], code_date: code_date[i] });
            }
        }
    });
}

if (Meteor.isServer) {
    //Meteor.call(asyncGetTransactions);
    Meteor.startup(function () {
    });
}