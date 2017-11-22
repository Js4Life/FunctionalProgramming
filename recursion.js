function pass(x) {
  if (x < 0) return;
  if (x === 10) return 1;
  return 1+ pass(x + 1);
}
console.log(pass(1));





// function countDown(n) {
// 	console.log(n);
// 	if(n >=1) countDown(n-1);
// }
// countDown(10);