$(document).ready(
    function(){
        var url = "http://just-imagine.hol.es/projects/MindForce/data/userList.json"; 
        var request = new XMLHttpRequest (); 
        request.open("GET", url) ; 
        request.onload = function() {
            if (request.status === 200) {
                UpdateList(JSON.parse(request.responseText));
            }
        };
        request.send(null);
    }
);

function UpdateList(jsonList){
    var table = document.getElementsByTagName("table")[0];
    for(var i = 0; i < jsonList.length; i++){
        var tr = document.createElement("tr");
        tr.innerHTML = "<td>" + jsonList[i].id + "</td> <td>" + jsonList[i].nickname + "</td>";
        table.appendChild(tr);
    }
}