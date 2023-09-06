let currColumn = 0
let currRow = 0
let space;
let corrects = 0;
let endgame = document.getElementById("endGame");

const words = ['GAMBA','CHETO','GARCA','BIRRA','GORRA','CRACK','TOMBA','VELEZ',
'CORRE','WACHO','PERRO','PORRO','TRUCO','DULCE','CHAPE','CALLE','IDOLO','GLOBO',
'BOMBA','CAGAR','COMPA','MERCA','CIBER','TANGA','MATES','DIEGO','MESSI', 'TIMBA']

let word = words[Math.floor(Math.random()*words.length)]

const wordReveal = document.getElementById("wordReveal")

wordReveal.textContent = `LA PALABRA ERA: ${word}`

function EndGame(){
    endgame.style.visibility = "visible";
    if(corrects == 5){
        document.getElementById("status").textContent = "GANASTE PAPÁAA"
    }else{
        document.getElementById("status").textContent = "PERDISTE PUTOOO"
    }
}

function ReloadPage(){
    location.reload()
}

window.addEventListener("keyup", ()=>{
    if(event.keyCode != 8 && event.keyCode != 13){
        //Si no es ni enter ni backspace
        if(currRow<5){
            if(space != null){
                space.style.border = "none"
                space.style.animation = ""
            } 
            space = document.getElementById(`column_${currColumn}:row_${currRow}`);
            space.style.border = "2px solid black"
            space.style.animation = "spaceAnim 0.5s forwards 0.1s infinite"
            currRow++;
            space.textContent = event.key.toUpperCase();
        }
        
    }else if (event.keyCode == 8){ //backspace
        if(space != null){
            space.style.border = "none"
            space.style.animation = ""
        } 
        if(currRow>0) currRow--;
        space.textContent = ""
        space = document.getElementById(`column_${currColumn}:row_${currRow}`);
        space.style.border = "2px solid black"
        space.style.animation = "spaceAnim 0.5s forwards 0.1s infinite"

    } else if(event.keyCode == 13){//enter
        for(let x = 0; x<5 ; x++){//Chequeando que es lo que esta bien
            let currspace = document.getElementById(`column_${currColumn}:row_${x}`)
            if (currspace.textContent == word[x]){
                currspace.style.backgroundColor = "green";
                currspace.style.color = "white";
                corrects++
            }
            else if(word.includes(currspace.textContent)){
                currspace.style.backgroundColor = "yellow";
                currspace.style.color = "black";
            }else{
                currspace.style.backgroundColor = "darkslategray";
                currspace.style.color = "white";
            }
        }
        if(corrects == 5){
            EndGame()
        }else{
            corrects = 0//reiniciamos el chequeo de win
            currColumn++
            if(currColumn>4){//se te acabaron las columns
                EndGame()
            }
            currRow = 0;//posicionamos
            if(space != null){
                space.style.border = "none"
                space.style.animation = ""
            } 
            space = document.getElementById(`column_${currColumn}:row_${currRow}`);
            space.style.border = "2px solid black"
            space.style.animation = "spaceAnim 0.5s forwards 0.1s infinite"
        }
       
    }
})