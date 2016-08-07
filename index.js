const Rx = require('rx');

Rx.Observable.just('Hello World!').subscribe(value => {
    console.log(value);
})