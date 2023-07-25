// @ts-nocheck
function init(){
    var items = ["dog", "cat", "horse", "elephant"];
    let list = document.getElementById("myList");
    items.forEach((item) => {
        let div = document.createElement("div");
        let li = document.createElement("li");
        li.innerText = item;
        li.classList.add("item");
        li.draggable = true;
        li.ondragstart= (event) => {
            event.dataTransfer.setData("From", event.target.innerText);
        }
        div.ondragover = (event) => {
            event.preventDefault();
        }
        div.ondrop= (event) => {
            if(event.target.classList.contains("sub-item")) {
                document.getElementById("error").innerHTML = "Can't drop on children!";
                return;
            }
            const data = event.dataTransfer.getData("From");
            let droppedLi = document.createElement("li");
            droppedLi.innerText = data;
            droppedLi.classList.add("sub-item");
            droppedLi.draggable = false;
            let subUl = event.target.parentNode.getElementsByTagName("ul");
            if(subUl.length) {
                let found = false;
                for(let child of subUl[0].children) {
                    found = child.innerHTML === data;
                    if(found) break;
                }
                if(found) {
                    document.getElementById("error").innerHTML = "Item already exists!";
                    return;
                }
                subUl[0].appendChild(droppedLi);
            } else {
                subUl = document.createElement("ul");
                subUl.appendChild(droppedLi);
                event.target.parentNode.appendChild(subUl);
            }
            document.getElementById("error").innerHTML = "";
        }
        div.appendChild(li);
        list.appendChild(div);
    });
};
init();

