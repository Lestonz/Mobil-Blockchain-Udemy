//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

// inheritance ve import

// virtual override

import "./Ders15_A.sol";

contract Ders15_B is Ders15_A {


    function sayiToplama(uint256 _sayi1, uint256 _sayi2) external override {
        total = (_sayi1 + _sayi2)**2 ;
    }



}