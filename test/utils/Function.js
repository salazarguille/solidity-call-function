const {parseFunction} = require('./util');

/*
 * @title This class represents a smart contract function. It calculates the function hash, and signature.
 *
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 */
class Function {
    constructor(item) {
        this.function = item;
        this.signature = parseFunction(item);
    }
}

Function.prototype.do = function(action) {
    action(this.function, this.signature);
}

Function.prototype.hasName = function(name) {
    return this.function.name === name;
}

Function.prototype.hasType = function(type) {
    return this.function.type === type;
}

Function.prototype.getType = function() {
    return this.function.type;
}

Function.prototype.getSignature = function() {
    return this.signature.signature;
}

Function.prototype.getSha3 = function() {
    return this.signature.signatureSha3;
}

Function.prototype.getSha3Bytes4 = function() {
    return this.signature.signatureSha3Bytes4;
}

module.exports = Function;