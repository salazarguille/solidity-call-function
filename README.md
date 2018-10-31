## Description

This solidity project shows how can invoke functions in deployed smart contract with the function hash.

The **ContractParser.js** javascript class helps to get the function hashes for a specific ABI.

## Get Started

* Download truffle v4.1.13 or up from [here](https://github.com/trufflesuite/truffle/releases)

```
npm install -g truffle
```
* Execute in the root folder
```
npm install
```
* Execute the test cases executing:
```
truffle test
```
## How do I get set up?

#### Install NPM Dependencies

Run ```npm install``` at the root folder.

#### Working with Truffle

Once you are located at the root folder, you can execute any truffle command, for instance ```truffle compile```.

#### How to run tests

In order to can run the tests with Truffle, execute the below command in your project root folder:

```truffle test```

## Smart Contract Details

### ERC20Caller

#### balanceOf(bytes4 _hash, address owner) public
Calls the ***balanceOf*** function in the ERC20 injected by constructor.

Arguments:

 - _hash function hash to invoke.
 - owner address to get the balance of.

#### function transfer(bytes4 _hash, address _to, uint _value) public
Call the ***transfer*** function in the ERC20 instance injected by constructor.

Arguments:

 - _hash function hash to invoke.
 - _to destination address.
 - _value amount of tokens to be transfered.
 
### ExternalContractCaller

#### function callFunction(bytes4 _functionSignature) public
Call the ***myFunction*** function in the smart contract injected by constructor.

Arguments:
 - _functionSignature function hash to invoke.

#### function callFunctionUint(bytes4 _functionSignature, uint _value) public

Call the ***myOtherFunction*** function in the smart contract injected by constructor.

Arguments:
 - _functionSignature function hash to invoke.
 - _value value to pass in the function to invoke.

### Mocks and Other Smart Contracts

  This project uses some external smart contracts from OpenZeppelin.

 - contracts/interface/ERC20.sol
 - contracts/interface/ERC20Basic.sol
 - contracts/mock/BasicToken.sol
 - contracts/mock/StandardToken.sol
 - contracts/mock/StandardTokenMock.sol
 - contracts/util/SafeMath.sol

 You can take the latest version from the URL below:

https://github.com/OpenZeppelin/openzeppelin-solidity

## Do you want to contact me?

You can send me an email to ```guillesalazar@gmail.com```.