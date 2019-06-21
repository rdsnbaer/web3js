var Web3 = require('web3')
var web3 = new Web3('http://39.104.206.147:8081')


web3.eth.getBlockNumber(function (error, result) {
  if(!error) {
  	console.log(" ******************************** 获取区块高度 *******************************************")
    console.log("getBlockNumber:", result);
  }
})

web3.eth.getBalance("0x41ff923c81d7a47f262f9fca7359014cdc19c7f7").then(function(result){
	console.log(" ******************************** 查询地址信息 *******************************************")
	console.log("address 0x41ff923c81d7a47f262f9fca7359014cdc19c7f7 info:", result)
})

// 合约二进制文件
var data1 = '0x60806040526103e860005534801561001657600080fd5b5033600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055506101e5806100676000396000f300608060405260043610610057576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680638da5cb5b1461005c578063d13f25ad146100b3578063dcd9c7fa146100de575b600080fd5b34801561006857600080fd5b5061007161010b565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b3480156100bf57600080fd5b506100c8610131565b6040518082815260200191505060405180910390f35b3480156100ea57600080fd5b506101096004803603810190808035906020019092919050505061013a565b005b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008054905090565b8060008082825401925050819055507f2a1343a7ef16865394327596242ebb1d13cafbd9dbb29027e89cbc0212cfa73733600054604051808373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681526020018281526020019250505060405180910390a1505600a165627a7a72305820ef9881f3a0e1713cb1509c81aaa1c2d09330e522fc394eae62758d330c0a4b880029'

// 组装需要签名的数据
var rawTx = {
	from:'0x41ff923c81d7a47f262f9fca7359014cdc19c7f7',		// 合约部署者
	gasPrice: '0x5',										// gas单价
	gasLimit: '0xa006c85beff',
	to: null,												// 部署合约时需要填null
	value: '0',												// 默认为0
	gas:"0xa006c85beff",									// gas的数量
	data: data1 											// 合约的二进制文件
}

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

// 数据签名，发送交易数据，获取结果
web3.eth.accounts.signTransaction(rawTx, '0x79ea47d0bf6118c51e8979e8858f20c5f102518a5bcdd92709c443cd09a35028', function(error, result){
	if(!error){
		console.log(" ******************************** 查询签名信息 *******************************************")
		console.log("signTransaction: ", result)

		console.log("rawTransaction:" + result.rawTransaction);
		web3.eth.sendSignedTransaction(result.rawTransaction, function(error, result){
			console.log("error:", error)
			if (!error) {
				console.log(" ******************************** 查询交易hash *******************************************")
				console.log("sendSignedTransaction: ", result)

				sleep(2000);
				web3.eth.getTransactionReceipt(result).then(function(result){
					console.log(" ******************************** 查询收据信息 *******************************************")
					console.log("getTransactionReceipt: ", result)
				});
			}
		});
	}
	else{
		console.log(error);
	}
});