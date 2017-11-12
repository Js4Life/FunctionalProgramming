var myObject = function() {
	var value = 0;

	return {
		increment:function(inc) {
			return value += typeof inc === 'number' ? inc : 1;
		} ,
		getValue : function() {
			return value;
		}
	}
}();
console.log(myObject.increment('a'));