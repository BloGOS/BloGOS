import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './check_code.html';

var accessKey = "8061c671bae4953bc65e7031e676a2";
var secretKey = "f10de9b10f22087a3bdaf74aafc35d";
var client = new CoinStack(accessKey, secretKey);

function hex2a(hexx) {
    //if (hex == undefined)
    //    return 'undefined';
    var hex = hexx.toString();
    var str = '';
    for (var i = 0; i < hex.length; i += 2)
        str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    return str;
}



client.getTransactions("1KGDsKmJo9hMRh53XJLqsGKw23MXfHZWbE", function (err, result) {
    var blockChain = new Array();
    //console.log("result", result);
    for (var i in result) {
        client.getTransaction(result[i], function (e, r) {
            if (!e) {
                blockChain.push(hex2a(r.outputs[0].data));
                console.log(hex2a(r.outputs[0].data));
            }
        });
    }
    var id = new Array(30);
    var b_no = new Array(30);
    var code = new Array(30);
    var code_date = new Array(30);
    
    id[0] = '001';
    id[1] = '002';
    id[2] = '003';
    id[3] = '004';
    id[4] = '005';
    id[5] = '006';
    id[6] = '007';
    id[7] = '008';
    id[8] = '009';
    id[9] = '010';
    id[10] = '011';
    id[11] = '012';
    id[12] = '013';
    id[13] = '014';
    id[14] = '015';
    id[15] = '016';
    id[16] = '017';
    id[17] = '018';
    id[18] = '019';
    id[19] = '020';
    id[20] = '021';
    id[21] = '022';
    id[22] = '023';
    id[23] = '024';
    id[24] = '025';
    id[25] = '026';
    id[26] = '027';
    id[27] = '028';
    id[28] = '029';
    id[29] = '030';
    console.log("id",id.length);
    console.log("blockChain",blockChain.length);
    for(var i=0; i<blockChain.length; i++) {
        console.log("check0");
        if(blockChain[i].split("|")[0] == id[i]) {
            console.log(blockChain[i]);
            console.log("check1");
            
            if(blockChain[i].split("|")[1] == 'r') {
                console.log("check2");
                b_no[i] = blockChain[i].split("|")[3];
                console.log(b_no[i]);
            }

            if(blockChain[i].split("|")[1] == 'c') {
                code[i] = blockChain[i].split("|")[2];
                code_date[i] = blockChain[i].split("|")[3];
            }
            
        }
    }
    console.log("b_no",b_no);
    console.log("code",code);
    console.log("code_date",code_date);
});
 