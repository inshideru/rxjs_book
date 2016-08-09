// Pipeline
var pipeline = Rx.Observable
    .from([1, 2, 3, 4, 5, 6, 7, 8, 9])
    .filter(function (val) { return val % 2; })
    .map(function (val) { return val * 10; });

pipeline
    .subscribe(function (val) {
        //console.log(val);
    });

// State
// var evenTicks = 0;

// function updateDistance(i) {
//     if (i % 2 === 0) {
//         evenTicks += 1;
//     }
//     return evenTicks;
// }

function updateDistance(acc, i) {
    if (i % 2 === 0) {
        acc += 1;
    }
    return acc;
}

var ticksObservable = Rx.Observable
    .interval(1000)
    .take(5)
    .scan(updateDistance, 0)
    ;

ticksObservable.subscribe(function(evenTicks) {
    console.log('Subcriber 1 - evenTicks: ' + evenTicks + ' so far');
});

ticksObservable.subscribe(function(evenTicks) {
    console.log('Subcriber 2 - evenTicks: ' + evenTicks + ' so far');
})