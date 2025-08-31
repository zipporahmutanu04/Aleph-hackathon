// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EcoToken is ERC20, Ownable {
    mapping(address => bool) public collectors;
    uint256 public constant TOKENS_PER_KG = 10 * 10**18; // 10 tokens per kg
    uint256 public constant MIN_REDEEM_AMOUNT = 10 * 10**18; // Minimum 10 tokens for redemption

    // M-Pesa redemption data
    struct Redemption {
        uint256 amount;
        string phoneNumber;
        uint256 timestamp;
        bool processed;
    }

    mapping(address => Redemption[]) public redemptions;
    
    event CollectorAdded(address collector);
    event CollectorRemoved(address collector);
    event WasteRecycled(address citizen, address collector, uint256 amount, uint256 tokens);
    event RedemptionRequested(address indexed user, uint256 amount, string phoneNumber);
    event RedemptionProcessed(address indexed user, uint256 amount, string phoneNumber);

    constructor() ERC20("EcoToken", "ECO") {
        _mint(msg.sender, 1000000 * 10**18); // Initial supply of 1M tokens
    }

    modifier onlyCollector() {
        require(collectors[msg.sender], "Not authorized collector");
        _;
    }

    function addCollector(address _collector) public onlyOwner {
        collectors[_collector] = true;
        emit CollectorAdded(_collector);
    }

    function removeCollector(address _collector) public onlyOwner {
        collectors[_collector] = false;
        emit CollectorRemoved(_collector);
    }

    function recordWasteAndMintTokens(address _citizen, uint256 _wasteAmount) public onlyCollector {
        require(_citizen != address(0), "Invalid citizen address");
        require(_wasteAmount > 0, "Amount must be greater than 0");

        uint256 tokensToMint = _wasteAmount * TOKENS_PER_KG;
        _mint(_citizen, tokensToMint);

        emit WasteRecycled(_citizen, msg.sender, _wasteAmount, tokensToMint);
    }

    function requestMPesaRedemption(uint256 _amount, string memory _phoneNumber) external {
        require(_amount >= MIN_REDEEM_AMOUNT, "Amount below minimum");
        require(balanceOf(msg.sender) >= _amount, "Insufficient balance");
        require(bytes(_phoneNumber).length > 0, "Invalid phone number");

        _burn(msg.sender, _amount);

        redemptions[msg.sender].push(Redemption({
            amount: _amount,
            phoneNumber: _phoneNumber,
            timestamp: block.timestamp,
            processed: false
        }));

        emit RedemptionRequested(msg.sender, _amount, _phoneNumber);
    }

    function processRedemption(address _user, uint256 _index) external onlyOwner {
        require(_index < redemptions[_user].length, "Invalid redemption index");
        Redemption storage redemption = redemptions[_user][_index];
        require(!redemption.processed, "Already processed");

        redemption.processed = true;
        emit RedemptionProcessed(_user, redemption.amount, redemption.phoneNumber);
    }

    function getUserRedemptions(address _user) external view returns (
        uint256[] memory amounts,
        string[] memory phoneNumbers,
        uint256[] memory timestamps,
        bool[] memory processed
    ) {
        uint256 count = redemptions[_user].length;
        amounts = new uint256[](count);
        phoneNumbers = new string[](count);
        timestamps = new uint256[](count);
        processed = new bool[](count);

        for (uint256 i = 0; i < count; i++) {
            Redemption memory redemption = redemptions[_user][i];
            amounts[i] = redemption.amount;
            phoneNumbers[i] = redemption.phoneNumber;
            timestamps[i] = redemption.timestamp;
            processed[i] = redemption.processed;
        }

        return (amounts, phoneNumbers, timestamps, processed);
    }
}
