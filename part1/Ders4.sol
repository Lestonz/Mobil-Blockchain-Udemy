//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders4 { 
    // struct: Solidity dilinde yapıları tanımlamak için kullanılan bir veri tipidir. 
    // Bir struct, farklı veri tiplerinden oluşan bir veri yapısını temsil eder.

    struct Insan {
        string adi;
        uint256 yasi;
        address cuzdanAdresi;
    }

    Insan public kullanici;

    function kullaniciYarat(string memory _adi, uint256 _yasi, address _cuzdan) public {
        kullanici = Insan(_adi, _yasi, _cuzdan);
    }


}