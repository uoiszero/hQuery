# hQuery -- Convert Html to Json

[![NPM](https://nodei.co/npm/node-hquery.png)](https://nodei.co/npm/node-hquery/)

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

## Encoding

add `encoding:"gbk"` in options.

## Attribute

`title:"head title"` get title element text by default. use `title:{selector:"head title", attr:"href"}` to get attributes.

## Foreach

use foreach like this. `.` mean current element.

```javascript
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
```

## Function

use `function(elem){return ...}`