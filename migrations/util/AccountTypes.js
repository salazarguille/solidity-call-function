/*
 * @title This class is defined to help in the smart contract deployment. It defines the role for each address we have in the deployment process.
 * @dev It is needed when your smart contract works with permissions/roles, where only some accounts can invoke/access to specific functions.
 *
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 * 
 */
class AccountTypes {
    constructor() {
        this.accounts = new Map();
    }
}

AccountTypes.prototype.addAccount = function(accounts, index, type) {
    this.accounts.set(
        type.toLowerCase(),
        {
            address: accounts[index],
            index: index,
            type: type.toLowerCase()
        }
    );
}

AccountTypes.prototype.getAccount = function(type) {
    return this.accounts.get(type.toLowerCase());
}

AccountTypes.prototype.getAccountAddress = function(type) {
    const account = this.getAccount(type);
    if(account === undefined) {
        throw new Error(`Account type '${type.toLowerCase()}' not defined.`);
    }
    return account.address;
}

AccountTypes.prototype.hasAccount = function(type) {
    return this.accounts.get(type) !== undefined;
}

AccountTypes.prototype.forEach = function(forEach) {
    return this.accounts.forEach(forEach);
}

module.exports = AccountTypes;