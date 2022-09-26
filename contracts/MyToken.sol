// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";

contract MyToken is Initializable, ERC20Upgradeable, OwnableUpgradeable, UUPSUpgradeable {

    function initialize() initializer public {
        
        __ERC20_init("MyToken", "MTK");
        __Ownable_init();
        // __UUPSUpgradeable_init();

        _mint(msg.sender, 1000 * 10 ** decimals());
        console.log(
            "Token initialed, owner %s.",
            msg.sender
        );
    }

    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
        console.log(
            "Token minted, amount %s.",
            amount
        );
    }

    function _authorizeUpgrade(address newImplementation)
        internal
        onlyOwner
        override
    {}
    
    function version() virtual public pure returns(string memory) {
        return "v1";
    }
}

contract MyTokenV2 is MyToken {
    function version() public pure override returns(string memory) {
        return "v2";
    }
}