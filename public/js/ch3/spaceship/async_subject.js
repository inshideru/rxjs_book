var delayedRange = Rx.Observable.range(0, 5).delay(1000);
var subject = new Rx.AsyncSubject();

delayedRange.subscribe(subject);

subject.subscribe(
    function onNext(item) { console.log('Value: ' + item); },
    function onError(err) { console.log('Error: ' + e.message); },
    function onCompleted() { console.log('onCompleted'); }
);

function getUsers(url) {
    var subject;
    return Rx.Observable.create(function (observer) {
        if (!subject) {
            /**
             * Rx.AsyncSubject()
             * Processa todos os valores da sequência,
             * mas emite e guarda apenas o último
             */
            subject = new Rx.AsyncSubject();
            Rx.DOM.get(url).subscribe(subject);
        }
        return subject.subscribe(observer);
    });
}

var users = getUsers('http://jsonplaceholder.typicode.com/users');
// Will trigger request and receive the response when read
users.subscribe(
        function onNext(result) { console.log('Result 1:', result.response); },
        function onError(error) { console.log('ERROR', error); }
    )

// Will receive the result immediately because it's cached
setTimeout(function () {
    users.subscribe(
        function onNext(result) { console.log('Result 2:', result.response); },
        function onError(error) { console.log('ERROR', error); }
    );
}, 5000);