//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders3 {
    // bool: Mantıksal değeri temsil eden bir veri tipidir. Değerler ya true (doğru) ya da false (yanlış) olabilir.
    bool public benimBoolDegerim = true;


    // int: Tamsayı (int) Sayılar (negatif sayılar dahil). Örnek: int8, int16, int24,....int256
    int public benimIntDegerim = -11;
    int256 public sayi2 = -7867868761876123761826387618236871623871627317623776188899123791237912379;

    // uint: Tamsayılar (Unsigned Integer) (negatif sayılar hariç). Örnek: uint8, uint16, uint24,....uint256
    // uint256 = uint = 2**256-1

    uint public benimUintDegerim = 12;
    uint256 public sayi3 = 7867868761876123761826387618236871623871627317623776188899123791237912379876;


    // string: Metin değerlerini temsil eden bir veri tipidir. Çift tırnak içinde tanımlanır.

    string public benimKelimem = "Lestonz";


    // bytes32: 32 byte (256 bit) uzunluğunda verileri temsil eden bir veri tipidir. Genellikle küçük veri parçalarını depolamak için kullanılır.
    // 1 byte = 8 bits ve hexadecimal format (0x), bytes1...bytes32

    bytes32 public degerByte = "Merhaba";
    bytes32 public degerByteHex = "0x1a3b5c3e"; 


    // address: Ethereum adreslerini temsil eden bir veri tipidir. address tipi, Ethereum adreslerini saklamak ve bu adreslerle etkileşime girmek için kullanılır.
    // hexadecimal format (0x) 

    address public myAdress = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;



} 