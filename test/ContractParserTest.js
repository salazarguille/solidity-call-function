var ExternalContractCaller = artifacts.require("./ExternalContractCaller.sol");
var ExternalContract = artifacts.require("./ExternalContract.sol")

const t = require('./utils/TestUtil').title;
const ContractParser = require('./utils/ContractParser');

/*
 * @title This test defines test units for the ContractParser javascript class.
 *
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 */
contract('ContractParserTest', function(accounts) {

  beforeEach(async function() {
    this.externalContract = await ExternalContract.deployed();
    this.caller = await ExternalContractCaller.deployed();
  })

  it(t('aUser', 'get', 'Should be able to get the hash of a valid function.'), async function() {
    // Setup
    const parser = new ContractParser(ExternalContract.abi);

    // Invocation
    const signature = parser.get('myOtherFunction');

    // Assertions
    assert(signature);
    assert(signature.function);
    assert(signature.signature);
    const myOtherFunctionHashExpected = await this.externalContract.myOtherFunctionHash();
    assert.equal(myOtherFunctionHashExpected, signature.signature.signatureSha3Bytes4);
    assert.equal('myOtherFunction(uint256)', signature.signature.signature);
  });

  it(t('aUser', 'get', 'Should not be able to get the hash of an invalid function.'), async function() {
    // Setup
    const parser = new ContractParser(ExternalContract.abi);

    // Invocation
    const signature = parser.get('myInvalidFunction');

    // Assertions
    assert(!signature);
  });

  it(t('aUser', 'functionsCount', 'Should be able to get total functions count.'), async function() {
    // Setup
    const parser = new ContractParser(ExternalContract.abi);

    // Invocation
    const totalFunctionsResult = parser.functionsCount();

    // Assertions
    assert(totalFunctionsResult);
    // 6 functions = 1 constructor + 1 getter + 4 functions
    assert.equal(6, totalFunctionsResult);
  });

  it(t('aUser', 'filter', 'Should be able to get functions filtering by a function type.'), async function() {
    // Setup
    const parser = new ContractParser(ExternalContract.abi);
    const filterByConstructor = item => item.function.type === 'constructor';

    // Invocation
    const functionsResult = parser.filter(filterByConstructor);

    // Assertions
    assert(functionsResult);
    assert.equal(1, functionsResult.length);
  });

  it(t('aUser', 'filter', 'Should be able to get functions filtering by function stateMutability.'), async function() {
    // Setup
    const parser = new ContractParser(ExternalContract.abi);
    const filterByStateMutability = item => item.function.stateMutability === 'view';

    // Invocation
    const functionsResult = parser.filter(filterByStateMutability);

    // Assertions
    assert(functionsResult);
    assert.equal(1, functionsResult.length);
  });

  it(t('aUser', 'filter', 'Should be able to get functions filtering by function payable.'), async function() {
    // Setup
    const parser = new ContractParser(ExternalContract.abi);
    const filterByPayable = item => item.function.payable;

    // Invocation
    const functionsResult = parser.filter(filterByPayable);

    // Assertions
    assert(functionsResult);
    assert.equal(0, functionsResult.length);
  });
})
