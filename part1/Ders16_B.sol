//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

import "./IDers16.sol";

contract Ders16_B {
    IDers16 public hedefKontrat;

    // müdahale etmek istediğimiz kontratın tanımladığımız fonksiyon
    function disKontrat(address _kontratAdresi) external {
        hedefKontrat = IDers16(_kontratAdresi);
    }

    // A kontratına müdale için yazılan fonsiyon.
    function test(uint256 _sayi) external {
        hedefKontrat.sayiDegistir(_sayi);
    }

}