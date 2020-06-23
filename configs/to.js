/**
 * to.js
 * @autor Julian David (@anlijudavid)
 * @version 1.0.0
 * 2016
 */
const to = require('../configs/to');

/**
 * [toModel simple json to model sails]
 * @param  {[type]} model_basic [description]
 * @return {[string]}             [string]
 */
exports.toModel = function (model_basic) {
  var out = [];
  out.push("/**");
  out.push("\tGenerated by sails-inverse-model");
  out.push("\tDate:" + (new Date()).toString());
  out.push("*/\n");
  out.push("module.exports = {");
  //console.log(model_basic);
  out.push(model_basic);
  out.push("};");
  return out.join("\n");
};

exports.saveController = function(name) {
  var name_cap = exports.capitalize(name);
  return [
    "/**",
    "* " + name_cap,
    "*",
    "* @description :: Server-side logic for managing " + name_cap,
    "* @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers",
    "*/",
    "module.exports = {",
    "		index: function(req, res, next) {",
    "			" + name_cap + ".find().exec(function(err, list) {",
    "	  		if (err) return Error('Error');",
    "		  		return res.view({",
    "						result: list",
    "					});",
    "				});",
    "			},",
    "",
    "		show: function(req, res, next) {",
    "			" + name_cap + ".findOneById(req.param('id'), function Founded(err, value) {",
    "				if (err) {",
    "					return next(err);",
    "				}",
    "				res.view({",
    "					element: value",
    "				});",
    "			});",
    "		},",
    "",
    "		edit: function(req, res, next) {",
    "			" + name_cap + ".findOne(req.param('id'), function Founded(err, value) {",
    "				if (err) {",
    "					return next(err);",
    "				}",
    "				res.view({",
    "					element: value",
    "				});",
    "			});",
    "		},",
    "",
    "		update: function(req, res, next) {",
    "	  	" + name_cap + ".update(req.param('id'), req.body, function Update(err, value) {",
    "				if(err) {",
    "					return next(err);",
    "				}",
    "				return res.redirect('" + name + "/show/' + req.param('id'));",
    "			});",
    "		},",
    "",
    "		delete: function(req, res, next) {",
    "			" + name_cap + ".destroy(req.param('id'), function Update(err, value) {",
    "				if (err) {",
    "					return next(err);",
    "				}",
    "				return res.redirect('/" + name + "');",
    "			});",
    "		},",
    "",
    "};"
  ].join("\n");
};

exports.capitalize = function(word) {
  return word.replace(/(^|\s)([a-z])/g, function(m, p1, p2) {
    return p1 + p2.toUpperCase();
  });
};