var dragged;

document.addEventListener("drag", handleDragEvent, false);
document.addEventListener("dragstart", handleDragStart, false);
document.addEventListener("dragend", handleDragEnd, false);

document.addEventListener("dragover", handleDragOver, false);
document.addEventListener("dragenter", handleDragEnter, false);
document.addEventListener("dragleave", handleDragLeave, false);
document.addEventListener("drop", handleDropEvent, false);

function handleDragEvent(event) {
    //console.log(event.target);
}

function handleDragStart(event) {

    dragged = event.target;
    event.target.style.opacity = 0.5;
}

function handleDragEnd(event) {

    event.target.style.opacity = "";
}

function handleDragOver(event) {

    event.preventDefault();
}

function handleDragEnter(event) {

    if (event.target.className === "dropzone") {
        event.target.style.background = "purple";
    }

}

function handleDragLeave(event) {
    if (event.target.className === "dropzone") {
        event.target.style.background = "";
    }
}

function handleDropEvent(event) {
    event.preventDefault();
    if (
        event.target.getAttribute("movie_id") === dragged.getAttribute("movie_id")
    ) {
        return;
    }
    if (event.target.className === "draggable") {
        try {
            const targetDataId = event.target.getAttribute("movie_id");
            const targetDataIndex = event.target.getAttribute("movie_index");
            const draggedId = dragged.getAttribute("movie_id");
            const draggedIndex = dragged.getAttribute("movie_index");
            const targetParentNode = event.target.parentNode;

            event.target.setAttribute("movie_index", draggedIndex);
            dragged.setAttribute("movie_index", targetDataIndex);

            dragged.parentNode.appendChild(event.target);
            targetParentNode.appendChild(dragged);

            var temp = {};
            temp.name = movie_special[targetDataIndex].name;
            temp.img = movie_special[targetDataIndex].img;
            temp.date = movie_special[targetDataIndex].date;
            temp.id = movie_special[targetDataIndex].id;

            movie_special[targetDataIndex] = movie_special[draggedIndex];
            movie_special[draggedIndex] = temp;

        } catch (e) {
            console.log(e);
        }
    } else {
        console.log("ri");
    }
}