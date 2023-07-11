// SPDX-License-Identifier: MIT
  /* @development by lestonz */
pragma solidity ^0.8.7;

contract BweetContract {

    struct Bweet {
        uint BweetId;
        address author;
        string content;
        uint likeCount;
        uint timestamp;
    }

  mapping(uint => Bweet) public Bweets;
  uint public BweetCount = 0;
  mapping(uint => mapping(address => bool)) public hasLiked;

  event BweetCreated(uint indexed BweetId, address indexed author);
  event BweetLiked(uint indexed BweetId, address indexed liker);

  function createBweet(string memory _content) external {
    BweetCount++;
    Bweets[BweetCount] = Bweet(BweetCount, msg.sender, _content, 0, block.timestamp);
    emit BweetCreated(BweetCount, msg.sender);
  }

  function likeBweet(uint _BweetId) external {
    require(_BweetId > 0 && _BweetId <= BweetCount,  "Invalid Bweet ID.");
    require(!hasLiked[_BweetId][msg.sender], "You have already liked this Bweet!");

    hasLiked[_BweetId][msg.sender] = true;
    Bweets[_BweetId].likeCount++;
    emit BweetLiked(_BweetId, msg.sender);
  }

  function getAllBweets() external view returns(Bweet[] memory) {
    Bweet[] memory allBweets = new Bweet[](BweetCount);

    for (uint i = 1; i <= BweetCount; i++) {
      allBweets[i-1] = Bweets[i];
    }

    return allBweets;
  }
}