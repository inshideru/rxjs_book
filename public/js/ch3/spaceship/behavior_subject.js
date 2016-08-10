var preFormated = document.getElementById('formated');
var subject = new Rx.BehaviorSubject('Waiting for content');

subject.subscribe(
    function(result) {
        preFormated.textContent = result.response || result;
    },
    function(err) {
        preFormated.textContent = 'There was an error retrieving content';
    }
);

Rx.DOM.get('http://jsonplaceholder.typicode.com/users')
    .subscribe(subject);
