// var p = new Promise(function(resolve,reject) {
//     window.setTimeout(resolve,5000);
// });

// p.then(function(){
//     console.log('Potential side effect!');
// });

// var subscription = Rx.Observable.fromPromise(p).subscribe(function(msg){
//     console.log('Observable resolved!');
// });
// subscription.dispose();

function getJSON(arr) {
    return Rx.Observable.from(arr).map(function (str) {
        var parsedJSON = JSON.parse(str);
        return parsedJSON;
    });
}

// getJSON([
//     '{"1":1, "2": 2}',
//     '{"success: true}', // Invalid JSON string
//     '{"enabled": true}'
// ]).subscribe(
//     function(json) {
//         console.log('Parsed JSON: ', json);
//     },
//     function(err) {
//         console.err(err.message);
//     }
// )

var caught = getJSON(['{"1":1, "2:2}', '{"1":1}']).catch(
    Rx.Observable.return({
        error: 'There was an error parsin JSON'
    })
);

caught.subscribe(
    function (json) {
        console.log('Parsed JSON: ', json);
    },
    // Because we catch errors now, 'onError' will not be executed
    function (e) {
        console.log('ERROR', e.message);
    }
);

// This will try to retrieve the remote URL up to 5 times.
Rx.DOM.get('http://jsonplaceholder.typicode.com/users').retry(5)
    .subscribe(
    function (xhr) { console.log(JSON.parse(xhr.response)); },
    function (err) { console.error('ERROR', err); }
    );
