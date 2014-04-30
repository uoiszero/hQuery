/**
 * Created by UO on 2014/4/29 19:22.
 */

var hQuery = require("../lib/hQuery");

var options = {
    url:"http://www.baidu.com",
    mapping:{
        title:"head title"
    }
};

hQuery.toJson(options, function(err, json){
    console.log(err);
    console.log(json);
});