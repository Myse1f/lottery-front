pragma solidity ^0.5.11;

contract LotteryGame {
    address payable owner; // owner of this contract
    address payable[] public players;
    uint BET = 0.1 ether;
    uint8 public THRESHOLD = 11;
    uint public settlementBlockNumber;

    event Play(address indexed player);
    event Drawing(uint settlementBlockNumber);
    event Drawn(address indexed winner);

    constructor() public payable {
        require(msg.value == 1 ether, "Require 1 ehter to deploy the contract!");
        owner = msg.sender;
    }

    // participate the game
    function play() public payable {
        require(msg.value == BET, "One bet needs 0.1 ether");
        require(players.length < THRESHOLD, "Waiting for lottery result");

        players.push(msg.sender); // record the players
        emit Play(msg.sender);

        if (players.length == THRESHOLD) {
            // reach threshold, lock in the block hash in the future
            settlementBlockNumber = block.number + 10;

            emit Drawing(settlementBlockNumber);
        }
    }

    // draw a lottery
    function draw() public {
        require(msg.sender == owner, "Only contract owner can call commit()!");
        require(players.length == THRESHOLD, "number of player doesn't reach threshold.");
        require(block.number > settlementBlockNumber, "SettlementBlock isn't valid yet!");
        require(block.number < settlementBlockNumber + 256, "SettlementBlock is out of date!");

        uint8 winner = uint8(uint(keccak256(abi.encodePacked(blockhash(settlementBlockNumber), now)))) % THRESHOLD;
        players[winner].transfer((THRESHOLD-1) * BET); // 1 * BET for handling fee

        emit Drawn(players[winner]);

        settlementBlockNumber = 0;
        delete players;
    }

    function kill() public {
        require(msg.sender == owner, "Only contract owner can call kill()!");

        // return the money
        for (uint8 i = 0; i < players.length; i++) {
            players[i].transfer(1 * BET);
        }

        selfdestruct(owner);
    }
}