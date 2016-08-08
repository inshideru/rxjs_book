var a = Rx.Observable.interval(1000)
    .map(function (i) {
        return '=> A' + i;
    });

var b = Rx.Observable.interval(2000)
    .map(function (i) {
        return 'B' + i;
    });

// Rx.Observable.merge(a, b).subscribe(function(x){
//     console.log(x);
// })

var logValue = function (val) { console.log(val) };

// JS Arrays
var src = [1, 2, 3, 4, 5];

var upper = src.map(function (name) {
    return name * 2;
});

// upper.forEach(logValue);

src = Rx.Observable.range(1, 5);
upper = src.map(function (name) {
    return name * 2;
});

// upper.subscribe(logValue);

var isEven = (function (val) { return val % 2 == 0; });

src = [1, 2, 3, 4, 5];
var even = src.filter(isEven);
even.forEach(logValue);

src = Rx.Observable.range(1,5);
even = src.filter(isEven);
even.subscribe(logValue);