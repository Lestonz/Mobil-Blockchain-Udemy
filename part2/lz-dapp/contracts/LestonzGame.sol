// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; 
contract LestonzGame is ReentrancyGuard {

    address public owner;
    uint256 public totalKasa;
    uint256 public sansliSayi;

    bool public oyunAktifMi;
    uint256 public girisUcreti = 0.002 ether;

    event Depozit(address indexed player, uint256 _miktar);
    event Kazanan(address indexed player, uint256 _miktar);

    constructor() {
        owner = msg.sender;
        oyunAktifMi = true;
    }

    modifier oyunKontrol() {
        require(oyunAktifMi, "Oyun suanda aktifdegil!");
        _;
    } 

    modifier onlyOwner() {
        require(msg.sender == owner, "Sadece kontrat sahibinin yetkisi vardir!");
        _;
    }

    function generateRandomSayi() private view returns(uint) {
        return (uint(keccak256(abi.encodePacked( block.timestamp, block.coinbase, block.number))) % 10);
    }

    function oyunuBaslat() private {
        oyunAktifMi = true;
    }

    function girisUcretiDegistir(uint256 _deger) external onlyOwner {
        girisUcreti = _deger;
    }

    function oyunOyna(uint8 _sayi) external payable oyunKontrol nonReentrant {
        require(_sayi >= 0 && _sayi < 10, "Sayi 0-9 arasinda bir deger olmali.");
        require(msg.value >= girisUcreti, "Yeterli miktarda giris ucreti yatirmadiniz.");

        totalKasa += msg.value;
        emit Depozit(msg.sender, msg.value);

        sansliSayi = generateRandomSayi();

        if( sansliSayi == _sayi) {
            uint256 odul = totalKasa;
            totalKasa = 0;
            oyunAktifMi = false;

            (bool basarili, ) = payable(msg.sender).call{value: odul}('');
            require(basarili, "Kazanan odulu alirken bir problem oldu.");

            emit Kazanan(msg.sender, odul);

            oyunuBaslat();
        }

    } 

    function oyunuBitir() external onlyOwner nonReentrant {
        oyunAktifMi = false;

        (bool basarili, ) = payable(owner).call{value: totalKasa}('');
        require(basarili, "Islem basarili.");

        totalKasa = 0;
        oyunuBaslat();
    }

}