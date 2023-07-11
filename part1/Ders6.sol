//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders6 {
    // Sabit Boyutlu Diziler (Fixed Array): Sabit boyutlu diziler, önceden belirlenmiş bir boyuta sahip olan dizilerdir. Boyutu oluşturulduktan sonra değiştirilemez.
    string[3] public kelimeler;

    function dizileriEkle() external {
        kelimeler = ["Kedi", "Kopek", "Fil"];
    }
    

    function diziIndexDegeri(uint256 _index) external view returns (string memory) {
        return kelimeler[_index];
    }

    // Dinamik Boyutlu Diziler (Dynamic Array): Dinamik boyutlu diziler, boyutu çalışma zamanında belirlenebilen dizilerdir. Boyutları isteğe bağlı olarak değiştirilebilir.

    uint256 [] internal sayilar = [1, 3, 44];


    // push
    function sayiEkle(uint256 _deger) external {
        sayilar.push(_deger);
    }

    // pop
    function sonDegerSilme() external {
        require(sayilar.length > 0, "Bu Array Bos.");
        sayilar.pop();
    }

    // delete
    function sayiSilme(uint256 _index) external {
        require(sayilar.length > _index, "Bu arrayde bu index numarali deger yoktur.");
        delete sayilar[_index];
    } 

    function sayiDizisi() external view returns (uint256[] memory) {
        return sayilar;
    }

} 