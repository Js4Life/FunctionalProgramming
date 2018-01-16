var value = 500 ;
var obj = {
	value:0,
	increment:function() {
	this.value++;
	var innerFunction = function() {
		alert(this.value);
	}
	innerFunction();
}
obj.increment();