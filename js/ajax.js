numQuestion = 0;
correctAnswers = 0;
results = {}; // Parte del JSON devuelto que contiene las preguntas...

window.onload = function() {
    openTrivia();
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

function openTrivia() {

    /* Inicializar un objeto AJAX */
    var ajax = objetoAjax();
    ajax.open("GET", "https://opentdb.com/api.php?amount=10&category=18", true);
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            /* Leerá la respuesta que es devuelta por el controlador: */
            results = respuesta.results;
            console.log(results);
            question();
        }
    }
    ajax.send();
}

function question() {
    var quizz = document.getElementById('quizz');
    var recarga = '';

    /* si es una pregunta de true or false solo mostrará dos botones*/
    if (results[0]["type"] == 'boolean') {
        numQuestion++;
        recarga += '<h1>PREGUNTAS HISTORIA</h1>'
        recarga += '<p>' + results[0]["question"] + '</p>'
        recarga += '<button type="button" class="btn btn-primary btn-lg btn-block" onclick="checkAnswer(this)">' + results[0]["correct_answer"] + '</button>'
        recarga += '<button type="button" class="btn btn-primary btn-lg btn-block" onclick="checkAnswer(this)">' + results[0]["incorrect_answers"][0] + '</button>'
        recarga += '<button type="button" class="btn btn-secondary btn-lg btn-block" onclick="openTrivia()">Siguiente</button>'
        quizz.innerHTML = recarga;

        /* cuando el número de preguntas llegue a 10 el programa terminará y mostrará el resultado final */
    } else if (numQuestion == 10) {

        recarga += '<h1>FINAL!!!</h1><br>';
        recarga += '<h3>Respuestas correctas = ' + correctAnswers + '</h3><br>';
        recarga += '<h2>Quieres volver a jugar?</h2><br>';
        recarga += '<button class="btn btn-dark" onclick="location.reload()">JUGAR</button>';
        quizz.innerHTML = recarga;

        /* si no, mostrará la pregunta con 4 respuestas */
    } else {
        numQuestion++;
        recarga += '<h1>QUIZZ</h1>'
        recarga += '<p>' + results[0]["question"] + '</p>'
        recarga += '<button type="button" class="btn btn-primary btn-lg btn-block" onclick="checkAnswer(this)">' + results[0]["correct_answer"] + '</button>'
        recarga += '<button type="button" class="btn btn-primary btn-lg btn-block" onclick="checkAnswer(this)">' + results[0]["incorrect_answers"][0] + '</button>'
        recarga += '<button type="button" class="btn btn-primary btn-lg btn-block" onclick="checkAnswer(this)">' + results[0]["incorrect_answers"][1] + '</button>'
        recarga += '<button type="button" class="btn btn-primary btn-lg btn-block" onclick="checkAnswer(this)">' + results[0]["incorrect_answers"][2] + '</button>'
        recarga += '<button type="button" class="btn btn-secondary btn-lg btn-block" onclick="openTrivia()">Siguiente</button>'
        quizz.innerHTML = recarga;
    }
}

/* revisar si la respuesta es correcta o incorrecta */
function checkAnswer(variable) {
    var correcta = results[0]["correct_answer"];
    if (correcta == variable.innerHTML) {
        correctAnswers++;
        variable.style.backgroundColor = "green";
        boton = document.getElementsByClassName("btn btn-primary btn-lg btn-block");
        for (let i = 0; i < boton.length; i++) {
            boton[i].disabled = true;
        }
    } else {
        variable.style.backgroundColor = "red";
        boton = document.getElementsByClassName("btn btn-primary btn-lg btn-block");
        for (let i = 0; i < boton.length; i++) {
            boton[i].disabled = true;
        }
    }
}