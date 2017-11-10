function isPalindrome(s) {
    console.log(s.split("").reverse().join(""))
    return s = s.split("").reverse().join("") ? true : false;
}
console.log(isPalindrome("noon"));





// function palindrome(str) {
//     var len = str.length;
//     var loopLength =Math.floor(str.length/2);
//     for(var i=0; i <loopLength;i++ ) {
//         if(str[i] !== str[len - 1 - i]) {
//             return false;
//         }  
//         return true;
//     }
  

// }

// palindrome([1,2,1]);