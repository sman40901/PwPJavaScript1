
var expInDays = 5000;
var myStorage = window.localStorage;

function btnClick(i) {

    var file = "./resources/page" + i + ".json"
    var a;
    d3.json(file, function (d) {
        //alert(JSON.stringify(d));
        //return d; // why is this not working?
        // a = d; //why is this not working?
        buildPage(d);
    });
    // alert(JSON.stringify(a));
    //alert(a.title);
    // buildPage(a);
    var td1 = document.getElementById('td' + i);
    td1.setAttribute('class', "btn btn-success");
    unClickOthers(i);
}

function unClickOthers(i) {
    var j = 1;
    var td1 = "some object";
    while (td1 != null) {
        // alert(td1);
        // alert(j);
        td1 = document.getElementById('td' + j);
        if (i == j) {
            j++;
            continue;
        }
        td1.setAttribute('class', "btn btn-default");
        j++;
    }

}

function buildPage(content) {
    document.getElementById('title').innerHTML = '<h2>' + content.title + '</h2>';
    if (content.pgType == 'plain') {
        document.getElementById('body').innerHTML = content.body;
    }
    if (content.pgType == 'userInputForm') {
        buildForm(content.body);
    }
}

function buildForm(content) {
    var form = document.createElement("form");
    // form.setAttribute("method", "post");
    // form.setAttribute("action", "./submit.html");
    content.forEach(element => {
        var elent = document.createElement(element.field);

        elent.setAttribute("type", element.type);
        elent.setAttribute("name", element.name);
        elent.setAttribute("id", element.name);
        elent.setAttribute("value", element.value);

        if (element.evts != null) {
            // alert(element.evts.length);
            element.evts.forEach(evnt => {
                // alert(evnt.evt);
                // alert(evnt.callThis);
                // elent.addEventListener(evnt.evt, evnt.callThis);
                elent.setAttribute(evnt.evt, evnt.callThis);
            });
        }
        form.appendChild(elent);

        form.appendChild(document.createElement("P"));
    });
    var body = document.getElementById('body');
    body.innerHTML = "";
    body.appendChild(form);
}

function btn1Click() {

    if (!vaildateForm()) return;

    saveData(document.getElementById('fullName').value,
        document.getElementById('age').value
    );
}

function vaildateForm() {
    var fullName = document.getElementById('fullName').value;
    // alert(fullName);
    if (null == fullName || fullName.length == 0) {
        alert('Full Name cannot be empty !!!');
        return false;
    }
    var age = document.getElementById('age').value;
    // alert(Number(age));
    if (isNaN(Number(age))) {
        alert('Age cannot be not a number !!!');
        return false;
    }
    return true;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}


function saveData(fullname, age) {
    var id = uuidv4();
    myStorage.setItem(id, '{'
        + '"FullName":"' + fullname + '",'
        + '"Age":' + age
        + '}');
    alert('Saved : ' + myStorage.getItem(id));
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

function loadRecords() {
    var list1 = document.getElementById("recordList");
    var item = '';
    for (var i = 0; i < myStorage.length; i++) {
        // alert(myStorage.getItem(myStorage.key(i)));
        var k = myStorage.key(i);
        // var alternate = (i%2==0)? 'active' : 'bg-success text-white'
        //item += '<tr id="' + k + '" class="'+ alternate +'"><td>'
        item += '<tr id="' + k + '"><td>'
            + myStorage.getItem(k)
            + '</td><td><button id="btn' + k + '" onClick="removeRecord(\'' + k + '\')">Remove</button>'
            + '</td></tr>'
    }
    list1.innerHTML = item;
}

function removeRecord(recId) {
    // alert(recId);
    var record = "Are you sure you want to delete?  " + myStorage.getItem(recId);
    if (confirm(record)) {
        myStorage.removeItem(recId);
        window.location = "records.html";
        // setTimeout('window.location="records.html";',1000);
    }
}

