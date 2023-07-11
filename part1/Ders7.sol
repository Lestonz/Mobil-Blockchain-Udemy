//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders7 {
    // storage: kalıcı verilerin depolandığı bir bellek alanıdır.
    // Storage alanı, Ethereum zincirinde kontrat durumunu temsil eder.
    // Storage alanında tutulan veriler, kontratın durumunu kalıcı olarak etkiler ve zincirde saklanır.
    // Kontratın içindeki değişkenler varsayılan olarak storage alanında tutulur. 
    // storage alanı, genellikle kontratın kalıcı durumu için kullanılır.

    uint256 public sayi = 92;

    function sayiyiDegistir(uint256 _sayi) external {
        sayi = _sayi;
    }


    // memory: Geçici verilerin depolandığı bir bellek alanıdır.
    // Fonksiyon çağrıları sırasında oluşturulan veriler memory alanında tutulur.
    // memory alanı, büyük veri yapılarının geçici olarak işlenmesi veya kopyalanması için kullanılır.
    //Fonksiyon dışında tanımlanan değişkenler memory alanında tutulamaz.

    string public kelime1 = "Merhaba";

    function kelimeleriBirlestir() external view returns( string memory) {
        string memory kelime2 = "Dunya";
    
        string memory birlesikKelime = string(abi.encodePacked(kelime1, " ", kelime2));
        return birlesikKelime;
    }



    // storage pointer: Bunlar geçicidir. Memory gibi düşünülebilir. array, struct yada mapping için kullanılabilir.
    uint256[] internal sayilar = [5,6,7];

    function degistir() external {
        uint256[] storage test = sayilar;
        test[1] = 333;

    }

    function sayiDizisi() external view returns(uint256[] memory) {
        return sayilar;
    }

} 