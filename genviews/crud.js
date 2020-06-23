var Handlebars = require('handlebars');
var components = require('./components');

//Generic function
function op(title, model) {
  return new Promise(function (resolve, reject) {
    var data_create = {
      title: title,
      name: model.model_name,
      elements: []
    };

    model
      .view_content
      .map((item) => {
        var element = JSON.parse(item);
        //element => '{"required":true,"name":"descripcion","type":"text"}',
        data_create
          .elements
          .push(element)
      });

    return resolve(data_create);
  });
};

//Create "create" html from handlebars
create = function (title, model) {
  return new Promise(function (resolve, reject) {
    var data_create = {
      title: title,
      name: model.model_name,
      elements: []
    };

    model
      .view_content
      .map((item) => {
        var element = JSON.parse(item);
        // element => '{"required":true,"name":"descripcion","type":"text"}',
        data_create
          .elements
          .push(element)
      });

    components.create(function (hbs) {
      var template = Handlebars.compile(hbs);
      var html = template(data_create);
      //console.log(html);
      resolve(html);
    });
  });
};

//Create "edit" html from handlebars
edit = function (title, model) {
  return new Promise(function (resolve, reject) {
    var data_create = {
      title: title,
      name: model.model_name,
      elements: []
    };

    model
      .view_content
      .map((item) => {
        var element = JSON.parse(item);
        //element => '{"required":true,"name":"descripcion","type":"text"}',
        data_create
          .elements
          .push(element)
      });

    components.edit(function (hbs) {
      var template = Handlebars.compile(hbs);
      var html = template(data_create);
      //console.log(html);
      resolve(html);
    });
  });
};

//Create "index" html from handlebars
index = function (title, model) {
  return new Promise(function (resolve, reject) {
    var data_list = {
      title: title,
      name: model.model_name,
      elements: []
    };

    model
      .view_content
      .map((item) => {
        var element = JSON.parse(item);
        //element => '{"required":true,"name":"descripcion","type":"text"}',
        data_list
          .elements
          .push(element)
      });

    components.index(function (hbs) {
      var template = Handlebars.compile(hbs);
      var html = template(data_list);
      //console.log(html);
      resolve(html);
    });
  });
};

//Create "show" html from handlebars
show = function (title, model) {
  return new Promise(function (resolve, reject) {
    var data_list = {
      title: title,
      name: model.model_name,
      elements: []
    };

    model
      .view_content
      .map((item) => {
        var element = JSON.parse(item);
        //element => '{"required":true,"name":"descripcion","type":"text"}',
        data_list
          .elements
          .push(element)
      });

    components.show(function (hbs) {
      var template = Handlebars.compile(hbs);
      var html = template(data_list);
      //console.log(html);
      resolve(html);
    });
  });
};

/*
EXAMPLE:
{
  model_name: 'tareasNoRealizadas',
  content: 'attributes: { id_tarea: {type: \'integer\',required: true}, descripcion: {type: \'string\',required: true}, fecha_registro: {type: \'datetime\',required: true}, fecha_realizado: {type: \'datetime\',required: true}, realizado: {type: \'boolean\',required: true}, fk_persona_empleado: {type: \'integer\',required: true}, categoria: {type: \'string\',required: true} }',
  view_content: ['{"required":true,"name":"id_tarea","type":"number"}',
    '{"required":true,"name":"descripcion","type":"text"}',
    '{"required":true,"name":"fecha_registro","type":"datetime"}',
    '{"required":true,"name":"fecha_realizado","type":"datetime"}',
    '{"required":true,"name":"realizado","type":"boolean"}',
    '{"required":true,"name":"fk_persona_empleado","type":"number"}',
    '{"required":true,"name":"categoria","type":"text"}'
  ]
}
*/