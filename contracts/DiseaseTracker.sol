pragma solidity ^0.5.0;

contract DiseaseTracker {
    struct Organization {
        address organizationAddress;
        string name;
        string long;
        string lat;
    }

    struct Disease {
        uint diseaseId;
        string name;
    }

    mapping(address => Organization) public organizations;
    mapping(uint => Disease) public diseases;

    constructor() public {
        addOrganization(address(0), "test organization", "43.6452", "-79.3806");
        addDisease(123, "test disease");
    }

    function addOrganization(address _organizationAddress, string memory _name, string memory long, string memory lat) public {
        //require(msg.sender == owner);
        organizations[_organizationAddress] = Organization(_organizationAddress, _name, long, lat);
    }

    function addDisease(uint _diseaseId, string memory _name) public {
        //require(msg.sender == owner);
        diseases[_diseaseId] = Disease(_diseaseId, _name);
    }
}