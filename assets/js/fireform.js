// form.on("value", function(data) {
//   var name = data.val() ? data.val().name : "";
//   console.log("My name is " + name);
// });
(function($) {
    $.fireform = function(element, options) {

        var fb = new Firebase(options.fb),
            target = jQuery(element),
            self = this;

        target.on('submit', function() {
            event.preventDefault();
        });

        var obj = {};
        target.find('input.data, textarea.data').each(function(key, input) {
            var name = jQuery(input).attr('name'),
                val = jQuery(input).val();
            if (name)
                obj[name] = val;
            else if (jQuery(input).attr('type') !== 'submit')
                obj['unnamed' + key] = val;
        });
        var form = fb;
        obj['_time'] = new Date().toString();
        form.push(obj, function(err) {
            if (!err)
                target.addClass("submitted");
            else
                target.addClass("error");

            if (options.callback) {
                options.callback(err);
            }
        });

    };

    // add the plugin to the jQuery.fn object
    jQuery.fn.fireform = function(options) {

        // iterate through the DOM elements we are attaching the plugin to
        return this.each(function() {

            // if plugin has not already been attached to the element
            if (undefined == jQuery(this).data('fireform')) {

                // create a new instance of the plugin
                // pass the DOM element and the user-provided options as arguments
                var plugin = new jQuery.fireform(this, options);

                // in the jQuery version of the element
                // store a reference to the plugin object
                // you can later access the plugin and its methods and properties like
                // element.data('pluginName').publicMethod(arg1, arg2, ... argn) or
                // element.data('pluginName').settings.propertyName
                jQuery(this).data('fireform', plugin);

            }

        });

    }
})($);