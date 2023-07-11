//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders13 {
    // revert assert require 

    function kontrol1(uint _sayi) external pure returns(uint) {
        if (_sayi > 11) {
            return _sayi;
        } else {
            return 0;
        }
    }

    // revert 
    function kontrol2(uint _sayi) external pure returns(uint) {
        if ( _sayi > 11) {
            return _sayi;
        } else {
            revert("Sayi 11'den Buyuk degil!");
        }
    }

    // assert 
    function kontrol3(uint _sayi) external pure returns(uint) {
        assert(_sayi > 11);
        return _sayi;
    }

    // require 
    function kontrol4(uint _sayi) external pure returns(uint) {
        require(_sayi > 11, "Sayi 11'den Buyuk Degil!");
        return _sayi;
    }

}