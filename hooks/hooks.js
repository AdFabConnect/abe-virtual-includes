'use strict';

var path = require('path');

var hooks = {
  afterPageEditorCompile: function (html, json, abe) {
    var regexIncludeVirtual = /<!--#include(.*?)-->/g
    var match
    while (match = regexIncludeVirtual.exec(html)) {
      var url = /(virtual|VIRTUAL)=['|"](.*?)['|"]/.exec(match[1])
      if(typeof url !== 'undefined' && url !== null
        && typeof url[2] !== 'undefined' && url[2] !== null) {
        var urlToOpen = path.join(abe.config.root, abe.config.publish.url, url[2])
        var urlToOpenCustom = path.join(abe.config.root, 'custom', url[2])
        if (abe.coreUtils.file.exist(urlToOpen)) {
          var includeHtml = abe.cmsData.file.get(urlToOpen)
          html = html.replace(match[0], includeHtml)
        }else if (abe.coreUtils.file.exist(urlToOpenCustom)) {
          var includeHtml = abe.cmsData.file.get(urlToOpenCustom)
          html = html.replace(match[0], includeHtml)
        }
      }else {
        html = html.replace(match[0], '')
      }
    }
    return html
  },
  beforePreview: function (html, req, res, next, abe) {
    var regexIncludeVirtual = /<!--#include(.*?)-->/g
    var match
    while (match = regexIncludeVirtual.exec(html)) {
      var url = /(virtual|VIRTUAL)=['|"](.*?)['|"]/.exec(match[1])
      if(typeof url !== 'undefined' && url !== null
        && typeof url[2] !== 'undefined' && url[2] !== null) {
        var urlToOpen = path.join(abe.config.root, abe.config.publish.url, url[2])
        var urlToOpenCustom = path.join(abe.config.root, 'custom', url[2])
        if (abe.coreUtils.file.exist(urlToOpen)) {
          var includeHtml = abe.cmsData.file.get(urlToOpen)
          html = html.replace(match[0], includeHtml)
        }else if (abe.coreUtils.file.exist(urlToOpenCustom)) {
          var includeHtml = abe.cmsData.file.get(urlToOpenCustom)
          html = html.replace(match[0], includeHtml)
        }else {
          console.log(abe.clc.red(`[ WARNING ] file virtual include doesn't exist`), urlToOpen)
        }
      }else {
        html = html.replace(match[0], '')
      }
    }
    return html
  }
};

exports.default = hooks;