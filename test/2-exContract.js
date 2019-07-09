var Web3 = require('web3')
var web3 = new Web3('http://127.0.0.1:8081')

// 合约的ABI
var abi = [
	{
		"constant": false,
		"inputs": [],
		"name": "addGameAccountBalance",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "gameNo",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "bettor",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "carNo",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "coinCount",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "betDate",
				"type": "uint256"
			}
		],
		"name": "betEvent",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_carNo",
				"type": "uint256"
			}
		],
		"name": "det",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "lottery",
		"outputs": [
			{
				"name": "success",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "startGame",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_gameNo",
				"type": "uint256"
			},
			{
				"name": "_bettor",
				"type": "address"
			}
		],
		"name": "betInfoList",
		"outputs": [
			{
				"name": "o_betInfoList",
				"type": "uint256[2][]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "betOverSurplusSeconds",
		"outputs": [
			{
				"name": "time",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			},
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "carGameRanking",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "page",
				"type": "uint256"
			},
			{
				"name": "pageSize",
				"type": "uint256"
			},
			{
				"name": "statisticsSenderOnly",
				"type": "bool"
			}
		],
		"name": "findWinningList",
		"outputs": [
			{
				"name": "o_winningList",
				"type": "uint256[8][]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_gameNo",
				"type": "uint256"
			}
		],
		"name": "gameInfoWinningDetail",
		"outputs": [
			{
				"name": "o_winningDetail",
				"type": "uint256[6][]"
			},
			{
				"name": "o_addressList",
				"type": "address[]"
			},
			{
				"name": "o_totalBonus",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_gameNo",
				"type": "uint256"
			},
			{
				"name": "_bettorAddress",
				"type": "address"
			}
		],
		"name": "gameInfoWinningDetail",
		"outputs": [
			{
				"name": "o_myWinningDetail",
				"type": "uint256[6][3]"
			},
			{
				"name": "o_totalBonus",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "gameNo",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "gameStatus",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_gameNo",
				"type": "uint256"
			}
		],
		"name": "getGameRanking",
		"outputs": [
			{
				"name": "first",
				"type": "uint256"
			},
			{
				"name": "second",
				"type": "uint256"
			},
			{
				"name": "third",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_gameNo",
				"type": "uint256"
			}
		],
		"name": "lotteryResult",
		"outputs": [
			{
				"name": "o_lotteryResult",
				"type": "uint256[4][]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
]

var contractAddr = '0xe4988fE323FE5e91940c7E59D737164387746DFE';
var fromAddr = 'e523e7c59a0725afd08bc9751c89eed6f8e16dec';
var fromAddrPrivate = '0x39ae662fd20b510fcd9eeb6297eff65b2833ef59a5b2400dd247eafb6cdde02d';

// 合约实例化 传入合约abi，及合约地址
var myContract = new web3.eth.Contract(abi, contractAddr, {
    from: fromAddr, 		// 操作地址
    gasPrice: '5'												// gas单价						
	
});

// 合约上链函数及其传入参数编码
//var encode = myContract.methods.addGameAccountBalance.encodeABI()
//var encode = myContract.methods.startGame().encodeABI()
//var encode = myContract.methods.det(2).encodeABI()
var encode = myContract.methods.lottery().encodeABI()

// 签名数据组装
var rawTx = {
	from: fromAddr,		// 操作者地址
	gasPrice: '0x5',										// gas单价
	gasLimit: '0xa006c85beff',
	to: contractAddr, 		// 合约地址
	nonce:'0x1',
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
web3.eth.accounts.signTransaction(rawTx, fromAddrPrivate, function(error, result){
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





