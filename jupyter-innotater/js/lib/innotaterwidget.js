var widgets = require('@jupyter-widgets/base');
var controls = require('@jupyter-widgets/controls');

require("./style.css");

var _ = require('lodash');
var $ = require('jquery');

// Custom Model. Custom widgets models must at least provide default values
// for model attributes, including
//
//  - `_view_name`
//  - `_view_module`
//  - `_view_module_version`
//
//  - `_model_name`
//  - `_model_module`
//  - `_model_module_version`
//
//  when different from the base class.


var InnotaterModel = controls.VBoxModel.extend({
    defaults: _.extend(controls.VBoxModel.prototype.defaults(), {
    /*    _model_name: 'InnotaterModel',
        _view_name: 'InnotaterView',
        _model_module: 'jupyter-innotater',
        _view_module: 'jupyter-innotater',
        _model_module_version: '0.1.0',
        _view_module_version: '0.1.0' */
    })
});


// Custom View. Renders the widget model.
var InnotaterView = controls.VBoxView.extend({

    initialize: function() {
        InnotaterView.__super__.initialize.apply(this, arguments);
    },

    InnotaterView: function() {
        InnotaterView.__super__.apply(this, arguments);
    },

    render: function () {
        var self = this;
        InnotaterView.__super__.render.apply(this, arguments);

        self.el.setAttribute('tabindex', '0');

        if (window.location.hostname == "www.kaggleusercontent.com") {
            this.el.classList.add('innotater-kaggle');
        }

        // Keyboard shortcuts still need a lot of work - should be bound correctly to InnotaterView
        if (self.model.get('keyboard_shortcuts')) {
            self.el.addEventListener('keypress', function(e) {
                 self.handle_keypress(e);
            });
        }
    },

    handle_keypress: function(event) {
        this.send({
            event: 'keypress',
            code: event.which
        });
    },

});

module.exports = {
    InnotaterView: InnotaterView,
    InnotaterModel: InnotaterModel
};



