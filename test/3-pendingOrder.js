var Web3 = require('web3')
var RLP = require('./node_modules/web3-eth/node_modules/rlp')
var web3 = new Web3('http://39.104.206.147:8081')


web3.eth.getBlockNumber(function (error, result) {
  if(!error) {
  	console.log(" ******************************** 获取区块高度 *******************************************")
    console.log("getBlockNumber:", result);
  }
})

web3.eth.getBalance("0x41ff923c81d7a47f262f9fca7359014cdc19c7f7").then(function(result){
	console.log(" ******************************** 查询地址余额信息 ****************************************")
	console.log("address 0x41ff923c81d7a47f262f9fca7359014cdc19c7f7 info:", result)
})

/*
注 : (1)当m_buy_type为1时，m_num和m_price不能为0；
     (2)当m_buy_type为0时，m_num不为0，m_pirce为0
     (3)以市价挂单时(即m_buy_type为0时)，交易池中需要有能将其撮合成功的对应的单，否则，校检不能通过，导致不能挂单
	 (4)当m_buy_type为1时，m_price为买、卖每个BRC或cookie的单价
     (5)当m_buy_type为0时，m_price为买、卖BRC或者cookie的总价


*/
var pendingData	= {
	"type":3,														// 类型，3表示挂单
	"m_from":"0x41ff923c81d7a47f262f9fca7359014cdc19c7f7",			// 挂单地址
	"m_type":2,      												// 买卖类型(1 : 卖，2 : 买)  	   											
	"m_token_type":1,												// 买卖类型(1 : 卖，2 : 买)											
	"m_buy_type":1,													// 价格类型(0 : 市价, 1 : 限价) 
	"m_num":"0xaaaaa",												// 买、卖的数量(即BRC或cookie) 
	"m_price":"0x1"													// 单价或者总价			
}

// 组装需要签名的数据
var rawTx = {
	from:'0x41ff923c81d7a47f262f9fca7359014cdc19c7f7',				// 挂单发起地址
	to: '0x00000000000000000000000000000000766f7465',				// 系统默认地址，不能更改
	value: "0",														// 默认为0
	data: read_data(pendingData),                                   // pendingData的编码数据	
	gasPrice: '0x5',												// gas的单价
	gas:"0xa006c85beff"												// gas的数量
}

// 挂单数据编码
function read_data(data){
	var data1 = [data.type, data.m_from, data.m_type, data.m_token_type, data.m_buy_type, data.m_num, data.m_price];	// 读取数据，[]包裹数据，为编码数据做准备
	var data2 = RLP.encode(data1);																						// 一次编码
	var data3 = '0x' + buf2hex(data2);																					// 转码
	var data4 = [data3];																								// []包裹数据，为编码数据做准备		
	var data5 = RLP.encode(data4);																						// 二次编码
	var data6 = '0x' + buf2hex(data5);																					// 转码
	
	console.log("***************data6:", data6);
	return data6;
}


function buf2hex(buffer) { // buffer is an ArrayBuffer
	return Array.prototype.map.call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2)).join('');
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

function sleep(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime)
            return;
    }
}

