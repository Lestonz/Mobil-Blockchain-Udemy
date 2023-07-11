//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders12 { 
    // Modifiers ve Constructor

    // owner = kontrat sahibi yada ilk kontratı basan kişi
    address public owner;

    string public mesaj;

    constructor() {
        owner = msg.sender;
        mesaj = "Merhaba Lestonz!";
    }

    modifier sadeceKontratSahibi() {
        require(msg.sender == owner, "Sadece sozlesmenin sahibi erisebilir.");
        _;
    }

    function sahibiDegistir (address _newOwner) external sadeceKontratSahibi {
        owner = _newOwner;
    }

}