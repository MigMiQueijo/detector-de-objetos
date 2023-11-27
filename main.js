let gato
let statusM = false
let resultados = []
function preload(){
    gato = loadImage("gatocao.jpg")
}

function setup(){
    createCanvas(400, 400)
    objectDetector = ml5.objectDetector("cocossd", modelLoaded)
    document.getElementById("status").innerHTML = "Procurando objeto"
}

function draw(){
    image(gato, 0, 0, 400, 400)
    if (statusM) {
        for(var i = 0; i<resultados.length; i++ ){
            document.getElementById("status").innerHTML = "Objeto encontrado"
            fill("blue")
            porcentagem = Math.floor(resultados[i].confidence*100)
            xPos = resultados[i].x-10
            yPos = resultados[i].y
            heightO = resultados[i].height
            widthO = resultados[i].width
            nome = resultados[i].label
            text(nome + " " + porcentagem + "%", xPos, yPos)
            noFill()
            stroke("blue")
            rect(xPos, yPos, widthO, heightO)  
        }
    }
}
function modelLoaded(){
    console.log("só escrevendo aqui algo")
    statusM = true
    objectDetector.detect(gato, gotResults)
}
function gotResults(error, results){
    if (error) {
        console.error(error)
    }
    else{
        console.log(results)
        resultados = results

    }
}