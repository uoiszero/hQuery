# hQuery -- Convert Html to Json

[![NPM](https://nodei.co/npm/node-hquery.png)](https://nodei.co/npm/node-hquery/)

A HTML to JSON library.

## Simple to use

'hQuery.toJson(url [, mapping], callback)'

hQuery is designed to convert html to json object, JQuery like.

```javascript
var mapping = {
    title:"head title",
};

hQuery.toJson("http://www.baidu.com", mapping, function(err, json){
    console.log(json);
});
```

## Attribute

`title:"head title"` get title element text by default. use `title:{selector:"head title", attr:"href"}` to get attributes.

## Foreach

use foreach like this. Point `.` mean current element.

```javascript
var options = {
    p: {
        selector: "p#nv a",
        foreach: {
            name: ".",
            url: {
                selector: ".",
                attr: "href"
            }
        }
};

hQuery.toJson("http://www.baidu.com", mapping, function(err, json){
    console.log(json);
});
```

## Function

```javascript
var mapping = {
    title: function(elem){
        return elem.text();
    }
};

hQuery.toJson("http://www.baidu.com", mapping, function(err, json){
    console.log(json);
});
```