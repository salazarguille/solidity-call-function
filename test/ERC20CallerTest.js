const ERC20Caller = artifacts.require("./ERC20Caller.sol");
const StandardTokenMock = artifacts.require("./StandardTokenMock.sol");

const t = require('./utils/TestUtil').title;
const ContractParser = require('./utils/ContractParser');

const BigNumber = web3.BigNumber
const should = require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

/*
 * @title This test defines test units for the ERC20Caller smart contract.
 *
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 */
contract('ERC20CallerTest', function(accounts) {

  const owner = accounts[0];

  beforeEach(async function() {
    this.erc20Parser = new ContractParser(StandardTokenMock.abi);
    this.erc20 = await StandardTokenMock.deployed();
    this.caller = await ERC20Caller.deployed();
  })

  it(t('aUser', 'balanceOf', 'Should be able to invoke balanceOf using hash.'), async function() {
    // Setup
    const initialBalanceOwner = await this.erc20.balanceOf(owner);
    const balanceOfHashSignature = this.erc20Parser.get("balanceOf");
    const balanceOfHashResult = balanceOfHashSignature.signature.signatureSha3Bytes4;

    // Invocation
    const balanceOfOwnerResult = await this.caller.balanceOf(balanceOfHashResult, owner);

    // Assertions
    assert(balanceOfOwnerResult);
  });

  it(t('aUser', 'transfer', 'Should be able to invoke transfer using hash.'), async function() {
    // Setup
    const _to = accounts[1];
    const _value = 1000000;
    await this.erc20.transfer(this.caller.address, _value, {from: owner});

    const initialBalanceTo = await this.erc20.balanceOf(_to);
    const initialBalanceCaller = await this.erc20.balanceOf(this.caller.address);
    const transferHashSignature = this.erc20Parser.get("transfer");
    const transferHashResult = transferHashSignature.signature.signatureSha3Bytes4;

    // Invocation
    await this.caller.transfer(transferHashResult, _to, _value);

    // Assertions
    const finalBalanceCaller = await this.erc20.balanceOf(this.caller.address);
    const finalBalanceTo = await this.erc20.balanceOf(_to);

    finalBalanceTo.should.be.bignumber.equal(new BigNumber(initialBalanceTo).add(_value));
    finalBalanceCaller.should.be.bignumber.equal(new BigNumber(initialBalanceCaller).minus(_value));
  });
})
