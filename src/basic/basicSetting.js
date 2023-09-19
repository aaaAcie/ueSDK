const { emitUIInteraction } = require('./app')

function myHandleResponseFunction(data) {
	switch (data) 
	{
    case "MyCustomEvent":
      console.log("44444444444")
		default:
			var obj = JSON.parse(JSON.stringify(data))
      console.log('收到消息：',obj.data1)
	}
	
	//接收UE4的消息
	if (data.substring("1080p")) {
		// UE4 only supports up to 1080p, not 4K.
		console.log("Disabling 4k button");
		let button4K = document.getElementById("4k");
		button4K.disabled = true;
		button4K.title = "4K is supported only when -NvEncH264ConfigLevel=NV_ENC_LEVEL_H264_52 UE4 is added to UE4 command line";
	}
}
function setRes(width, height) {
	let descriptor = {
		Console: 'r.' + 'setres ' + width + 'x' + height + 'w'
	}
	emitUIInteraction(descriptor)
	console.log(descriptor)
}
module.exports = {
  myHandleResponseFunction,
	setRes
}