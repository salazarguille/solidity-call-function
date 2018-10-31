const { createItem, createItemDefault } = require('./conf/commonUtil');
const defaultConf = require('./conf/defaultConf');

/*
 *
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 * 
 */
module.exports = {
    deployment: {
        mnemonic: createItem('MNEMONIC_KEY', 'Mnemonic (12 words) to generate the address list.'),
        addressCount: createItemDefault('ADDRESS_COUNT_KEY', defaultConf.DEFAULT_ADDRESS_COUNT, 'Number of accounts the app needs to be deployed.'),
        infuraKey: createItem('INFURA_KEY', 'Infura key for deployment.'),
        gasWei: createItemDefault('GAS_WEI_KEY', defaultConf.DEFAULT_GAS_WEI, 'Gas limit used for deploys. Default is 4712388.'),
        gasPriceGwei: createItemDefault('GAS_PRICE_GWEI_KEY', defaultConf.DEFAULT_GAS_GWEI_PRICE, 'Gas price used for deploys. Default is 100000000000 (100 Shannon).'),
        addressIndexForDeploying: createItemDefault('ADDRESS_INDEX_FOR_DEPLOYING', defaultConf.DEFAULT_ADDRESS_INDEX_FOR_DEPLOYING, 'The account index for deploying the smart contracts. By default it is 0.'),
        networksForMocks: createItemDefault('NETWORKS_FOR_MOCKING', defaultConf.DEFAULT_NETWORKS_FOR_MOCKING, 'The networks where the processes will deploy mock smart contracts. By default the networks are "test", and "_development".'),
        contractsJsonFile: createItemDefault('CONTRACTS_JSON_FILE', defaultConf.DEFAULT_CONTRACTS_JSON_FILE, 'The filename to be created with all smart contract addresses after deploy them in a network. By default is "./build/contracts.json".')
    },
    oraclize: {},
    development: {}
}