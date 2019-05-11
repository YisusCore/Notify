;
(function(api) {
    'use strict';
    var module, define;

    if (typeof module === 'object' && typeof module.exports === 'object') {
        module.exports = api('jQuery');
    } else if (typeof define === 'function' && define.amd) {
        define(['jQuery'], api);
    } else {
        api(jQuery);
    }
}(function($) {
    'use strict';

    $.Notify = (function() {
        var ToastLoaded;

        var Notificacion = function JNotification(title, text, options) {
            if (typeof options === 'undefined') {
                options = {};
            }

            if (typeof text === 'undefined') {
                options.body = text;
            }

            if (typeof options.body === 'undefined' || options.body === null) {
                options.body = text;
            }

            new Notification(title, options);
        };

        var Toaster = function JSwal(title, text, options) {
            if (typeof options === 'undefined') {
                options = {};
            }

            if (typeof options.type === 'undefined' || options.type === null) {
                options.type = 'info';
            }

            ToastLoaded
                .do(function(toastr) {
                    toastr[options.type](text, title, options);
                });
        };

        var Alerta = function JAlert(title, text, options) {
            alert(text);
            return true;
        };

        var NoNotificacion = function NoNotificacion(title, text, options) {
            if (typeof Using === 'undefined') {
                Alerta(title, text, options);
                return;
            }

            if (!ToastLoaded) {
                ToastLoaded = Using('toastr');
            }

            ToastLoaded
                .then(function() {
                    Toaster(title, text, options);
                })
                .catch(function() {
                    Alerta(title, text, options);
                });
        };

        var Function = function Notify(title, text, options) {
            if (typeof title === 'undefined') {
                title = '';
            }

            if (typeof text === 'undefined') {
                text = title;
                title = '';
            }

            if (!("Notification" in window)) {
                NoNotification(title, text, options);
                return;
            }

            if (Notification.permission === 'granted') {
                Notificacion(title, text, options);
                return;
            }

            if (Notification.permission === 'denied') {
                NoNotificacion(title, text, options);
                return;
            }

            Notification.requestPermission(function(permission) {
                if (permission === 'granted') {
                    Notificacion(title, text, options);
                    return;
                }

                NoNotificacion(title, text, options);
            });
        };

        return Function;
    }());
}));
