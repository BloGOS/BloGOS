accountsUIBootstrap3.setLanguage('ko');

if (Meteor.isClient) {
    // This code is executed on the client only
    Accounts.ui.config({
        passwordSignupFields: "USERNAME_ONLY"
    });
}

Accounts.ui.config({
    extraSignupFields: [{
        fieldName: "i_no",
        fieldLabel: "기관코드",
        inputType: 'select',
        data: [
            {
                id: 1,
                label: "해외 오픈마켓",
                value: 1
            }, {
                id: 2,
                label: "해외 PG사",
                value: 2
            }, {
                id: 3,
                label: "정부기관",
                value: 3
            }, {
                id: 4,
                label: "기업",
                value: 4
            }
        ]
    },
        {
            fieldName: "b_no",
            fieldLabel: "사업자번호",
            inputType: 'text'
        }]
});