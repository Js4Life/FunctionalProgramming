var stringValue = "0,1,2,4,5";

var array = stringValue.split(",");

var newArr =array.forEach(function(element) {
	console.log(element);
})

console.log(newArr);