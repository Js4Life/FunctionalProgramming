function factorials(x) {
    if(x == 0) {
        return 1;
    }
    return x * factorials(x - 1);
}

function clickit(number) {
    alert(factorials(parseInt(number,10)));
}