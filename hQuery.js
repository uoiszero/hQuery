/**
 * Created by UO on 2014/4/8 11:34.
 */

/**
 * options 格式
 *
 * {
 *   url:必填
 *   encoding:在网页使用特定编码格式的时候填写
 *   mapping:{
 *          list:{
 *              selector:"",
 *              attr/foreach:""
 *              }
 *        }
 *  }
 *
 */

var request = require("request")
    , _ = require("underscore")._
    , cheerio = require("cheerio")
    , iconv = require("iconv-lite");

function Engine() {
}

Engine.prototype.search = function (options, callback) {
    var self = this;
    this.getHtml(options, function (err, html) {
        if (err) {
            callback(err);
        } else {
            var json = self.toJson(html, options);
            callback(null, json);
        }
    })
};

Engine.prototype.getHtml = function (options, callback) {
    if (options == undefined) {
        throw  new Error("undefined is not a valid options object.")
    }
    var params = {timeout: 10000};
    var encoding = null;
    if (typeof options === "string") {
        params.url = options;
    } else if (typeof options === "object") {
        params.url = options.url;
        if (options.encoding != undefined) {
            params.encoding = null;
            encoding = options.encoding;
        }
    }
    request.get(params, function (err, response, body) {
        if (err) {
            callback(err);
        } else {
            if (encoding != null) {
                body = iconv.decode(body, encoding);
            }
            callback(null, body);
        }
    })
};

Engine.prototype.toJson = function (html, options) {
    if (options == undefined) {
        throw  new Error("undefined is not a valid options object.")
    } else if (options.mapping == undefined) {
        throw  new Error("undefined is not a valid mapping object.");
    }
    var mapping = options.mapping;
    var $ = cheerio.load(html);
    var json = {};
    getElement($, json, mapping, null);
    return json;
};

function getElement($, json, mapping, current) {
    _.each(_.keys(mapping), function (key) {
        var elem = mapping[key];
        if (typeof elem === "undefined") {
            throw new Error("undefined is not a valid mapping key.")
        } else if (typeof elem === "string") {
            json[key] = current == null ? $(elem).text().trim() : current.find(elem).text().trim();
        } else if (typeof elem === "function") {
            json[key] = current == null ? elem($("body")) : elem(current);
        } else if (typeof elem === "object") {
            var selector = elem.selector;
            if (typeof selector === "undefined") {
                throw new Error("undefined is not a valid selector.")
            }
            else {
                var attr = elem.attr;
                if (typeof attr === "string") {
                    if (attr === "text") {
                        json[key] = current == null
                            ? $(selector).text().trim()
                            : (selector == "."
                            ? $(current).text().trim()
                            : $(current).find(selector).text().trim());
                    } else {
                        json[key] = current == null
                            ? $(selector).attr(attr)
                            : ( selector == "."
                            ? $(current).attr(attr)
                            : $(current).find(selector).attr(attr));
                    }
                }
                var foreach = elem.foreach;
                if (typeof  foreach === "object") {
                    json[key] = _.map($(selector), function (elem) {
                        var obj = {};
                        getElement($, obj, foreach, $(elem));
                        return obj;
                    });
                }
            }
        }
    })
}

module.exports = Engine;