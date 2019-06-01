pragma solidity ^0.5.0;

contract DiseaseTracker {
    struct Organization {
        address organizationAddress;
        string name;
        string long;
        string lat;
    }

    struct DiseaseCase {
        uint diseaseId;
        string name;
    }

    mapping(address => Organization) public organizations;
    mapping(uint => DiseaseCase) public diseases;

    constructor() public {
    }
}