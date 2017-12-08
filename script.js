function showHelp(help) {
  document.getElementById('help').innerHTML = help;
}

function makeHelpCallback(help) {
  return function() {
    showHelp(help);
  };
}

function setupHelp() {
  var helpText = [
      {'id': 'email', 'help': 'Your e-mail address'},
      {'id': 'name', 'help': 'Your full name'},
      {'id': 'age', 'help': 'Your age (you must be over 16)'}
    ];

  for (var i = 0; i < helpText.length; i++) {
    var item = helpText[i];
    document.getElementById(item.id).onfocus =
       makeHelpCallback(item.help);
  }
}

setupHelp();













// function showHelp(help) {
// 	document.getElementById('help').innerHTML = help;
// }

// function makeHelpCallback(help) {
// 	return function() {
// 		showHelp(help);
// 	}
// }

// function setupHelp() {
// 	var helpText = [{'id':'email','help':'Your email address'},{'id':'name','help':'your full name'},{'id':'age','help':'your age (you must over 16)'}];
// for(i = 0 ; i < helpText.length ; i++) {
// 	var item = helpText[i];
// 	document.getElementById(item.id).onfocus = makeHelpCallback(item.help);
// }

// }

// setupHelp();
























// var makeCounter = function() {
// 	var privateCounter = 0;
// 	function changeBy(val) {
// 		privateCounter += val;
// 	}

// 	return {
// 		increment:function() {
// 			changeBy(1);
// 		},
// 		decrement:function() {
// 			changeBy(-1);
// 		},
// 		value:function(){
// 			return privateCounter;
// 		}
// 	}
// }

// var counter1 = makeCounter();
// var counter2 = makeCounter();
// alert(counter1.value());
// counter1.increment();
// counter1.increment();

// alert(counter1.value());

// counter1.decrement();
// alert(counter1.value());










































// var counter = (function(){
// 	var privateCounter = 0 ;
// 	function changeBy(val) {
// 		privateCounter += val;
// 	}

// 	return {
// 		increment:function() {
// 			changeBy(1);
// 		} ,
// 		decrement:function() {
// 			changeBy(-1);
// 		},
// 		value:function(){
// 			return privateCounter;
// 		}
// 	}
// })();

// console.log(counter.value());

// counter.increment();
// counter.increment();

// console.log(counter.value());

// counter.decrement();

// console.log(counter.value());
























// function makeSizer(size) {
//   return function() {
//     document.body.style.fontSize = size + 'px';
//   };
// }

// var size12 = makeSizer(12);
// var size14 = makeSizer(14);
// var size16 = makeSizer(16);

// document.getElementById('size-12').onclick = size12;
// document.getElementById('size-14').onclick = size14;
// document.getElementById('size-16').onclick = size16;










// function makeAdder(x) {
// 	return function(y) {
// 		return x + y;
// 	}
// }

// var add5 = makeAdder(5);
// var add10 = makeAdder(10);

// alert(add5(6));
// alert(add10(3));











// function makeFunc() {
// 	var name = 'Mozilla';

// 	function displayName() {
// 		alert(name);
// 	}
// 	return displayName;
// }

// var myFunc = makeFunc();

// myFunc();





















// function init() {
// 	var name = 'Mozilla';

// 	function displayName() {

// 		alert(name);
// 	}
// 	displayName();
// }

// init();