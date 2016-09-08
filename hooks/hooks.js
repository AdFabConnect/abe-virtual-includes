'use strict';

var hooks = {
  afterPageEditorCompile: function (html, json, abe) {
    var regexIncludeVirtual = /<!--#include(.*?)-->/g
    var match
    while (match = regexIncludeVirtual.exec(html)) {
      var url = /(virtual|VIRTUAL)=['|"](.*?)['|"]/.exec(match[1])
      if(typeof url !== 'undefined' && url !== null
        && typeof url[2] !== 'undefined' && url[2] !== null) {
        var urlToOpen = abe.fileUtils.concatPath(abe.config.root, abe.config.publish.url, url[2])
        if (abe.fileUtils.isFile(urlToOpen)) {
          var includeHtml = abe.fileUtils.getFileContent(urlToOpen)
          html = html.replace(match[0], includeHtml)
        }
      }else {
        html = html.replace(match[0], '')
      }
    }
    return html
  },
  beforePreview: function (html, req, res, next, abe) {
    /*var regexIncludeVirtual = /<!--#include(.*?)-->/g
    var match
    while (match = regexIncludeVirtual.exec(html)) {
      var url = /(virtual|VIRTUAL)=['|"](.*?)['|"]/.exec(match[1])
      if(typeof url !== 'undefined' && url !== null
        && typeof url[2] !== 'undefined' && url[2] !== null) {
        var urlToOpen = abe.fileUtils.concatPath(abe.config.root, abe.config.publish.url, url[2])
        if (abe.fileUtils.isFile(urlToOpen)) {
          var includeHtml = abe.fileUtils.getFileContent(urlToOpen)
          html = html.replace(match[0], includeHtml)
        }else {
          console.log(abe.clc.red(`[ WARNING ] file virtual include doesn't exist`), file)
        }
      }else {
        html = html.replace(match[0], '')
      }
    }*/
    return html
  }
};

exports.default = hooks;