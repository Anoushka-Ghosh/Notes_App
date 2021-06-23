console.log('this is app.js');
showNotes();
//If user adds a note. add it to a local storage.
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value = "";
    // console.log(notesObj);
    showNotes();
})


//function to show elements from local storage
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += ` 
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Note ${index+1}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
            </div>
        </div>`;
    });
    let notesElem=document.getElementById("notes");
    if(notesObj.length != 0){
        notesElem.innerHTML=html;
    }
    else{
        notesElem.innerHTML=`Nothing to Show! Use "Add a Note" section above to add notes `
    }
}


//function to delete a node
function deleteNote(index){
    // console.log('I am deleting',index);
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    notesObj.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

let search=document.getElementById("searchTxt")
search.addEventListener("input",function(){
    let inputVal=search.value.toLowerCase();
    // console.log("input event fired",inputVal);
    let noteCards=document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(element=>{
        let cardTxt=element.getElementsByTagName('p')[0].innerText;
        if(cardTxt.includes(inputVal)){
            element.style.display='block';
        }
        else{
            element.style.display='none';
        }
    })
})

/*
further Features:
1.add title
2. mark a note as important
3. seperate notes by user
4. synck and host to webserver
*/