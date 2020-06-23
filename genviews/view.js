var gencode = require('gencode');
var ansi = require('ansi-styles');
var mkdir = require("mkdir-promise");
var ProgressBar = require('progress');

require('./crud');
require('../configs/route');
require('../configs/color');


exports.generate = function(Models, folder_views) {
  mkdir(folder_views).then(() => {
    var bar3 = new ProgressBar(':bar', {
      total: Models.length
    });

    Models.forEach(model => {
      var route = concat(folder_views, model.model_name);
      
      mkdir(route).then(() => {
        create(model.model_name, model).then((html) => {
          //console.log(html);
          gencode.save(html, route, "create.ejs").then((value) => {
            //console.log(value);
          }, (err) => {
            console.log([ansi.red.open, "ERROR", err, ansi.red.close].join("\n"));
          });
        });

        edit(model.model_name, model).then((html) => {
          gencode.save(html, route, "edit.ejs").then((value) => {
            //console.log(value);
          }, (err) => {
            console.log([ansi.red.open, "ERROR", err, ansi.red.close].join("\n"));
          });
        });

        index(model.model_name, model).then((html) => {
          gencode.save(html, route, "index.ejs").then((value) => {
            //console.log(value);
          }, (err) => {
            console.log([ansi.red.open, "ERROR", err, ansi.red.close].join("\n"));
          });
        });

        show(model.model_name, model).then((html) => {
          gencode.save(html, route, "show.ejs").then((value) => {
            //console.log(value);
          }, (err) => {
            console.log([ansi.red.open, "ERROR", err, ansi.red.close].join("\n"));
          });
        });
      });

      bar3.tick();
      if (bar3.complete) {
        console.log('Views ' + color("[OK]", "green"));
      }
    });
  });
};
