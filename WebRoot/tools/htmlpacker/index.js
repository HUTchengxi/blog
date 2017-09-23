$(function(){
  $("#html_compress_btn").click(function(){
    var source = $("#source").val();
    var sourceLength = source.length;
	if(sourceLength==0){
		alert("待压缩的HTML不能为空！");
		return;
	}
    var rep = /\n+/g;
    var repone = /<!--.*?-->/ig;
    var reptwo = /\/\*.*?\*\//ig;
    var reptree = /[ ]+</ig;
    var sourceZero = source.replace(rep,"");
    var sourceOne = sourceZero.replace(repone,"");
    var sourceTwo = sourceOne.replace(reptwo,"");
    var sourceTree = sourceTwo.replace(reptree,"<");
    $("#result").val(sourceTree);
	var resultLength = sourceTwo.length;
	var range = 100-(resultLength/sourceLength*100);
	$("#old").text(sourceLength);
    $("#new").text(resultLength);
	$("#range").text(range.toFixed(2));
    }
  );
});