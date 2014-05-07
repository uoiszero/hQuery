/**
 * Created by UO on 2014/4/8 11:34.
 */

/**
 * mapping
 *
 * {
 *      list:{
 *          selector:"",
 *          attr/foreach:""
 *          }
 *  }
 *
 */


(function () {
    var _ = require("underscore")._
        , fetchUrl = require("fetch").fetchUrl
        , cheerio = require("cheerio");

    var hQuery = {};

    hQuery.toJson = function (url, mapping, callback) {
        if (!callback && typeof mapping === "function") {
            callback = mapping;
            mapping = undefined;
        }
        mapping = mapping || {};
        getHtml(url, function (err, html) {
            if (err) {
                callback(err);
            } else {
                var json = format(html, mapping);
                callback(null, json);
            }
        })
    };

    function getHtml(url, callback) {
        if (typeof url !== "string") {
            throw  new Error("string is a valid url.")
        }
        fetchUrl(url, function (err, meta, body) {
            if (err) {
                callback(err);
            } else {
                callback(null, body.toString());
            }
        })
    }

    function format(html, mapping) {
        if (mapping === undefined) {
            throw  new Error("undefined is not a valid mapping object.")
        }
        var $ = cheerio.load(html);
        var json = {};
        getElement($, json, mapping, null);
        return json;
    }

    function getElement($, json, mapping, current) {
        _.each(_.keys(mapping), function (key) {
            var elem = mapping[key];
            if (typeof elem === "undefined") {
                throw new Error("undefined is not a valid mapping key.")
            } else if (typeof elem === "string") {
                json[key] = current === null
                    ? $(elem).text().trim()
                    : (elem === "."
                    ? current.text().trim()
                    : current.find(elem).text().trim());
            } else if (typeof elem === "function") {
                json[key] = current === null
                    ? elem($("html"))
                    : elem(current);
            } else if (typeof elem === "object") {
                var selector = elem.selector;
                if (typeof selector === "undefined") {
                    throw new Error("undefined is not a valid selector.")
                }
                else {
                    var attr = elem.attr;
                    if (typeof attr === "string") {
                        if (attr === "text") {
                            json[key] = current === null
                                ? $(selector).text().trim()
                                : (selector == "."
                                ? $(current).text().trim()
                                : $(current).find(selector).text().trim());
                        } else {
                            json[key] = current === null
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

    module.exports = hQuery;

}).call(this);
