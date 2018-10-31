const conf = require('./configUtil');
const deploy = require('./deployUtil');
const AccountTypes = require('./AccountTypes');

const util = {
    getAppEnv: () => {
        const appEnv = {};
        for(const item in process.env){
            if(item.indexOf("APP_") === 0) {
                appEnv[item] = process.env[item];
            }
        };
        return appEnv;
    },
    isNetworkForMocking: function(network) {
        return conf.deployment.networksForMocks.value.indexOf(network) >= 0;
    },
    areEnoughAccounts: (accounts) => {
        return accounts.length >= conf.deployment.addressCount.value;
    },
    checkAreEnoughAccounts: (accounts) => {
        const accountsNeeded = conf.deployment.addressCount.value;
        if(!util.areEnoughAccounts(accounts)) {
            throw new Error(`The deployment needs at least ${accountsNeeded} account. Actual accounts ${accounts.length}.`);
        }
    },
    createAccountTypes: () => {
        return new AccountTypes();
    }
};

module.exports = {
    conf: conf,
    deploy: deploy,
    util: util
};
