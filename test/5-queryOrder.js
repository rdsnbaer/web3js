var Web3 = require('web3')
var web3 = new Web3('http://127.0.0.1:8081')


web3.eth.getBlockNumber(function (error, result) {
  if(!error) {
  	console.log(" ******************************** 获取区块高度 *******************************************")
    console.log("getBlockNumber:", result);
  }
})

web3.eth.getBalance("e523e7c59a0725afd08bc9751c89eed6f8e16dec").then(function(result) {
	console.log(" ******************************** 查询地址余额信息 ****************************************")
	console.log("address 0x41ff923c81d7a47f262f9fca7359014cdc19c7f7 info:", result)
})

web3.eth.getPendingOrderPoolForAddr("e523e7c59a0725afd08bc9751c89eed6f8e16dec", "10").then(function(result) {
	console.log(" ******************************** 查询订单 ***********************************************")
	console.log("address e523e7c59a0725afd08bc9751c89eed6f8e16dec info:", result)
})

web3.eth.getPendingOrderPool("buy", "FUEL", "10").then(function(result) {
	console.log(" ******************************** 获取交易池中存在的订单 *********************************")
	console.log("The result query is :", result)
})

web3.eth.getSuccessPendingOrder("100").then(function(result) {
	console.log(" ******************************** 获取已成功的撮合交易 ***********************************")
	console.log("The result query is :", result)
})


