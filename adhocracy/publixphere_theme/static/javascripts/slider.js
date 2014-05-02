$(document).ready(function () {
    var Scrollable = function(element, settings) {
        settings = $.extend({
            'items': '.items',
            'next': '.next',
            'prev': '.prev',
            'speed': 400,
            'easing': 'swing',
            'interval': 5000,
            'count': 1,
            'margin': 0,
            'navigation': false,
        }, settings);

        var self = this;
        this.container = $(element);
        var inner = self.container.find(settings.items);
        var lock = false;  // essential to avoid breakage

        var current_index;
        var update_current_index = function(value) {
            current_index = value;
            while (current_index < 0) {
                current_index += inner.children().length;
            }
            current_index %= inner.children().length;

            if (settings.navigation) {
                $(settings.navigation).children().removeClass('current');
                $(settings.navigation).children().slice(current_index, current_index + 1).addClass('current');
            }
        }
        update_current_index(0);

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

        // this is only a slider if there are at least count+1 items
        if (inner.children().length > settings.count) {
            this.next = function(success) {
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

                    update_current_index(current_index + 1);

                    lock = false;

                    if (success) {
                        success();
                    }
                });
            }
            this.prev = function(success) {
                if (lock) {
                    return;
                }
                lock = true;
                var pos = position(-1);
                inner.prepend(inner.children().last());
                inner.children().first().css({'margin-left': pos}).show();
                update_items(0, function() {
                    $(inner.children()[settings.count]).hide();

                    update_current_index(current_index - 1);

                    lock = false;

                    if (success) {
                        success();
                    }
                });
            }
            this.goto_index = function(index) {
                var step,
                    distance,
                    distance_prev,
                    distance_next;

                // decide if we go forwards or backwards
                distance_prev = current_index - index;
                if (distance_prev < 0) {
                    distance_prev += inner.children().length;
                }
                distance_next = index - current_index;
                if (distance_next < 0) {
                    distance_next += inner.children().length;
                }
                if (distance_next <= distance_prev) {
                    step = this.next;
                    distance = distance_next;
                } else {
                    step = this.prev;
                    distance = distance_prev;
                }

                // step until we have reached index
                var _step = function() {
                    if (current_index !== index % inner.children().length) {
                        step.apply(self, [_step]);
                    }
                };
                _step();
            }
            self.container.attr('tabindex', 0);

            self.container.on('keydown', function(e) {
                // do nothing with CTRL / ALT buttons
                if (e.altKey || e.ctrlKey) {
                    return;
                }

                if (e.keyCode == 39) {
                    self.next();
                    return e.preventDefault();
                } else if (e.keyCode == 37) {
                    self.prev();
                    return e.preventDefault();
                }
            });

            self.container.on('click', settings.next, function(e) {
                self.next();
                return e.preventDefault();
            });
            self.container.on('click', settings.prev, function(e) {
                self.prev();
                return e.preventDefault();
            });
            if (settings.navigation) {
                var navigation = self.container.find(settings.navigation);
                navigation.on('click', function(e) {
                    var direct_child = $(e.target).parentsUntil(settings.navigation).last();
                    var index = navigation.children().index(direct_child);
                    if (index >= 0) {
                        self.goto_index(index);
                    }
                    return e.preventDefault();
                });
            }
            if (settings.interval) {
                var intervalID;
                var startInterval = function() {
                    intervalID = setInterval(function() {
                        self.next();
                    }, settings.interval);
                };

                // do not change on mouseover
                container.mouseover(function() {
                    clearInterval(intervalID);
                    intervalID = null;
                });
                container.mouseout(function() {
                    startInterval();
                });
                startInterval();
            }
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
            details.append($('<p>').text(img.data('description')));
            details.append($('<a>')
                .attr('href', link)
                .text(linkName)
                .addClass('item-link')
            );
        });
    });
    $('#galleria-aef93412aeb1495f95035c1e8eb0fecb').add('#galleria-9558eb947b2a44e5bd06f9a492e01c01').each(function(i, e) {
        var galleria = $(e);
        var navigation = $('<ul class="navigation">');
        galleria.append(navigation);

        galleria.find('.galleria-item').each(function(i, e) {
            navigation.append($('<li><a href="#"></a></li>'));
        });
    });
    $('#galleria-5f9a6cc463d14fa798c604d173d8fc77').append('<a class="next" href="#" title="next"></a>');
    $('#galleria-5f9a6cc463d14fa798c604d173d8fc77').prepend('<a class="prev" href="#" title="prev"></a>');
    new Scrollable($('#galleria-aef93412aeb1495f95035c1e8eb0fecb')[0], {'items': '.galleria-inner', 'interval': 8000, 'navigation': '.navigation'});
    new Scrollable($('#galleria-9558eb947b2a44e5bd06f9a492e01c01')[0], {'items': '.galleria-inner', 'interval': 8000, 'navigation': '.navigation'});
    small_scrollable = new Scrollable($('#galleria-5f9a6cc463d14fa798c604d173d8fc77')[0], {'items': '.galleria-inner', 'count': 5, 'margin': 2, 'interval': false});

    $('#galleria-aef93412aeb1495f95035c1e8eb0fecb').append($('<img src="/static_theme/static/images/badge_pp_claim.png" alt="unabhängig, überparteilich, unkommerziell">').css({
        'position': 'absolute',
        'bottom': '-53px',
        'right': '7px',
    })).css({
        'margin-bottom': '32px',
    });
});
