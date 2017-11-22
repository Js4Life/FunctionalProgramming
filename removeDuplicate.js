function removeDuplicate(arr) {
	var newArr = [];


	newArr = arr.filter(function(item,index,inputArray){
		return inputArray.indexOf(item) == index;
	})

	 return newArr;
}

console.log(removeDuplicate([1,3,4,4,5]));