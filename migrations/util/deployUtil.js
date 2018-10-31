const _ = require('lodash');

/*
 *
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 * 
 */
module.exports = {
    addContractInfo: (contracts, name, address) => {
        console.log(`Deploy contract '${name.padEnd(30)}' at '${address}'.`);
        contracts.push(
            {
                "address": address,
                "contractName": name
            }
        );
    },
    addLibraryInfo: (contracts, name, address) => {
        console.log(`Deploy library '${name.padEnd(30)}' at '${address}'.`);
        contracts.push(
            {
                "address": address,
                "contractName": name
            }
        );
    },
    initialMessage: (network, accounts, util) => {
        const deployMocks = util.isNetworkForMocking(network);
        console.log('\n\n==== Deploy Information: ==============================================================================');
        console.log(`Starting deploy contracts in    '${network}' network.`);
        console.log(`Deploying mock contracts?:                 '${deployMocks}'`);
        console.log('=======================================================================================================\n');
        console.log('\n---- Account Types: ---------------------------------------------------------------------------');
        accounts.forEach((account) => {
            console.log(`Accounts[${account.index}] => Type: ${account.type}          Address: '${account.address}'.`);            
        });
        console.log('-----------------------------------------------------------------------------------------------\n');  
    },
    deployLibraries: async (deployer, contracts, libraries) => {
        for (const index in libraries) {
            const library = libraries[index];
            await deployer.deploy(library.source);
            addLibraryInfo(contracts, library.name, library.source.address);
        }
    },
    createJson: (contractsJson, contracts) => {
        const jsonfile = require('jsonfile');
        try {
            jsonfile.writeFile(contractsJson, contracts, {spaces: 2, EOL: '\r\n'}, function (err) {
                console.log(`\nJSON file created at '${contractsJson}'.`);
                if(!_.isNull(err) && !_.isUndefined(err)) {
                    console.error("Errors: ", err);
                }
            });
        } catch (error) {
            console.error("Error on creating JSON file: ", error);
            throw new Error(error);
        }
    }
}