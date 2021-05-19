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
    form.setAttribute("method", "post");
    form.setAttribute("action", "submit.html");
    content.forEach(element => {
        var elent;

        elent = document.createElement(element.field);
        elent.setAttribute("type", element.type);
        elent.setAttribute("name", element.name);
        elent.setAttribute("id", element.name);
        elent.setAttribute("value", element.value);
        form.appendChild(elent);
    });
    var body = document.getElementById('body');
    body.innerHTML="";
    body.appendChild(form);
}