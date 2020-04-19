var conf = require('../Config.json');

function HttpGetDataAsync(callback)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() { 
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", conf.datapath, true); // true for asynchronous 
    xmlHttp.send(null);
}