//SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;

contract Ders9 {
    // While Döngüsü

    uint[] internal sayilar;

    uint internal index = 0;
    uint internal sonSayi = 10;

    function whileLoop() external {

        while (index <= sonSayi) {
            sayilar.push(index);
            /* index = index + 1; */
            index ++;
        }
    }

    function sayiDizisi() external view returns (uint[] memory){
        return sayilar;
    }

} 