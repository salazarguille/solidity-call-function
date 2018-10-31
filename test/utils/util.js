const _ = require("lodash");
const web3 = require('web3');

const getNameParsers = (type) => {
    const parsers = new Map();
    parsers.set('function', f => {
        return f.name;
    });
    parsers.set('constructor', c => {
        return 'constructor';
    });
    const nameParser = parsers.get(type);
    return _.isUndefined(nameParser) ? (i) => `Parser not found for ${type}.` : nameParser;
};

const parseInputs = (inputs) => {
    let signature = '';
    if(_.isEmpty(inputs)) {
        signature += '()';
    } else {
        let inputSignature = "(";
        inputs.forEach(param => {
            inputSignature += param.type;
            if(inputs.indexOf(param) < inputs.length - 1) {
                inputSignature += ',';
            }
        });
        inputSignature += ')';
        signature += inputSignature; 
    }
    return signature;
};

/*
 * @title TODO Add comments.
 *
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 */
module.exports = {
    parseFunction: function (item) {
        const name = getNameParsers(item.type)(item);
        const inputSignature = parseInputs(item.inputs);

        const functionSignature = name + inputSignature;
        const functionSignatureSha3 = web3.utils.soliditySha3(functionSignature);
        return {
            signature: functionSignature,
            signatureSha3: functionSignatureSha3,
            signatureSha3Bytes4: functionSignatureSha3.toString().substr(0, 10)
        };
    }
}