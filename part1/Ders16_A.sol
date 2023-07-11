
//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./IDers16.sol";

contract Ders16_A {
    uint256 public sayi = 0;

    function sayiDegistir(uint256 _sayi) external {
        sayi = _sayi;
    }
}