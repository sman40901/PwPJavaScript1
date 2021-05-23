// import page1 from './resources/page1.json';
// import page3 from './resources/page3.json';
// import page2 from './resources/page2.json';

// var resources= [
//     {
//         "title":"This is a home page",
//         "body": "this is some body"
//     },
//     {
//         "title":"This is a research page",
//         "body": "this is some research"
//     },
//     {
//         "title":"This is a form page",
//         "body": [
//             {"field":"Name","type":"text"},
//             {"field":"age","type":"text"},
//             {"field":"submit","type":"button"}
//         ]
//     }

// ];

// function readTextFile(file, callback) {
//     var rawFile = new XMLHttpRequest();
//     rawFile.overrideMimeType("application/json");
//     rawFile.open("GET", file, true);
//     rawFile.onreadystatechange = function() {
//         if (rawFile.readyState === 4 && rawFile.status == "200") {
//             callback(rawFile.responseText);
//         }
//     }
//     rawFile.send(null);
// }


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
}


function buildPage(content) {
    document.getElementById('title').innerHTML = content.title;
    if (typeof (content.body) == 'string') {
        document.getElementById('body').innerHTML = content.body;
    } else {
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
    // alert("btn1clicked")
    // alert(document.getElementById('fullName').value);
    // alert(document.getElementById('age').value);
    // setCookie(
    //     'FullName',
    //     document.getElementById('fullName').value,
    //     expInDays
    // );
    // setCookie(
    //     'Age',
    //     document.getElementById('age').value,
    //     expInDays
    // );
    saveData(document.getElementById('fullName').value,
        document.getElementById('age').value
    );
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
        item += '<li id="' + k + '">'
            + myStorage.getItem(k)
            + '</li>'
    }
    list1.innerHTML = item;
}