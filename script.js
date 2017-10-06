function check_Palindrome() {

    var revStr = "";
    var str = document.getElementById("str").value;

    var i = str.length;
    console.log(i);
    for( var j = i;j>=0;j--) {
        // document.write(str.charAt(j));
        revStr = revStr + str.charAt(j);
    }

    if(str == revStr) {
        alert('the given number is palindrome');
       
    }  
    else {
    alert('the number is not palindrome');
    }

}














// function rev(n) {
// n = n + "";
// console.log(n); //printing 123 but needed "123" ?
//     return n.split("").reverse().join("");
// }
// console.log(rev(123));