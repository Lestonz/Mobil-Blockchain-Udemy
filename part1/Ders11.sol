//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders11 { 
    // if else 

    uint[] internal sayilar;

    // continue
    function forContinueLoop() external {
        for (uint i = 0; i < 15; i++) {
            if (i == 7 || i == 9) {
                continue;
            } else {
                sayilar.push(i);
            }
        }
    } 

    // break
    function forBreakLoop() external {
        for (uint i =0; i < 10; i++) {
            if (i == 6) {
                break;
            } else {
                sayilar.push(i);
            } 
        }
    } 

    // else if
    function kontrol (string memory _kelime) external pure returns (string memory) {
        if(keccak256(bytes(_kelime)) == keccak256(bytes("Kedi"))) {
            return "Tebrikler Dogru Hayvani Buldunuz.";
        } else if (keccak256(bytes(_kelime)) == keccak256(bytes("Kopek"))) {
             return "Tebrikler ikinci Dogru Hayvani Buldunuz.";
        } else {
            return "Tekrar Deneyiniz!";
        }

    }

    function sayiDizisi() external view returns(uint[] memory) {
        return sayilar;
    }
}