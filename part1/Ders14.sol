//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders14 {
    /*
        event ve emit, Solidity dilinde olayları (events) tanımlamak ve 
        olayları tetiklemek için kullanılan ifadelerdir.
    */

    string public mesaj;
    uint256 internal sayi;

    event mesajKontrol (string mesaj, uint256 sayi, address gonderen);

   
    function mesajGonder(string memory _mesaj, uint256 _sayi) external {
        mesaj = _mesaj;
        sayi = _sayi;
        emit mesajKontrol(_mesaj, _sayi, msg.sender);
    }
}