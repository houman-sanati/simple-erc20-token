// SPDX-License-Identifier: MIT
pragma solidity 0.8.15;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    uint256 totalSupply_;

    constructor(
        string memory name__,
        string memory symbol__,
        uint256 total,
        uint256 ownerInitialBalance
    ) ERC20(name__, symbol__) {
        totalSupply_ = total;
        _mint(msg.sender, ownerInitialBalance);
    }

    function totalSupply() public view virtual override returns (uint256) {
        return totalSupply_;
    }
}
