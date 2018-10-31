// Config
const config = require("../truffle");
const dHelper = require('./util');
const {conf, deploy, util} = dHelper;

const accountTypes = util.createAccountTypes();

// Libraries

// Mocks
const StandardTokenMock = artifacts.require("./mock/StandardTokenMock.sol");

// Smart Contracts
const ExternalContract = artifacts.require("./ExternalContract.sol");
const ExternalContractCaller = artifacts.require("./ExternalContractCaller.sol");
const ERC20Caller = artifacts.require("./ERC20Caller.sol");

const contracts = [];

module.exports = function(deployer, network, accounts) {
    util.checkAreEnoughAccounts(accounts);
    accountTypes.addAccount(accounts, 0, 'Owner');

    const owner = accountTypes.getAccountAddress('Owner');

    deploy.initialMessage(network, accountTypes, util);

    return deployer.deploy(
        ExternalContract
    ).then(async () => {
        deploy.addContractInfo(contracts, "ExternalContract", ExternalContract.address);

        await deployer.deploy(ExternalContractCaller, ExternalContract.address);
        deploy.addContractInfo(contracts, "ExternalContractCaller", ExternalContractCaller.address);

        await deployer.deploy(StandardTokenMock, owner, 100000000);
        deploy.addContractInfo(contracts, "StandardTokenMock", StandardTokenMock.address);

        await deployer.deploy(ERC20Caller, StandardTokenMock.address);
        deploy.addContractInfo(contracts, "ERC20Caller", ERC20Caller.address);

        deploy.createJson(conf.deployment.contractsJsonFile.value, contracts);

        return deployer;
    });
};
