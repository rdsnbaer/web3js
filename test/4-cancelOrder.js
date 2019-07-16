var Web3 = require('web3')
var RLP = require('../node_modules/web3-eth/node_modules/rlp')
var web3 = new Web3('http://127.0.0.1:8081')


web3.eth.getBlockNumber(function (error, result) {
  if(!error) {
  	console.log(" ******************************** 获取区块高度 *******************************************")
    console.log("getBlockNumber:", result);
  }
})

web3.eth.getBalance("e523e7c59a0725afd08bc9751c89eed6f8e16dec").then(function(result){
	console.log(" ******************************** 查询地址余额信息 ****************************************")
	console.log("address 0x41ff923c81d7a47f262f9fca7359014cdc19c7f7 info:", result)
})
 
 
// 撤单数据 
var cancelData =	{
	"type": 4,																		// 类型，4表示撤单
	"subscription" : 3,																// 订阅号，固定为3		
	"m_hash":"0xc5ce922e967b08efd6a84990d63e90d76f405dd43bbdd4fbc5afe5e40897bfac"   // 需要撤单的哈希
}

// 组装需要签名的数据
var rawTx = {
	from:'e523e7c59a0725afd08bc9751c89eed6f8e16dec',								// 撤单发起地址
	to: '0x00000000000000000000000000000000766f7465',								// 系统默认地址，不能更改
	value: "0",																		// 默认为0
	data: read_data(cancelData),												// cancelOrderData的编码数据	
	gasPrice: '0x5',																// gas的单价
	gas:"0xa006c85beff"																// gas的数量		
}

// 撤单数据编码
function read_data(data){
	var data1 = [data.type, data.subscription, data.m_hash];						// 读取数据，[]包裹数据，为编码数据做准备
	var data2 = RLP.encode(data1);                                                  // 一次编码
	var data3 = '0x' + buf2hex(data2);												// 转码
	var data4 = [data3];															// []包裹数据，为编码数据做准备		
	var data5 = RLP.encode(data4);   												// 二次编码
	var data6 = '0x' + buf2hex(data5);	                                            // 转码
	
	console.log("***************data6:", data6);
	return data6;
}


function buf2hex(buffer) { // buffer is an ArrayBuffer
  return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
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

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

