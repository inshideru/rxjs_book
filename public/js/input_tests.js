function mask(inputName, mask, evt) {
    try {
        var text = document.getElementById(inputName);
        var value = text.value;

        // Se o usuário pressionou DEL ou BACKSPACE, limpe o campo
        try {
            var e = (evt.which) ? evt.which : event.keyCode;
            if (e == 46 || e == 8) {
                text.value = "";
                return;
            }
        } catch (e1) { }

        var literalPattern = /[0\*]/;
        var numberPattern = /[0-9]/;
        var newValue = "";

        for (var vId = 0, mId = 0; mId < mask.length;) {
            if (mId >= value.length)
                break;

            // Esperado número mas recebeu valor diferente, guardar somente parte válida
            if (mask[mId] == '0' && value[vId].match(numberPattern) == null) {
                break;
            }

            // Encontrou valor literal
            while (mask[mId].match(literalPattern) == null) {
                if (value[vId] == mask[mId])
                    break;

                newValue += mask[mId++];
            }

            newValue += value[vId++];
            mId++;
        }

        text.value = newValue;
    } catch (e) { }
}

function cleanInput(inputName, mask, event) {
    var inputField = document.getElementById(inputName);
    var value = inputField.value;

    var literalPattern = /[0\*]/;
    var numberPattern = /[0-9]/;
    var newValue = "";

    //console.log(event.keyCode);
    event.target.value.split().filter(function(e){
        return event.keyCode != 8 && event.keyCode != 46;
    })
    .map(function(value, index, arr) {    
        return value + ' <= ';
    })
    .forEach(function(char){
        console.log(char);
    })
}

//var inputField = document.getElementById('value');

// inputField.addEventListener('keydown', cleanInput);
// inputField.addEventListener('keyup', cleanInput);