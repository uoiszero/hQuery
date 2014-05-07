/**
 * Created by UO on 2014/4/30 15:44.
 */

var hQuery = require("../lib/hQuery");

var mapping = {
    p: {
        selector: "p#nv a",
        foreach: {
            name: function(elem){
                return elem.text().trim().replace(" ", "");
            },
            url: {
                selector: ".",
                attr: "href"
            }
        }
    }
};

hQuery.toJson("http://www.baidu.com/", mapping, function(err, json){
    console.log(json);
});