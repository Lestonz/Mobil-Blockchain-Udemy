//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders5 { 
    // mapping: Solidity dilinde bir anahtar-değer eşleştirmesi sağlayan bir veri yapısıdır. 
    // Mapping veri yapısı, bir anahtarın değeri ile ilişkilendirilmesini sağlar. 
    // Anahtarlar, genellikle bir veri yapısında benzersiz bir kimlik sağlamak için kullanılan değişkenlerdir.

    mapping (address => uint256) public bakiye;

    function paraYatirma() public payable {
        bakiye[msg.sender] += msg.value;

    }

    function paraCekme(uint256 _miktar) public {
        require (bakiye[msg.sender] >= _miktar, "Yetersiz bakiye");

        bakiye[msg.sender] -= _miktar;
        
        payable(msg.sender).transfer(_miktar);
    }

}