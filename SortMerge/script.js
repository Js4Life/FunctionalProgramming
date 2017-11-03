function MergeSort(arr) {
    if(arr.length === 1) {
        return arr;          // because it is Single element
    }

    
    const middle = Math.floor(arr.length / 2);  // get middle item of the array rounded down to nearest value

    const left = arr.slice(0,middle); // items on left side
    const right = arr.slice(middle);  // items on right side
    console.log('left' , left ,'right', right);

    return merge(MergeSort(left),MergeSort(right));  // merge the sorted value

}

function merge(left,right) {
    let result = [];
    let indexLeft = 0;
    let indexRight = 0;  //Initialize values

    while(indexLeft < left.length && indexRight < right.length) {
          if(left[indexLeft] < right[indexRight]) {
              result.push(left[indexLeft]);
              indexLeft++
          } else {
              result.push(right[indexRight]);
              indexRight++
          }
    }

    return result.concat(left.slice(indexLeft)).concat((right.slice(indexRight)));
    
}

const list = [2,3,4,5,1,2,3,5,7];
console.log(MergeSort(list));