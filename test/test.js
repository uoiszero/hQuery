/**
 * Created by UO on 2014/4/29 19:22.
 */

var hQuery = require("../lib/hQuery");

var mapping = {
    title:"head title"
};

hQuery.toJson("http://www.baidu.com/", mapping, function(err, json){
    console.log(json);
});