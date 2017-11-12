


// Functional Scope  in Javascript unlike Block Scope
var foo = function() {
	var a =3,b=5;
	console.log('value of a :',+a,',Value of b :',+b);

	var bar = function() {
		var b = 7 , c = 11;
		console.log('value of a :',+a,',Value of b :',+b,'Value of c :', +c);

		a += b + c;

		console.log('value of a :',+a,',Value of b :',+b,'Value of c :', +c);

	}
	console.log('value of a outer :',+a,',Value of b outer :',+b);

	bar();
	console.log('value of a2 inner :',+a,',Value of b inner :',+b,);
}

foo();

























// Recursion

// var hanoi = function (disc,src,aux,dst) {
// 	if (disc > 0) {
// 		hanoi(disc -1,src,dst,aux);
// 		// document.writeln('move disc' + disc + 'from ' + src + 'to' +dst);
// 		hanoi(disc - 1,aux,src,dst);
// 	}
// }

// console.log(hanoi(3,'Src','Aux','Dst'));

// var hanoi = function (disc, src, aux, dst) {
// if (disc > 0) {
// hanoi(disc - 1, src, dst, aux);
// // document.writeln('Move disc ' + disc +
// // ' from ' + src + ' to ' + dst);
// hanoi(disc - 1, aux, src, dst);
// }
// };
// console.log(hanoi(3, 'Src', 'Aux', 'Dst'));







// console.log('a'+'b'+'c');
// console.log('cat'.toUpperCase());

// function throwAct() {
// 	throw "typo error"
// }

// console.log(throwAct());