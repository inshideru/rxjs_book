var onMove = Rx.Observable.fromEvent(document, 'mousemove');
// var subscriber1 = onMove.subscribe(function(e) {
//     console.log('Subscriber 1: ', e.clientX, e.clientY);
// });
// var subscriber2 = onMove.subscribe(function(e) {
//     console.log('Subscriber 2:', e.clientX, e.clientY);
// });

function printValue(value) {
    console.log(value);
}

var rangeToFive = Rx.Observable.range(1,5);
var obs1 = rangeToFive.subscribe(printValue);

var obs2 = Rx.Observable.range(1,5)
    .delay(2000)
    .flatMap(function() {
        return rangeToFive.subscribe(printValue);
    });

var source = Rx.Observable.interval(2000);
var observer1 = source.subscribe(function(x) {
    console.log('Observable 1, next value: ' + x);
});

var observer2 = source.subscribe(function(x) {
    console.log('Observer 2: next value: ' + x); 
});

var source = Rx.Observable.interval(1000);
var observer1 = source.subscribe(function(x) {
    console.log('Osbserver 2:' + x);
});

setTimeout(function() {
    var observer2 = source.subscribe(function(x) {
        console.log('Observer 2: ' + x);
    });
}, 3000);