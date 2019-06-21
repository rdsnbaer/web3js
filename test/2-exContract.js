var Web3 = require('web3')
var web3 = new Web3('http://127.0.0.1:8081')

// 合约的ABI
var abi = [
	{
		"constant": false,
		"inputs": [
			{
				"name": "_num",
				"type": "uint256"
			}
		],
		"name": "testEvent",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "addr",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "a",
				"type": "uint256"
			}
		],
		"name": "TestEvent",
		"type": "event"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "returnInt",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

// 合约实例化 传入合约abi，及合约地址
var myContract = new web3.eth.Contract(abi, '0xe4988fE323FE5e91940c7E59D737164387746DFE', {
    from: 'e523e7c59a0725afd08bc9751c89eed6f8e16dec', 		// 操作地址
    gasPrice: '5'												// gas单价						
	
});

// 合约上链函数及其传入参数编码
var encode = myContract.methods.testEvent(100).encodeABI()
console.log("encode:", encode)

// 签名数据组装
var rawTx = {
	from:'e523e7c59a0725afd08bc9751c89eed6f8e16dec',		// 操作者地址
	gasPrice: '0x5',										// gas单价
	gasLimit: '0xa006c85beff',
	to: '0xe4988fE323FE5e91940c7E59D737164387746DFE', 		// 合约地址
	value: '0',												// 默认为0
	gas:"0xa006c85beff",									// gas数量
	data: encode 											// 调用函数的编码
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
web3.eth.accounts.signTransaction(rawTx, '0x39ae662fd20b510fcd9eeb6297eff65b2833ef59a5b2400dd247eafb6cdde02d', function(error, result){
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

myContract.methods.returnInt().call({}, function(error, result){
	if(!error){
		console.log(" ******************************** returnInt *******************************************")
		console.log("totalId:", result)
	}
	else {
		console.log("error: ", error)
	}
})

myContract.methods.owner().call({}, function(error, result){
	if(!error){
		console.log(" ******************************** owner *******************************************")
		console.log("owner:", result)
	}
	else {
		console.log("error: ", error)
	}
})




