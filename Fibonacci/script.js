var arr = [0,1];
for(var i=2;i<=10;i++) {
    arr[i] = arr[i-2] + arr[i-1];
    console.log('fibonaci series till 10 ',arr[i]);
}