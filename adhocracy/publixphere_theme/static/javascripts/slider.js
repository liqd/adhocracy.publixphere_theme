$(document).ready(function () {
    scrollable_init = function(element, settings) {
        settings = $.extend({
            'items': '.items',
            'next': '.next',
            'prev': '.prev',
            'speed': 400,
            'easing': 'swing',
            'interval': 5000,
            'count': 1,
            'margin': 0,
        }, settings);

        var container = $(element);
        var inner = container.find(settings.items);
        var lock = false;

        var position = function(i) {
            return (-100 + (100 + settings.margin) / settings.count * i) + '%';
        }

        var update_items = function(offset, callback) {
            inner.children().each(function(i, e) {
                var item = $(e);
                item.animate({
                    'margin-left': position(i + offset)
                }, settings.speed, settings.easing, function() {
                    if (i === inner.children().length - 1 && callback) {
                        callback();
                    }
                });
            });
        }

        var next = function() {
            if (lock) {
                return;
            }
            lock = true;
            var pos = position(inner.children().length - 1);
            var n = $(inner.children()[settings.count]);
            n.show()
            update_items(-1, function() {
                inner.children().first().hide().css({'margin-left': pos});
                inner.append(inner.children().first());
                lock = false;
            });
        }
        var prev = function() {
            if (lock) {
                return;
            }
            lock = true;
            var pos = position(-1);
            inner.prepend(inner.children().last());
            inner.children().first().css({'margin-left': pos}).show();
            update_items(0, function() {
                $(inner.children()[settings.count]).hide();
                lock = false;
            });
        }

        for (var i=inner.children().length; i < settings.count + 1; i++) {
            inner.append($('<div>'));
        }

        inner.children().each(function(i, e) {
            var item = $(e);
            item.css({
                'width': ((100 + settings.margin) / settings.count - settings.margin) + '%',
                'margin-left': position(i)
            });
            if (i <= settings.count) {
                item.show();
            } else {
                item.hide();
            }
        });
        container.attr('tabindex', 0);

        container.on('keydown', function(e) {
            console.log(e.keyCode);

            // do nothing with CTRL / ALT buttons
            if (e.altKey || e.ctrlKey) {
                return;
            }

            if (e.keyCode == 39) {
                next();
                return e.preventDefault();
            } else if (e.keyCode == 37) {
                prev();
                return e.preventDefault();
            }
        });

        container.on('click', settings.next, function(e) {
            next();
            return e.preventDefault();
        });
        container.on('click', settings.prev, function(e) {
            prev();
            return e.preventDefault();
        });
        if (settings.interval) {
            setInterval(function() {
                next();
            }, settings.interval);
        }
    }

    $('.galleria').each(function(i, e) {
        var galleria = $(e);

        galleria.find('img').each(function(i, e) {
            var img = $(e);
            var item = img.wrap($('<div class="galleria-item">')).parent();
            var details = $('<div class="galleria-details">');
            item.append(details);

            var link = img.data('link');
            var linkName = img.data('link-name');
            var title = img.data('title');

            details.append($(title).wrap($('<h3>')).parent());
            details.append($('<a>')
                .attr('href', link)
                .text(linkName)
                .addClass('item-link')
            );
        });
    });
    $('#galleria-5f9a6cc463d14fa798c604d173d8fc77').append('<a class="next" href="#" title="next"></a>');
    $('#galleria-5f9a6cc463d14fa798c604d173d8fc77').prepend('<a class="prev" href="#" title="prev"></a>');
    scrollable_init($('#galleria-aef93412aeb1495f95035c1e8eb0fecb')[0], {'items': '.galleria-inner', 'interval': 8000});
    scrollable_init($('#galleria-5f9a6cc463d14fa798c604d173d8fc77')[0], {'items': '.galleria-inner', 'count': 5, 'margin': 2, 'interval': false});
    scrollable_init($('#galleria-9558eb947b2a44e5bd06f9a492e01c01')[0], {'items': '.galleria-inner', 'interval': 8000});
});
