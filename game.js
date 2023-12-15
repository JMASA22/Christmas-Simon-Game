// 1.3. Comprovar q està ben vinculat js
//alert ("Funciona");
debugger;

// 2.3. Crear llista (array) de colors 
var botoColors = ["santa", "cervol", "arbre", "galeta"]; // buttonColours

// 2.5. Crear nova llista buida "patroJoc"
var patroJoc = []; // gamePattern

// 4.3. Crear llista  buida "usuariClicksPatro"
var usuariClicksPatro = []; // userClickedPattern

var started = false;

// 7.2. Crear nova variable "Nivell"
var nivell = 0;

// 7.1. Utilitzar jQuery per detectar q hem clicat una tecla, quan passi per 1er cop cal cridar la funció "nextSequencia"
$(document).keydown(function (){ // keypress o keydown?
    if (!started){
        // 7.3. h1 inicial "Prem una Tecla per Començar" quan comenci el joc canviar a "Nivell 0".
        $("#titol-nivell").text("Nivell " + nivell);
        nextSequencia ();
        started = true;
    }
});

// 4.1. jQ per detectar botó q he clicat i iniciar funció
$(".btn").click(function() {

    // 4.2. Crear variable "userTriaColor" per emmagatzemar id que he clicat
    // .attr() Per obtenir el valor d'un atribut del primer element del conjunt d'elements coincidents o per establir un o més atributs per a cada element coincident.
    // this: per dir "allò que estic clicant"
    var userTriaColor = $(this).attr("id"); // userChosenColour

    // 4.4. Afegir contingut var "userTriaColor" per crear un nou "userPatroClicat" amb .push (com amb el "PatroJoc.push(radnomColor;)")
    usuariClicksPatro.push(userTriaColor);

    // 5.1. Cridem la funció per posar audio a les tecles clicades "playSo"
    playSo(userTriaColor);
    animacioPress(userTriaColor);

    //8.2. Després que un usuari hagi fet clic i hagi escollit la seva resposta, 
    //passar l'última resposta de la seqüència de l'usuari.
    //No entenc aquesta línia de codi realment:
    resposta(usuariClicksPatro.length-1);
    });

//8.1. Creem funcio després q l'usuari hagi fet click 
function resposta (actualNivell){

    // 8.3. Generar un "if" dins de "resposta" per comprovar si la derrere resposta de l'usuari és la mateixa que la del patró del joc. 
    //Si és així, dir "èxit", en cas contrari "malament"
    if (patroJoc[actualNivell] === usuariClicksPatro[actualNivell]) {
        console.log("èxit");
        // 8.4. Si l'usuari ha respost correctament, hauriem d¡acabat la seva seqüència amb una altra instrucció "if".
        if (usuariClicksPatro.length === patroJoc.length){
            
            //8.5. Crida nextSequencia() passats 1000 millisecond
            setTimeout(function () { 
                nextSequencia();
            }, 1000);
        }
    } else {
        console.log("malament");
        // 9.1. play so "malament.mp3"
        playSo("malament");
        
        //9.2. a l'arxiu styles.css, hi h ala classe "game-over", aplica-la quan l'usiari s'equivoqui i para-la quan hagis passat 200 milisegons
        $("body").addClass("game-over");
        setTimeout(function () {
        $("body").removeClass("game-over");
        }, 1000);

        //9.3. canvia el text h1 per dir "Joc Finalitzat, Prem una Tecla per Tornar a Començar" si l'usuari s'qeuivoca.
        $("#titol-nivell").text("Joc Finalitzat! Prem una tecla per tornar a començar");

        //10.2. crida tornarComencar() si l'usuari s'qeuivoca.
        tornarComencar();
    }
}

/*function respostaMalament (){
    if (patroJoc[actualNivell] != usuariClicksPatro[actualNivell]) {

    }
    //$ ("#" + araColor).addClass("pressed");
}*/

// 2.1. Creem nova funció q es dirà "nextSequencia"
function nextSequencia() {

    //8.6. un cop nextSequencia() està funcionant, reseteja "usuariClicksPatro" com una llista buida preparada pel següent nivell.
    usuariClicksPatro = [];
    
    // 7.4. Incrementem un nivell per cada nova seqüència
    nivell++;

    // 7.5. Apliquem modificació de text a h1 per cada nivell de més:
    $("#titol-nivell").text("Nivell " + nivell);

    // 2.2. dins de la funció generem un número randoom entre 0-3 i l'emmagatzamen en una variable (var)
    var randomNum = Math.floor(Math.random()*4); //"Math.floor(Math.random() * 4);" -> posar això a la consola de chrome per veure si funciona

    // 2.4. crear nova var "randomColor" i utilitzem "randomNum" per triar un color a l'atzar de la llista "botoColor"
    var randomColor = botoColors [randomNum];

    // 2.6. creem un nou "randomColor" aleatori/atzar (alias random) a partir de la var "PatroJoc" amb ".push"
    patroJoc.push(randomColor);

    // 3.1. Utilitzqar jQuery per seleccionar un botó amb el mateix ID (#) q el "randomColor"
    // 3.2. Utilitzqar jQuery per fer pampallugues al botó selecionat.
    $("#" + randomColor).fadeIn(100).fadeOut(100).fadeIn(100);

    // 5.4. Cridem la funció per posar audio al color random que hagi sortit
    playSo(randomColor);
}

// 5.2. Creem una nova funció per posar so en funció del botó clicat.
function playSo(nom){
    // 3.3. Play audio depenent del color clicat.
    var audio = new Audio("sounds/" + nom + ".mp3");
    audio.play();
}

// 6.1. Crear funcio "animacioPress" per la duració de l'input de l'animació del botó clicat "araColor"
function animacioPress (araColor){
    
    //6.2. Utilitza jQuery per afegir acció .pressed del css quan cliquem
    $ ("#" + araColor).addClass("pressed");
    
    // 6.3. Acció d'animació deixi d'actuar passats 100 milisegons després d'apretar el botó    
    setTimeout (function(){
        $ ("#" + araColor).removeClass("pressed");
    }, 100);
}

//10.1. Crear nova funcio "tornarComencar"
function tornarComencar (){
    
    //10.3. Resetejar valors del "patroJoc" i de les variables
    nivell = 0;
    patroJoc = [];
    started = false;
}