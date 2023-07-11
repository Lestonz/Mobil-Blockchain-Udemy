//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders8 { 
    /*
        enum: Solidity dilinde kullanılan bir veri tipidir ve bir dizi sabit değeri temsil etmek için kullanılır. 
        Bu nedenle, enum kullanırken sadece tanımlanan değerlerden birini seçmek mümkündür.
    */
    //                0,     1,   2,      3,     4
    enum Renkler {Kirmizi, Sari, Mavi, Turuncu, Beyaz}
   
    Renkler internal tercih;

    function birinciTercih(uint8 _index) external {
        tercih = Renkler(_index);
    }

    function ikinciTercih(Renkler _index) external {
        tercih = Renkler(_index);
    }

    function ucuncuTercih() external {
        tercih = Renkler.Mavi;
    }

    function renkDegeri() external view returns(Renkler) {
        return tercih;
    }

}