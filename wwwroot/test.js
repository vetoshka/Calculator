let form = document.querySelector("form");
let form3 = document.querySelector("form.search");
let result;
let expression;
let search;
GetOperation();
form.addEventListener("submit", function (event) {
    expression = form.elements.Expression.value;
    event.preventDefault();
    CreateOperation(expression);
});
form3.addEventListener("submit", function (event) {
    event.preventDefault();
    search = +form3.elements.SearchNumber.value;
    Search(search);

});
async function CreateOperation(expression) {

    const response = await fetch("api/math", {
        method: "POST",
        headers: { "Accept": "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({
            Expression: expression
        })
    });
    if (response.ok) {
        const Operation = await response.json();
        //document.getElementById("Expression").value += " = "+Operation.result;
        form.res.value = "Result = "+Operation.result;
        document.querySelector("tbody").append(row(Operation));
    }
}

async function GetOperation() {
    const response = await fetch("/api/math", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok) {
        const operations = await response.json();
        let rows = document.querySelector("tbody");
            operations.forEach(operation => {
             
                    rows.append(row(operation));
                
            });
    }
}
let operations;
async function Search(search) {

    const response = await fetch("/api/math", {
        method: "GET",
        headers: { "Accept": "application/json" }
    });
    if (response.ok) {
        operations = await response.json();
        operations.forEach(operation => {
            if (operation.firstNumber === search) {
                form3.elements.Outsearch.value = `${operation.firstNumber} ${operation.operat} ${operation.secondNumber} = ${operation.result}`;
            }
        });
    }
}
async function DeleteOperation(id) {
    const response = await fetch("/api/math/" + id, {
        method: "DELETE",
        headers: { "Accept": "application/json" }
    });
    if (response.ok) {
        const operation = await response.json();
        document.querySelector("tr[data-rowid='" + operation.id + "']").remove();
    }
}

function row(Operation) {
    const tr = document.createElement("tr");
    tr.setAttribute("data-rowid", Operation.id);
    //const idTd = document.createElement("td");
    //idTd.append(Operation.id);
    //tr.append(idTd);

    const FirstNumberTd = document.createElement("td");
    FirstNumberTd.append(Operation.expression);
    tr.append(FirstNumberTd);

    const ResultTd = document.createElement("td");
    ResultTd.append(Operation.result);
    tr.append(ResultTd);
    const linksTd = document.createElement("td");

    const removeLink = document.createElement("a");
    removeLink.setAttribute("data-id", Operation.id);
    removeLink.setAttribute("style", "cursor:pointer;padding:15px;");
    removeLink.append("Удалить");
    removeLink.addEventListener("click", e => {

        e.preventDefault();
        DeleteOperation(Operation.id);
    });

    linksTd.append(removeLink);
    tr.appendChild(linksTd);
    
    return tr;
}
document.getElementById('hidden').hidden = true;
document.getElementById('knopka').onclick = function () {
        if (document.getElementById('hidden').hidden) {
            document.getElementById('hidden').hidden = false;
        } else {
            document.getElementById('hidden').hidden = true;
        }
}
document.getElementById("LeftBracket").onclick = function () {
    document.getElementById("Expression").value += "(";
}
document.getElementById("RightBracket").onclick = function () {
    document.getElementById("Expression").value += ")";
}
document.getElementById("Add").onclick = function () {
    document.getElementById("Expression").value += " + ";
}
document.getElementById("Multiplication").onclick = function () {
    document.getElementById("Expression").value += " * ";
}
document.getElementById("Division").onclick = function () {
    document.getElementById("Expression").value += " / ";
}
document.getElementById("Subtraction").onclick = function () {
    document.getElementById("Expression").value += " - ";
}
document.getElementById("Reset").onclick = function () {
    document.getElementById("Expression").value = "";
}
document.getElementById("One").onclick = function () {
    document.getElementById("Expression").value += "1";
}
document.getElementById("Two").onclick = function () {
    document.getElementById("Expression").value += "2";
}
document.getElementById("Three").onclick = function () {
    document.getElementById("Expression").value += "3";
}
document.getElementById("Four").onclick = function () {
    document.getElementById("Expression").value += "4";
}
document.getElementById("Five").onclick = function () {
    document.getElementById("Expression").value += "5";
}
document.getElementById("Six").onclick = function () {
    document.getElementById("Expression").value += "6";
}
document.getElementById("Seven").onclick = function () {
    document.getElementById("Expression").value += "7";
}
document.getElementById("Eight").onclick = function () {
    document.getElementById("Expression").value += "8";
}
document.getElementById("Nine").onclick = function () {
    document.getElementById("Expression").value += "9";
}
document.getElementById("Zero").onclick = function () {
    document.getElementById("Expression").value += "0";
}