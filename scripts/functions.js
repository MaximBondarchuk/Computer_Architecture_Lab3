/**
 * Created by Maxim on 05.05.2015.
 */


function load() {
    //setInterval(function () {
    read();
    //}, 5000)
}


function read() {
    $.get("/read", function (data) {
        var labs = JSON.parse(data);
        var table = $("table")[0];

        while (table.rows.length > 1)
            table.deleteRow(table.rows.length - 1);

        for (var i = labs.length - 1; 0 <= i; i--) {
            var name = labs[i]['name'];
            var about = labs[i]['about'];
            var state = labs[i]['state'];

            var newRow = table.insertRow(1);
            var cellName = newRow.insertCell(0);
            cellName.innerHTML = name;
            cellName.className = "TableSimpleCell";
            var cellAbout = newRow.insertCell(1);
            cellAbout.innerHTML = about;
            cellAbout.className = "TableSimpleCell";
            var cellState = newRow.insertCell(2);
            cellState.innerHTML = state;
            cellState.className = "TableSimpleCell";
            var cellButtons = newRow.insertCell(3);
            //var
            cellButtons.innerHTML = '<input type="button" value="Delete" onClick="deleteLab(\'' + name + '\')"/>';
            cellButtons.className = "TableButtonCell";
        }


        var select = $("#nameChange")[0];

        while (select.length > 0)
            select.remove(select.length - 1);

        for (var j = 0; j < labs.length; j++) {
            var option = document.createElement("option");
            var nameOption = labs[j]['name'];
            option.value = nameOption;
            option.text = nameOption;
            select.add(option);
        }
    });
}


function deleteLab(name) {
    $.post("/delete", name, function () {
        read();
    });
}


function addLab() {
    var inputName = $('#nameAdd')[0];
    var inputAbout = $('#aboutAdd')[0];
    var inputState = $('#stateAdd')[0];
    var name = inputName.value;
    var about = inputAbout.value;
    var state = inputState.value;
    inputName.value = "";
    inputAbout.value = "";
    inputState.value = "";

    var data = "name=" + name + "&about=" + about + "&state=" + state;

    $.post("/add", data, function () {
        read();
    });
}


function updateLab() {
    var selectName = $('#nameChange')[0];
    var selectField = $('#fieldChange')[0];
    var inputValue = $('#inputUpdate')[0];

    var data = 'name=' + selectName.value + '&field=' + selectField.value + '&value=' + inputValue.value;
    inputValue.value = '';

    $.post("/update", data, function () {
        read();
    });

    $.get("/result", function (data) {
        var whatWeGot = JSON.parse(data);

        var resultP = $('.result')[0];
        resultP.innerHTML = whatWeGot['result'];

        //if (whatWeGot['color'] == 'red')
            resultP.style.color = whatWeGot['result'];
        //else
            resultP.style.color = whatWeGot['result'];
    });
}