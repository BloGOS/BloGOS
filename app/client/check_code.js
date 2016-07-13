import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './check_code.html';

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
    Template.check_code.created = function () {
        Meteor.call('asyncGetTransactions', function (error, result) {
            //Session.set("herokuDashboard_appInfo",result);
        });
    }
}

if (Meteor.isServer) {
    Meteor.startup(function () { 
  // ReactiveTable publish
  
    });
}