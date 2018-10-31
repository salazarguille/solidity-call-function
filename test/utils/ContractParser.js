const Function = require('./Function');

const getFunctions = (abi) => {
    try {
        return JSON.parse(JSON.stringify(abi));
     } catch (error) {
         throw new Error(`Error parsing ABI: ${error}`);
     }
};

/*
 * @title This class is used to parse the functions in the smart contract ABI, and generate the hash functions.
 * @dev Also this class provides function to filter, get, and count the parsed functions.
 *
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 */
class ContractParser {
    constructor(abi) {
        const functions = getFunctions(abi);
        this.functions = [];
        functions.forEach( item => this.functions.push(new Function(item)));
    }
}

ContractParser.prototype.functionsCount = function() {
    return this.functions.length;
}

ContractParser.prototype.forEach = function(_forEachFunction) {
    this.functions.forEach(_forEachFunction);
}

ContractParser.prototype.filter = function(...predicates) {
    const result = [];
    this.functions.forEach( item => {
        predicates.forEach( predicate => {
            if(predicate(item)) {
                result.push(item);
            }
        });
    });
    return result;
}

ContractParser.prototype.get = function(name) {
    for (const f of this.functions) {
        if(f.hasName(name)) {
            return f;
        }
    };
    return undefined;
}

module.exports = ContractParser;