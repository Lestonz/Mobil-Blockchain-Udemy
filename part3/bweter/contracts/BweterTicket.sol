// SPDX-License-Identifier: MIT
  /* @development by lestonz */
pragma solidity ^0.8.7;
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract BweterTicket is ERC1155, Ownable, ReentrancyGuard {
    string public name;
    string public symbol;
    uint8 public maxMintPerTX = 1;
    uint public price = 0.01 ether;

    mapping(uint => string) public tokenURI;

    constructor() ERC1155("") {
        name= "BweterTicket";
        symbol="BWT";
    }

    function mint(address _to, uint _id, uint _amount) external onlyOwner {
        _mint(_to, _id, _amount, "");
    }

    function mintBatch(address _to, uint[] memory _ids, uint[] memory _amounts) external onlyOwner {
        _mintBatch(_to, _ids, _amounts, "");
    }

    function burn(uint _id, uint _amount) external {
        _burn(msg.sender, _id, _amount);
    }

    function burnBatch(uint[] memory _ids, uint[] memory _amounts) external onlyOwner {
       _burnBatch(msg.sender, _ids, _amounts);
    }

    function burnForMint(address _from, uint[] memory _burnIds, uint[] memory _burnAmounts, uint[] memory _mintIds, uint[] memory _mintAmounts ) external onlyOwner {
        _burnBatch(_from, _burnIds, _burnAmounts);
        _mintBatch(_from, _mintIds,  _mintAmounts, "");
    }

    function setURI (uint _id, string memory _uri) external onlyOwner {
        tokenURI[_id] = _uri;
        emit URI(_uri, _id);
    }

    function mintForSale(uint _id) public payable {
        require(msg.value >= (maxMintPerTX * price), "Price it should be equal or greater.");
        _mint(msg.sender, _id, maxMintPerTX, "");
    }

    function uri(uint _id) public override view returns (string memory) {
        return tokenURI[_id];
    }

    function updateMintPerTX(uint8 _amount) public onlyOwner {
        maxMintPerTX = _amount;
    }

    function updatePrice(uint _price) public onlyOwner {
        price = _price;
    }

    function withdraw() public onlyOwner nonReentrant {
        (bool success, ) = payable(owner()).call{value: address(this).balance}('');
        require(success, "Some problem from withdraw.");
    }

}
