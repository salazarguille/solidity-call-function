pragma solidity 0.4.24;

/*
 * @title This smart contract calls an ERC20 instance using the call(...) function, and the function hashes.
 *
 * @author Guillermo Salazar <guillesalazar@gmail.com>
 */
contract ERC20Caller {
    /** Libraries */

    /** Fields */

    address public erc20;

    /** Events */


    /** Modifiers */

    /** Functions */
    constructor (address _erc20) public {
        erc20 = _erc20;
    }

    function balanceOf(bytes4 _hash, address owner)
        public
    {
        require(erc20.call(_hash, owner));
    }

    function transfer(bytes4 _hash, address _to, uint _value)
        public
    {
        require(erc20.call(_hash, _to, _value));
    }
}