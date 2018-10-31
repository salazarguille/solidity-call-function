pragma solidity 0.4.24;

/*
 * @title This smart contract is used to invoke the externalContract functions using the hash functions.
 *
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 */
contract ExternalContractCaller {
    /** Libraries */

    /** Fields */
    address public externalContract;

    /** Events */

    /** Modifiers */

    /** Functions */
    constructor (address _externalContract) public {
        externalContract = _externalContract;
    }

    function callFunction(bytes4 _functionSignature)
        public
    {
        require(externalContract.call(_functionSignature));
    }

    function callFunctionUint(bytes4 _functionSignature, uint _value)
        public
    {
        require(externalContract.call(_functionSignature, _value));
    }
}