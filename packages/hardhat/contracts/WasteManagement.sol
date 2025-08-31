// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./EcoToken.sol";

contract WasteManagement is Ownable {
    EcoToken public ecoToken;
    
    struct Collection {
        address citizen;
        address collector;
        uint256 wasteAmount;
        uint256 timestamp;
        string qrCode;
        string location;
        bool processed;
    }

    struct Collector {
        string name;
        bool active;
        uint256 totalCollected;
        uint256 lastCollection;
        string[] collectionProofs;
    }

    struct DAO {
        uint256 totalFunds;
        uint256 proposalCount;
        mapping(uint256 => Proposal) proposals;
    }

    struct Proposal {
        uint256 id;
        address proposer;
        string description;
        uint256 amount;
        uint256 votes;
        bool executed;
        mapping(address => bool) hasVoted;
    }

    mapping(address => Collector) public collectors;
    mapping(string => Collection) public collections;
    mapping(address => uint256) public collectorPayments;
    mapping(address => uint256) public citizenTotalWaste;

    uint256 public paymentPerKg = 0.001 ether;
    uint256 public totalWasteCollected;

    function registerCollector(address _collector, string memory _name) public onlyOwner {
        require(_collector != address(0), "Invalid collector address");
        require(bytes(_name).length > 0, "Name cannot be empty");
        require(!collectors[_collector].active, "Collector already registered");
        
        collectors[_collector] = Collector({
            name: _name,
            active: true,
            totalCollected: 0,
            lastCollection: 0,
            collectionProofs: new string[](0)
        });
    }
    uint256 public totalCollectors;
    uint256 public totalCitizens;
    DAO public communityDAO;
    
    event CollectionRecorded(string qrCode, address citizen, address collector, uint256 amount, string location);
    event PaymentReleased(address collector, uint256 amount);
    event ProposalCreated(uint256 proposalId, address proposer, string description, uint256 amount);
    event ProposalVoted(uint256 proposalId, address voter);
    event ProposalExecuted(uint256 proposalId);

    constructor(address _ecoTokenAddress) {
        ecoToken = EcoToken(_ecoTokenAddress);
    }

    function registerCollector(string memory _name) external {
        require(!collectors[msg.sender].active, "Already registered");
        require(bytes(_name).length > 0, "Name required");

        collectors[msg.sender] = Collector({
            name: _name,
            active: true,
            totalCollected: 0,
            lastCollection: 0,
            collectionProofs: new string[](0)
        });

        totalCollectors++;
        ecoToken.addCollector(msg.sender);
    }

    function recordCollection(
        string memory _qrCode,
        address _citizen,
        uint256 _wasteAmount,
        string memory _location
    ) external {
        require(collectors[msg.sender].active, "Not an active collector");
        require(_wasteAmount > 0, "Invalid waste amount");
        require(bytes(_qrCode).length > 0, "Invalid QR code");
        
        collections[_qrCode] = Collection(
            _citizen,
            msg.sender,
            _wasteAmount,
            block.timestamp,
            _qrCode,
            _location,
            false
        );

        collectors[msg.sender].totalCollected += _wasteAmount;
        collectors[msg.sender].lastCollection = block.timestamp;
        collectors[msg.sender].collectionProofs.push(_qrCode);
        collectorPayments[msg.sender] += _wasteAmount * paymentPerKg;

        if (citizenTotalWaste[_citizen] == 0) {
            totalCitizens++;
        }
        citizenTotalWaste[_citizen] += _wasteAmount;
        totalWasteCollected += _wasteAmount;
        
        // Mint EcoTokens for the citizen
        ecoToken.recordWasteAndMintTokens(_citizen, _wasteAmount);
        
        emit CollectionRecorded(_qrCode, _citizen, msg.sender, _wasteAmount, _location);
    }

    function createCleanupProposal(string memory _description, uint256 _amount) external {
        require(_amount > 0, "Invalid amount");
        require(bytes(_description).length > 0, "Description required");

        uint256 proposalId = communityDAO.proposalCount++;
        Proposal storage proposal = communityDAO.proposals[proposalId];
        proposal.id = proposalId;
        proposal.proposer = msg.sender;
        proposal.description = _description;
        proposal.amount = _amount;
        proposal.executed = false;

        emit ProposalCreated(proposalId, msg.sender, _description, _amount);
    }

    function voteOnProposal(uint256 _proposalId) external {
        Proposal storage proposal = communityDAO.proposals[_proposalId];
        require(!proposal.executed, "Proposal already executed");
        require(!proposal.hasVoted[msg.sender], "Already voted");

        proposal.votes++;
        proposal.hasVoted[msg.sender] = true;
        emit ProposalVoted(_proposalId, msg.sender);
    }

    function executeProposal(uint256 _proposalId) external onlyOwner {
        Proposal storage proposal = communityDAO.proposals[_proposalId];
        require(!proposal.executed, "Already executed");
        require(proposal.votes >= 3, "Not enough votes"); // Simple threshold for demo

        proposal.executed = true;
        ecoToken.recordWasteAndMintTokens(proposal.proposer, proposal.amount);
        emit ProposalExecuted(_proposalId);
    }

    function releasePayment(address _collector) external onlyOwner {
        uint256 payment = collectorPayments[_collector];
        require(payment > 0, "No payment due");
        
        collectorPayments[_collector] = 0;
        payable(_collector).transfer(payment);
        
        emit PaymentReleased(_collector, payment);
    }

    // Function to receive ETH
    receive() external payable {
        communityDAO.totalFunds += msg.value;
    }
}
