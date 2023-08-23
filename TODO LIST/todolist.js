var _a;
var taskslist = [];
var rowCounter = 0;
var Swal;
var addButton = document.getElementById("addButton");
addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", function () {
    var taskNameInput = document.getElementById("taskname").value;
    //checking the condition that value is empty or not
    if (taskNameInput.trim() === "") {
        // window.alert("Please enter task name!!!");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<b>Empty fields are not allowed!!</b>'
        });
        return;
    }
    //if exist check that any duplicate task is in the array
    if (taskslist.includes(taskNameInput)) {
        // window.alert("Task already exists!!!");
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            footer: '<b>Tasks is already assigned</b>'
        });
        return;
    }
    //else push
    taskslist.push(taskNameInput);
    document.getElementById("taskname").value = "";
    //creating all the elements dynamically if the condition satisfies
    var table = document.getElementById("table");
    var newRow = table.insertRow(rowCounter++);
    var checkboxColumn = newRow.insertCell(0);
    var tasknamecolumn = newRow.insertCell(1);
    var selectcolumn = newRow.insertCell(2);
    var deletecolumn = newRow.insertCell(3);
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    checkboxColumn.appendChild(checkbox);
    var taskNameText = document.createTextNode(taskNameInput);
    tasknamecolumn.appendChild(taskNameText);
    // const option1 = document.createElement("option");
    // const option2 = document.createElement("option");
    // const option3 = document.createElement("option");
    var progress = document.createElement("select");
    ["To-do..", "In Progress..", "Completed!"].forEach(function (optionText) {
        var option = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        progress.appendChild(option);
    });
    //  progress.setAttribute("onclick",taskCompleted())
    selectcolumn.appendChild(progress);
    var deleteButton = document.createElement("button");
    deleteButton.className = "deleteButton";
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function () {
        //taking row index to delete
        table.deleteRow(newRow.rowIndex);
        rowCounter--; //decreasing the row counter so there will be no issues
        //deleting the name from list
        taskslist.splice(taskslist.indexOf(taskNameInput), 1);
    });
    deletecolumn.appendChild(deleteButton);
    progress.addEventListener("change", function () {
        if (progress.value === "Completed!") {
            checkbox.checked = true;
            // checkbox.style.color = "red";
            //  tasknamecolumn.style.background ="red";
            // tasknamecolumn.style.color="white";
            progress.style.background = "red";
            progress.disabled = true;
            tasknamecolumn.style.textDecoration = "line-through";
            checkbox.disabled = true;
        }
        else if (progress.value === "In Progress..") {
            checkbox.checked = false;
            // tasknamecolumn.style.background ="none";
            // tasknamecolumn.style.color="black";
            progress.style.background = "green";
            tasknamecolumn.style.textDecoration = "none";
        }
        else {
            checkbox.checked = false;
            progress.style.background = "none";
            tasknamecolumn.style.textDecoration = "none";
        }
    });
});
(_a = document.getElementById("search")) === null || _a === void 0 ? void 0 : _a.addEventListener("input", function () {
    //converting into lowercase because we dont know how the user provides the input
    var searchinputvalue = document.getElementById("search").value.toLowerCase();
    //selecting all table rows from table
    var rows = document.querySelectorAll("#table tr");
    rows.forEach(function (row) {
        var _a;
        //cell is a column from row the name is the column 1
        var taskName = row.cells[1];
        if (taskName) {
            //assigning the name to taskname
            var taskName_1 = ((_a = taskName_1.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || "";
            if (taskName_1 && taskName_1.includes(searchinputvalue)) {
                row.style.display = "";
            }
        }
    });
});
