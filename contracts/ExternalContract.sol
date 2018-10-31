pragma solidity 0.4.24;

/*
 * @title This contract defines some public functions which will be invoked using the call(...) function and the hash functions.
 * @dev The caller is ExternalContractCaller.sol smart contract.
 *
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 */
contract ExternalContract {
    /** Libraries */

    /** Fields */
    uint public invocationCount;

    /** Events */

    /** Modifiers */

    /** Functions */
    constructor () public {}

    function myFunctionHash()
        public
        pure
        returns (bytes4)
    {
        return bytes4(keccak256("myFunction()"));
    }

    function myFunction()
        public
    {
        invocationCount++;
    }

    function myOtherFunctionHash()
        public
        pure
        returns (bytes4)
    {
        return bytes4(keccak256("myOtherFunction(uint256)"));
    }

    function myOtherFunction(uint _value)
        public
    {
        invocationCount += _value;
    }
}