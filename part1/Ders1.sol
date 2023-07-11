//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract MerhabaLestonz {

    uint256 sayi;

    //Sadece okuma fonksiyonu
    function merhabaLestonz() public pure returns (string memory) {
        return "Merhaba Lestonz";
    } 

    function sayiVer(uint256 _sayi) public {
        sayi = _sayi;
    }

    function sayiOkuma() public view returns (uint256) {
        return sayi;
    }

}