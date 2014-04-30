/**
 * Created by UO on 2014/4/30 15:43.
 */

var hQuery = require("../lib/hQuery");

var options = {
    url:"http://www.baidu.com",
    mapping: {
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
    }
};

hQuery.toJson(options, function(err, json){
    console.log(json);
});