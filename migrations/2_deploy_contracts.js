var DiseaseTracker = artifacts.require("./DiseaseTracker.sol");

module.exports = function(deployer) {
  deployer.deploy(DiseaseTracker);
};
