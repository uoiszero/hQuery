/**
 * Created by UO on 2014/4/30 15:43.
 */

var hQuery = require("../lib/hQuery");

var mapping = {
    p: {
        selector: "p#nv a",
        foreach: {
            name: ".",
            url: {
                selector: ".",
                attr: "href"
            }
        }
    }
};

hQuery.toJson("http://www.baidu.com", mapping, function(err, json){
    console.log(json);
});