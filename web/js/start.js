const sketchPad = new SketchPad(sketchPadContainer)

let index = 0;

const labels = ["car", "fish", "house", "pencil",
    "tree", "guitar", "clock", "bicycle"];

const data = {
    user: null,
    session: new Date().getTime(),
    drawings: {}
}

function start() {
    let nameinput = document.getElementById("user")
    if (nameinput.value == "") {
        alert("Please enter a name first");
        return;
    }
    data.user = nameinput.value
    nameinput.style.display = "none";
    sketchPadContainer.style.visibility = "visible";
    const label = labels[index];
    document.getElementById("instructions").innerHTML = "Please, draw a " + label;
    document.getElementById("advanceBtn").innerHTML = "NEXT";
    document.getElementById("advanceBtn").onclick = next;
}

function next() {
    if(sketchPad.paths.length == 0){
        alert("Please draw something!");
        return;
    }
    const label = labels[index];
    data.drawings[label] = sketchPad.paths;
    sketchPad.reset()
    index++
    if(index < labels.length){
        const nextLabel = labels[index];
        document.getElementById("instructions").innerHTML = "Please, draw a " + nextLabel;
    }
    else{
        sketchPadContainer.style.visibility = "hidden";
        document.getElementById("instructions").innerHTML="Thank you!";
        document.getElementById("advanceBtn").innerHTML = "SAVE";
        document.getElementById("advanceBtn").onclick = save;
        
    }
}

function save(){
    document.getElementById("advanceBtn").style.display = "none";
    document.getElementById("instructions").innerHTML = "Add your downloaded file to the dataset.";
    const download = document.createElement("a")
    download.setAttribute('href', 'data:application/json;charset=utf-8, '+encodeURIComponent(JSON.stringify(data)));
    const fileName = data.session+".json";
    download.setAttribute('download', fileName);
    download.click()
}