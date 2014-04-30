hQuery
======

A HTML to JSON library.

## Simple to use

hQuery is designed to convert html to json object, JQuery like.

```javascript
var options = {
    url:"http://www.baidu.com",
    mapping:{
        title:"head title",
    }
};

hQuery.toJson(options, function(err, json){
    console.log(json);
});
```