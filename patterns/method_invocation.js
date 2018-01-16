var obj = {
	value:0,
	increment: function() {
		this.value += 1;
	}
}

obj.increment();
obj.increment();
obj.increment();
console.log(obj.value);