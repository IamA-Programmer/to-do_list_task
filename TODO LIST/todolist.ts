const taskslist:string[]=[];
let rowCounter:number = 0;
var Swal:any;

const addButton: HTMLElement | null = document.getElementById("addButton");
addButton?.addEventListener("click", function() {
    const taskNameInput: string = (document.getElementById("taskname") as HTMLInputElement).value ;
  
 //checking the condition that value is empty or not
    if (taskNameInput.trim() === "") {
       // window.alert("Please enter task name!!!");
       Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        footer: '<b>Empty fields are not allowed!!</b>'
      })
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
          })
        return;
    }

    //else push
    taskslist.push(taskNameInput);
    
    (document.getElementById("taskname") as HTMLInputElement).value="";


   //creating all the elements dynamically if the condition satisfies
    const table = document.getElementById("table") as HTMLTableElement ;
    const newRow:HTMLTableRowElement = table.insertRow(rowCounter++);

    const checkboxColumn:HTMLTableCellElement = newRow.insertCell(0);
    const tasknamecolumn:HTMLTableCellElement = newRow.insertCell(1);
    const selectcolumn:HTMLTableCellElement = newRow.insertCell(2);
    const deletecolumn:HTMLTableCellElement = newRow.insertCell(3);

    const checkbox:HTMLInputElement = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkboxColumn.appendChild(checkbox);

    const taskNameText:Text = document.createTextNode(taskNameInput);
    tasknamecolumn.appendChild(taskNameText);

    // const option1 = document.createElement("option");
    // const option2 = document.createElement("option");
    // const option3 = document.createElement("option");

    const progress:HTMLSelectElement = document.createElement("select");
    ["To-do..", "In Progress..", "Completed!"].forEach(function(optionText:string) {
        const option:HTMLOptionElement = document.createElement("option");
        option.value = optionText;
        option.textContent = optionText;
        progress.appendChild(option);
    });
  //  progress.setAttribute("onclick",taskCompleted())
    selectcolumn.appendChild(progress);

    const deleteButton = document.createElement("button")  as HTMLInputElement;
    deleteButton.className = "deleteButton";
    deleteButton.textContent = "X";
    deleteButton.addEventListener("click", function() {
        //taking row index to delete
        table.deleteRow(newRow.rowIndex);
        rowCounter--;//decreasing the row counter so there will be no issues
        //deleting the name from list
        taskslist.splice(taskslist.indexOf(taskNameInput), 1);
    });
    deletecolumn.appendChild(deleteButton);


    progress.addEventListener("change", function() {

        if (progress.value === "Completed!") {
            
            checkbox.checked = true;
           // checkbox.style.color = "red";
          //  tasknamecolumn.style.background ="red";
           // tasknamecolumn.style.color="white";
            progress.style.background="red";
            progress.disabled=true;
            tasknamecolumn.style.textDecoration = "line-through";
            checkbox.disabled=true;
        }
        else if(progress.value === "In Progress.."){
            checkbox.checked = false;
            // tasknamecolumn.style.background ="none";
            // tasknamecolumn.style.color="black";
            progress.style.background="green";
            tasknamecolumn.style.textDecoration = "none";
        }
        else{
            checkbox.checked = false;
            progress.style.background="none";
            tasknamecolumn.style.textDecoration = "none";
        }
    });

});

document.getElementById("search")?.addEventListener("input", function() {
    //converting into lowercase because we dont know how the user provides the input
    const searchinputvalue = (document.getElementById("search") as HTMLInputElement).value.toLowerCase();
   //selecting all table rows from table
    const rows:NodeListOf<HTMLTableRowElement> = document.querySelectorAll("#table tr");

   rows.forEach(function(row :HTMLTableRowElement) {
    //cell is a column from row the name is the column 1
       const taskName : HTMLTableCellElement | null = row.cells[1];

       if (taskName) {
        //assigning the name to taskname
        const taskName= taskName.textContent?.toLowerCase() || "";
        if (taskName && taskName.includes(searchinputvalue)) {
            row.style.display = "";
        } 
        
       }
    });

});



