var ProgressBar = require('progress');
var to = require('../configs/to');
require('../configs/color');

var gencode = require('gencode');
var mkdir = require("mkdir-promise");
var s = require("underscore.string");

var Beautifier = require('node-js-beautify');
var b = new Beautifier();

/**
 * [save models in the folder Models]
 * @param  {[type]} dir_folder_controllers [path folder]
 * @param  {[type]} Models                 [array json]
 * @return {void}                        [none]
 */
saveControllers = function(dir_folder_controllers, Models) {
    var bar2 = new ProgressBar(':bar', {
        total: Models.length
    });

    mkdir(dir_folder_controllers).then(() => {
        Models.map((model) => {
            var name_c = to
                .capitalize(model.model_name)
                .trim()
                .concat("Controller.js");
            gencode.save(b.beautify_js(to.saveController(s.camelize(model.model_name))), dir_folder_controllers, name_c).then((value) => {
                bar2.tick();
                if (bar2.complete) {
                    console.log('Controllers ' + color("[OK]", "green"));
                }
            }, (err) => {
                console.warn([ansi.red.open, "ERROR", err, ansi.red.close].join("\n"));
            });
        });
    }, (ex) => {
        console.error(ex);
    });
};

/**
 * [saveModels save models in the folder Models]
 * @param  {string} dir_folder_model [description]
 * @param  {array of models: {model_name & content}} Models           [Array of models postgres]
 */
saveModels = function(dir_folder_model, Models) {
    var bar = new ProgressBar(':bar', {
        total: Models.length
    });

    //console.log(Models);
    mkdir(dir_folder_model).then(() => {
        Models.map((model) => {
            //console.log(model);
            var name_m = to
                .capitalize(model.model_name)
                .trim() + ".js";
            gencode.save(b.beautify_js(to.toModel(model.content)), dir_folder_model, name_m).then((value) => {
                bar.tick();
                if (bar.complete) {
                    console.log('Models ' + color("[OK]", "green"));
                }
            }, (err) => {
                console.error(color(err, "red"));
            });
        });
    }, (ex) => {
        console.error(ex);
    });
};

/**
 * [saveRoutes save routes in the folder routes]
 * @param  {string} dir_folder_model [description]
 * @param  {array of models: {model_name & content}} Models           [Array of models postgres]
 */
saveRoutes = function(dir_folder_model, Models) {
    var name_m = "routes.js"

    mkdir(dir_folder_model).then(() => {
        var bar = new ProgressBar(':bar', {
            total: Models.length
        });
        var content = ""
        Models.map((model) => {
            //content += "'GET /" + model.model_name + "s': { controller:'" + model.model_name.charAt(0).toUpperCase()+model.model_name.slice(1)  + "Controller', action: '" + model.model_name + "/index' }," + "\n"
            content += "'GET /" + model.model_name + "s': { action: '" + model.model_name + "/index' }," + "\n"
            content += "'GET /" + model.model_name + ":id': { action: '" + model.model_name + "/show' }," + "\n"
            content += "'GET /" + model.model_name + "/edit/:id': { action: '" + model.model_name + "/edit' }," + "\n"
            content += "'GET /" + model.model_name + "/create': { view: '"+ model.model_name +"/create' } ," + "\n"
            content += "'POST /api/v1/" + model.model_name + "/create': { action: '" + model.model_name + "/create' }," + "\n"
            content += "'PUT /api/v1/" + model.model_name + "/update': { action: '" + model.model_name + "/update' }," + "\n"
            content += "'PUT /api/v1/" + model.model_name + "/delete': { action: '" + model.model_name + "/delete' }," + "\n"
        });
        gencode.save(b.beautify_js(content), dir_folder_model, name_m).then((value) => {
            bar.tick();
            if (bar.complete) {
                console.log('Routes ' + color("[OK]", "green"));
            }
        }, (err) => {
            console.error(color(err, "red"));
        });


    }, (ex) => {
        console.error(ex);
    });
};

/**
 * [saveLinks save links in the folder links]
 * @param  {string} dir_folder_model [description]
 * @param  {array of models: {model_name & content}} Models           [Array of models postgres]
 */
saveLinks = function(dir_folder_model, Models) {
    var name_m = "links.html"

    mkdir(dir_folder_model).then(() => {
        var bar = new ProgressBar(':bar', {
            total: Models.length
        });
        var content = ""
        var result = Models.map(m => m.model_name);
        console.log(result)
        result.sort()
        result.map((model_name) => {
            content += "<a class='dropdown-item' href='/" + model_name + "s'>" + model_name + "s</a>" + "\n"
        });
        gencode.save(content, dir_folder_model, name_m).then((value) => {
            bar.tick();
            if (bar.complete) {
                console.log('Links ' + color("[OK]", "green"));
            }
        }, (err) => {
            console.error(color(err, "red"));
        });


    }, (ex) => {
        console.error(ex);
    });
};