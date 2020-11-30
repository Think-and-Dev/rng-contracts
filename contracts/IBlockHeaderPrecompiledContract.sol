// SPDX-License-Identifier: GPL-3.0

pragma solidity ^0.6.6;

interface IBlockHeaderPrecompiledContract {
    function getBitcoinHeader(int256 indexBlock) external view returns (bytes memory coinbase);
}