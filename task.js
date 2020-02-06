function createDocumentElement(type, classes = []) {
  const div = document.createElement(type);
  for (const classDiv of classes) {
    div.classList.add(classDiv);
  }
  return div;
}

function createPriorityElements(select) {
  const low = document.createElement("OPTION");
  low.setAttribute("value", "1");
  low.innerHTML = "Low";
  const mid = document.createElement("OPTION");
  mid.setAttribute("value", "2");
  mid.innerHTML = "Medium";
  const high = document.createElement("OPTION");
  high.setAttribute("value", "3");
  high.innerHTML = "High";
  select.appendChild(low);
  select.appendChild(mid);
  select.appendChild(high);
}

function addTaskToDOM() {
  const newItem = document.createElement("LI");
  newItem.classList.add("list-group-item");

  const itemDiv = createDocumentElement("DIV", ["d-flex", "bd-highlight"]);
  const itemDivInput = createDocumentElement("DIV", [
    "p-2",
    "flex-grow-1",
    "bd-highlight"
  ]);
  const itemInput = document.createElement("TEXTAREA");
  itemDivInput.appendChild(itemInput);

  const itemDivDeadLine = createDocumentElement("DIV", ["p-2", "bd-highlight"]);
  const inputDeadLine = createDocumentElement("INPUT", ["form-control"]);
  inputDeadLine.setAttribute("type", "date");
  itemDivDeadLine.appendChild(inputDeadLine);

  const itemDivPriority = createDocumentElement("DIV", ["p-2", "bd-highlight"]);
  const prioritySelect = createDocumentElement("SELECT", ["custom-select"]);
  createPriorityElements(prioritySelect);
  itemDivPriority.appendChild(prioritySelect);

  const itemDivEdit = createDocumentElement("DIV", ["p-2", "bd-highlight"]);
  const buttonEdit = createDocumentElement("BUTTON", ["btn", "btn-warning"]);
  buttonEdit.setAttribute("name", "editTask");
  buttonEdit.innerHTML = "Save";
  itemDivEdit.appendChild(buttonEdit);

  const itemDivDelete = createDocumentElement("DIV", ["p-2", "bd-highlight"]);
  const buttonDelete = createDocumentElement("BUTTON", ["btn", "btn-danger"]);
  buttonDelete.setAttribute("name", "deleteTask");
  buttonDelete.innerHTML = "Delete";
  itemDivDelete.appendChild(buttonDelete);

  itemDiv.appendChild(itemDivInput);
  itemDiv.appendChild(itemDivDeadLine);
  itemDiv.appendChild(itemDivPriority);
  itemDiv.appendChild(itemDivEdit);
  itemDiv.appendChild(itemDivDelete);

  newItem.appendChild(itemDiv);

  const list = document.getElementById("taskList");
  list.insertBefore(newItem, list.childNodes[0]);
}

function deleteTask(element) {
  if (element.target && element.target.name == "deleteTask") {
    const li = element.target.closest("li");
    const lu = li.parentElement;
    lu.removeChild(li);
  }
}

function editTask(element){
    if (element.target && element.target.name == "editTask") {
        const li = element.target.closest("li");
        const text = li.getElementsByTagName("TEXTAREA")[0];
        const priority = li.getElementsByClassName("form-control")[0];
        const deadLine = li.getElementsByClassName("custom-select")[0];
        if(element.target.innerHTML == 'Edit'){
            deadLine.disabled = false;
            priority.disabled = false;
            text.disabled= false;
            element.target.innerHTML = 'Save';
        }else{
            priority.disabled = true;
            deadLine.disabled = true;
            text.disabled= true;
            element.target.innerHTML = 'Edit';
        }
        
        
    }
}

function sortPriority() {
  const list = document.getElementById("taskList");
  let switching = true;
  while (switching) {
    switching = false;
    b = list.getElementsByTagName("LI");
    for (i = 0; i < b.length - 1; i++) {
      shouldSwitch = false;
      if (getPriority(b[i]) < getPriority(b[i + 1])) {
        shouldSwitch = true;
        break;
      }
    }
    if (shouldSwitch) {
      b[i].parentNode.insertBefore(b[i + 1], b[i]);
      switching = true;
    }
  }
}

function getPriority(li) {
  return li.getElementsByTagName("SELECT")[0].selectedOptions[0].value;
}

document.addEventListener("click", deleteTask);
document.addEventListener("click", editTask);
document.getElementById("addTask").addEventListener("click", addTaskToDOM);
document.getElementById("sortPriority").addEventListener("click", sortPriority);
