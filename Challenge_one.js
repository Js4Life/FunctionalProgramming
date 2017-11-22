 o = new Object();

 o.prop = 'exists';

 function changeO() {
 	o.newprop = o.prop;
 	delete o.prop;
 }

console.log(o.hasOwnProperty('prop'));

changeO();

console.log(o.hasOwnProperty('prop'));












// var obj = Object.create({foo:1},{
// 	bar:{
// 		value:2
// 	},
// 	baz:{
// 		value:3,
// 		enumerable:true
// 	}
// });

// var copy = Object.assign({},obj);
// console.log(copy);













// function test() {
// 	'use strict';
// 	let obj1 = {a:0,b:{c:0}};
// 	let obj3 = JSON.parse(JSON.stringify(obj1));
// 	console.log(obj3);
// 	obj1.a = 4;
// 	obj1.b.c = 4;
// 	console.log(obj3);
// 	console.log(JSON.stringify(obj3));

// }

// test();







// var obj = { a : 1};
// var copy = Object.assign({},obj);
// console.log(copy);




// var log= console.log

//  function add(first,second) {
// 	return first + second;
// }

//  function mul(first,second) {
// 	return first * second;
// }

// function curry(binary , first) {
// 	return function(second) {
// 		return binary(first , second);
// 	}
// }










// function liftf(binary) {
// 	return function(first) {
// 		return function (second) {
// 			return binary(first,second);
// 		}
// 	}
// }

// var addf = liftf(add);
// addf(3)(4);
// log(liftf(mul)(5)(6));














// function addf(first) {
// 	return function(second) {
// 		return first + second;
// 	}
// }

// log(addf(3)(4));

















// function add(first,second) {
// 	return first + second;
// }

// log(add(2,3));

// function identityf(x) {
// 	return function() {
// 		return x;
// 	};
// }

// log(identityf(3));













// function swap(a,b) {
// 	var temp = a; //temp 1
// 	a = b; // a is 2
// 	b = temp; // b = 1
// }

// var x = 1,y=2;
// swap(x,y);
// log(x);



// function funky(o) {
// 	o = null;
// }

// var x = [];
// funky(x);

// log(x);




// function indentity(x) {
// 	return x;
// }

// console.log(indentity(3));