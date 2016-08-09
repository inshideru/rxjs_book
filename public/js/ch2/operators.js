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

src = Rx.Observable.range(1, 5);
even = src.filter(isEven);
even.subscribe(logValue);

src = [1, 2, 3, 4, 5];
var sum = src.reduce(function (a, b) {
    return a + b;
});

console.log(sum);

src = Rx.Observable.range(1, 5);
sum = src.reduce(function (acc, x) {
    return acc + x;
});

sum.subscribe(logValue);

var avg = Rx.Observable.range(0, 5)
    .reduce(function (prev, cur) {
        return {
            sum: prev.sum + cur,
            count: prev.count + 1
        };
    },
    // Um Objeto como valor inicial
    { sum: 0, count: 0 })
    .map(function (o) {
        return o.sum / o.count;
    });

var subscription = avg.subscribe(function (x) {
    console.log('Average is: ', x);
});

var avg = Rx.Observable.interval(1000)
    .scan(function (prev, cur) {
        return {
            sum: prev.sum + cur,
            count: prev.count + 1
        };
    }, { sum: 0, count: 0 })
    .map(function (o) {
        return o.sum / o.count;
    });

// subscription = avg.subscribe(function (x) {
//     console.log(x);
// });

function concatAll(source) {
    return source.reduce(function(a, b) {
        return a.concat(b);
    });
}

//console.log(concatAll([[0,1,2],[3,4,5],[6,7,8]]))

var counter = Rx.Observable.interval(1000);

var subscription1 = counter.subscribe(function(i) {
    console.log('Subscription 1: ',i);
});

var subscription2 = counter.subscribe(function(i) {
    console.log('Subscription 2: ',i);
});

setTimeout(function() {
    console.log('Canceling subscription2!');
    subscription2.dispose();
},2000)