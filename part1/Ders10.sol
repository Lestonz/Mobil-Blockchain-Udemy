//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders10 { 
    //For Döngüsü

    uint[] internal sayilar;

    function forLoop() external {
        for (uint i = 0; i < 10; i++ ) {
            sayilar.push(i);
        }
    }

    function sayiDizisi() external view returns(uint[] memory) {
        return sayilar;
    }

}