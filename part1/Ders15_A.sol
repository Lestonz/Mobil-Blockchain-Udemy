//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders15_A {
    uint256 public total;

    function sayiToplama(uint256 _sayi1, uint256 _sayi2) external virtual {
        total = _sayi1 + _sayi2;
    }

    function sayiCarpma(uint256 _sayi1, uint256 _sayi2) external {
        total = _sayi1 * _sayi2;
    }

    function sayiCikarma(uint256 _sayi1, uint256 _sayi2) external {
        total = _sayi1 - _sayi2;
    }

    function sayiBolme(uint256 _sayi1, uint256 _sayi2) external {
        total = _sayi1 / _sayi2;
    }
}