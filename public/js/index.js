// SELECT OR UNSELECT A MODULE WHEN THE USER CLICKS THE SELECTOR
let selectedModules = []
function toggleSelected(id) {
    const theDiv = document.getElementById(id)
    if (theDiv.classList.contains("unselected")) {
        // the box is currently unselected; select it
        theDiv.classList.remove("unselected")
        theDiv.classList.add("selected")
        selectedModules.push(id)
    } else {
        // the box is currently selected; unselect it
        theDiv.classList.remove("selected")
        theDiv.classList.add("unselected")
        selectedModules.pop(id)
    }
}

// HIDE THE IMAGE AND SHOW THE DESCRIPTION WHEN THE USER HOVERS OVER A SELECTOR
// create array of all the modules
const availableModules = Array.from(document.getElementById("pack-selector-container").children)
// add event listeners to all modules
for (i in availableModules) {
    availableModules[i].addEventListener("mouseover", mouseOver)
    availableModules[i].addEventListener("mouseout", mouseOut)
}
// what to do when the user hovers over a selector
function mouseOver() {
    document.getElementById(this.id+"Img").classList.add("invisible")
    document.getElementById(this.id+"Desc").classList.remove("invisible")
}
function mouseOut() {
    document.getElementById(this.id+"Img").classList.remove("invisible")
    document.getElementById(this.id+"Desc").classList.add("invisible")
}

// HANDLE THE USER PRESSING THE DOWNLOAD BUTTON
function downloadPack() {
    // stop the user downloading a pack with nothing selected
    if (selectedModules.length==0) {
        // let the user know they can't download a pack with no modules
        alert("You can't download a pack with nothing selected.")
        // return, so the post request is not sent
        return
    }

    // show the download toast
    document.getElementById("download-toast").classList.remove("invisible")

    // send post request to the server
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://littleimprovements-custom.beatso1.repl.co/", false);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify( {"new":"true","modules":selectedModules} ));

    // show fail toast if the response was "error"
    if (xhr.response == "error") {
        // hide the download toast
        document.getElementById("download-toast").classList.add("invisible")
        // show fail toast
        document.getElementById("error-toast").classList.remove("invisible")
        // return, so the user doesnt get redirected
        return
    }
    
    // download
    window.location.href = xhr.response
}