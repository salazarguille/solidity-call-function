var ExternalContractCaller = artifacts.require("./ExternalContractCaller.sol");
var ExternalContract = artifacts.require("./ExternalContract.sol")

const t = require('./utils/TestUtil').title;
const ContractParser = require('./utils/ContractParser');

const BigNumber = web3.BigNumber
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

/*
 * @title This test defines test units for the ExternalContractCaller smart contract.
 *
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 */
contract('ExternalContractCallerTest', function(accounts) {

  beforeEach(async function() {
    this.externalContractParser = new ContractParser(ExternalContract.abi);
    this.externalContract = await ExternalContract.deployed();
    this.caller = await ExternalContractCaller.deployed();
  })

  it(t('aUser', 'callFunction', 'Should be able to invoke callFunction using myFunction() hash.'), async function() {
    // Setup
    const initialInvocationCount = await this.externalContract.invocationCount();
    const myFunctionHashResult = this.externalContractParser.get("myFunction");
    const signatureSha3Bytes4Result = myFunctionHashResult.signature.signatureSha3Bytes4;

    // Invocation
    await this.caller.callFunction(signatureSha3Bytes4Result);

    // Assertions
    const finalInvocationCount = await this.externalContract.invocationCount();
    finalInvocationCount.should.be.bignumber.equal(new BigNumber(initialInvocationCount.toString()).add(1));
  });

  it(t('aUser', 'callFunction', 'Should not be able to invoke callFunction using an invalid myFunction() hash.', true), async function() {
    // Setup
    const initialInvocationCount = await this.externalContract.invocationCount();
    const signatureSha3Bytes4Result = "a422fa45";

    // Invocation
    try {
      await this.caller.callFunction(signatureSha3Bytes4Result);
      assert(false, "It should have failed because function hash is invalid.");
    } catch (err) {
      // Assertions
      assert(err);
      assert(err.message.includes("revert"));
      const finalInvocationCount = await this.externalContract.invocationCount();
      finalInvocationCount.should.be.bignumber.equal(initialInvocationCount);
    }
  });
})
