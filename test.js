var Web3 = require('web3');
var web3 = new Web3('http://127.0.0.1:6666');
// var web3 = new Web3('http://39.104.206.147:8081')



console.log(web3.version);
////////////////////////////////////////////////// 获取区块高度 /////////////////////////////////////////////

// web3.eth.getBlockNumber(function (error, result) {
//   if(!error) {
//   	console.log("////////////////////////////////////////////////// 获取区块高度 /////////////////////////////////////////////")
//     console.log("getBlockNumber:" + result);
//   }
// }).catch(function(error){
// 	console.log(error)
// })


////////////////////////////////////////////////// 获取区块 /////////////////////////////////////////////
// web3.eth.getBlock(10, true, function (error, result) {
 
//   	console.log("////////////////////////////////////////////////// 获取区块详情 /////////////////////////////////////////////")
//     console.log("getBlock:");
//     console.log(result)
// })
// web3.eth.getBlock(10).then(console.log);


////////////////////////////////////////////////// 查询地址信息 /////////////////////////////////////////////

// web3.eth.getBalance("0xe523e7c59a0725afd08bc9751c89eed6f8e16dec").then(function(result){
// 	console.log("////////////////////////////////////////////////// 查询地址信息 /////////////////////////////////////////////")
// 	console.log("address 0xe523e7c59a0725afd08bc9751c89eed6f8e16dec info:")
// 	console.log(result)
// });


////////////////////////////////////////////////// 查询交易 /////////////////////////////////////////////

// web3.eth.getTransaction('0xb7547f0f44241024f4b3daa67f77381160fb1aad00afe1cf17045f522980ef71').then(function(result){
// 	console.log("////////////////////////////////////////////////// 查询交易 /////////////////////////////////////////////")
// 	console.log(result)
// })



////////////////////////////////////////////////// 查询交易收据 /////////////////////////////////////////////
//0x2f73767da141add367902778050a4e8fd9ff052b9374e0c3f3e5b699b0ea5f12

// web3.eth.getTransactionReceipt("0xb7547f0f44241024f4b3daa67f77381160fb1aad00afe1cf17045f522980ef71").then(function(result){
// 	console.log("////////////////////////////////////////////////// 查询交易收据 /////////////////////////////////////////////")	
// 	console.log(result)
// });


////////////////////////////////////////////////// 部署一个合约  /////////////////////////////////////////////
var rawTx = {
	from:'0x9d3395fa5e185373483526fc372304f7dbed0a7d',
	gasPrice: '0x13',
	gasLimit: '0xa006c85beff',
	to: null,
	value: '0',
	gas:"0xa006c85beff",
	data: '0x6060604052341561000c57fe5b5b5b5b6101598061001e6000396000f30060606040526000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063954ab4b21461003b575bfe5b341561004357fe5b61004b6100d4565b604051808060200182810382528381815181526020019150805190602001908083836000831461009a575b80518252602083111561009a57602082019150602081019050602083039250610076565b505050905090810190601f1680156100c65780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6100dc610119565b604060405190810160405280600c81526020017f48656c6c6f20576f726c6421000000000000000000000000000000000000000081525090505b90565b6020604051908101604052806000815250905600a165627a7a72305820b88ade0e1b40d9f8ffeba3f2bc9aa2ee4a1ae17f03fc52fc568812eb5d96f5ad0029'
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
web3.eth.accounts.signTransaction(rawTx, '0x39ae662fd20b510fcd9eeb6297eff65b2833ef59a5b2400dd247eafb6cdde02d', function(error, result){
	if(!error){
		console.log("rawTransaction:" + result.rawTransaction);
		// web3.eth.sendRawTransaction
		return web3.eth.sendRawTransaction(result.rawTransaction, function(error, result){
			if (!error) {
				console.log("sendSignedTransaction: " + result);
				sleep(2000);
				web3.eth.getTransactionReceipt(result).then(function(result){
					console.log("getTransactionReceipt: " + result);
					console.log(result);
					if(result.status == true){
						var contract_address = result.contractAddress;
						//调用合约
						console.log("调用合约......");

					}
					else{
						console.log("get contract error.");
					}

				});
				// console.log("getTransactionReceipt:")
				// web3.eth.getTransactionReceipt(result).then(console.log)
			}
		});
	}
	else{
		console.log(error);
	}
});
 
// 调用合约 0x1d4a737101B9d8b64e36D864ac5be551A07B97d6 0x13c1A242AD3F26501fe215Dd8cA5cFC982ccea2f
// console.log("调用合约.............................")
// var abi = [{"constant":true,"inputs":[],"name":"getValue","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[{"name":"_num","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var abi =  [{"constant":true,"inputs":[],"name":"say","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"inputs":[],"payable":false,"stateMutability":"nonpayable","type":"constructor"}];
var myContract = new web3.eth.Contract(abi, '0xE5CA31aa2E2E4f52bC160Fc046E2A389Bc7ea627', {
    from: '0x9d3395fa5e185373483526fc372304f7dbed0a7d', // default from address
    gasPrice: '5' // default gas price in wei, 20 gwei in this case
});


myContract.methods.say().call({}, function(error, result){
	console.log("call");
	if(!error){
		// console.log(error)
		console.log(result);
	}
	
})























// web3.eth.accounts.signTransaction(rawTx, '0x39ae662fd20b510fcd9eeb6297eff65b2833ef59a5b2400dd247eafb6cdde02d')
// .then(function(signTx){
// 	console.log("////////////////////////////////////////////////// 部署一个合约 /////////////////////////////////////////////")
// 	console.log("signTransaction: ")
// 	console.log(signTx)
// 	// console.log("raw tx: " + signTx.rawTransaction)
// 	return signTx.rawTransaction;
// }).then(function(result){
// 	console.log("////////////////////////////////////////////////// 发送序列化合约数据 /////////////////////////////////////////////")
// 	console.log(result)

// 	return web3.eth.sendSignedTransaction(result);

// 	// let txHash;

// 	// return web3.eth.sendSignedTransaction(result, function(result){
// 	// 	console.log("hash " );
// 	// 	console.log(result)
// 	// 	txHash = result;

// 	// });
// 	// sleep(2000)
// 	// return txHash;
// }).then(function(txHash){
// 	console.log("////////////////////////////////////////////////// 获取交易hash /////////////////////////////////////////////")
// 	console.log(txHash)
// 	return web3.eth.getTransactionReceipt(txHash);
// }).then(function(error, result){
// 	console.log("////////////////////////////////////////////////// 交易收据 /////////////////////////////////////////////")
// 	console.log(error)
// 	console.log(result)
// }).catch(function(error){
// 	console.log("error." )
// 	console.log(error)
// })




