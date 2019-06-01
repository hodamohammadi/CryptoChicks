App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
   if (typeof web3 !== 'undefined') {
    App.web3Provider = web3.currentProvider;
    web3 = new Web3(web3.currentProvider);

    //prompt user to enable metamask
    web3.currentProvider.enable();

   } else {
    App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    web3 = new Web3(App.web3Provider);
   }

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('DiseaseTracker.json', function(diseaseTracker) {
      App.contracts.DiseaseTracker = TruffleContract(diseaseTracker);
      App.contracts.DiseaseTracker.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var trackerInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.DiseaseTracker.deployed().then(function(instance) {
      trackerInstance = instance;
      console.log(trackerInstance);
      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  },

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
