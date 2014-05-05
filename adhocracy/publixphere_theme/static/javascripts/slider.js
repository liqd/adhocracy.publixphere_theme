$(document).ready(function () {
    var uuid = function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }


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
                self.container.trigger('move');
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
                self.container.trigger('move');
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

                this.lock = function() {
                    clearInterval(intervalID);
                    intervalID = null;
                }
                this.unlock = function() {
                    startInterval();
                }
                // do not change on mouseover
                self.container.mouseover(function() {
                    self.lock();
                });
                self.container.mouseout(function() {
                    self.unlock();
                });
                startInterval();
            } else {
                this.lock = function() {};
                this.unlock = function() {};
            }
        }
    }

    // convert images to slider items
    $('.galleria').each(function(i, e) {
        var galleria = $(e);

        galleria.find('img').each(function(i, e) {
            var img = $(e);
            var item = img.wrap($('<div class="galleria-item">')).parent();
            var details = $('<div class="galleria-details">');
            item.append(details);

            item.attr('id', uuid());
            var link = img.data('link');
            var linkName = img.data('link-name');
            var title = img.data('title');

            if (img.data('body')) {
                item.addClass('has-body');
                item.append($('<div class="body">').html(img.data('body')).hide().attr('id', item.attr('id') + '-body'))
            }

            details.append($(title).wrap($('<h3>')).parent());
            details.append($('<p>').text(img.data('description')));
            details.append($('<a>')
                .attr('href', link)
                .text(linkName)
                .addClass('item-link')
            );
        });
    });

    // setup large sliders
    $('#galleria-aef93412aeb1495f95035c1e8eb0fecb').add('#galleria-9558eb947b2a44e5bd06f9a492e01c01').each(function(i, e) {
        var galleria = $(e);
        var navigation = $('<ul class="navigation">');
        galleria.append(navigation);

        galleria.find('.galleria-item').each(function(i, e) {
            navigation.append($('<li><a href="#"></a></li>'));
        });
    });
    new Scrollable($('#galleria-aef93412aeb1495f95035c1e8eb0fecb')[0], {
        'items': '.galleria-inner',
        'interval': 8000,
        'navigation': '.navigation',
    });
    new Scrollable($('#galleria-9558eb947b2a44e5bd06f9a492e01c01')[0], {
        'items': '.galleria-inner',
        'interval': 8000, 'navigation': '.navigation',
    });

    $('#galleria-aef93412aeb1495f95035c1e8eb0fecb').append($('<img src="/static_theme/static/images/badge_pp_claim.png" alt="unabhängig, überparteilich, unkommerziell">').css({
        'position': 'absolute',
        'bottom': '-53px',
        'right': '7px',
    })).css({
        'margin-bottom': '32px',
    });

    // setup small slider
    $('#galleria-5f9a6cc463d14fa798c604d173d8fc77').each(function(i, e) {
        var galleria = $(e),
            small_scollable,
            extra_detail,
            showBody,
            hideBody;

        // controls
        galleria.append('<a class="next" href="#" title="next"></a>');
        galleria.prepend('<a class="prev" href="#" title="prev"></a>');

        small_scrollable = new Scrollable(e, {
            'items': '.galleria-inner',
            'count': 5,
            'margin': 0.5,
            'interval': false,
        });

        // extra detail
        extra_detail = $('<div class="galleria-extra-detail">')
            .hide()
            .insertAfter(galleria);

        showBody = function(item) {
            extra_detail.find('#' + item.attr('id') + '-body').show();
            item.addClass('active');
        };
        hideBody = function(item) {
            extra_detail.find('#' + item.attr('id') + '-body').hide();
            item.removeClass('active');
        };

        galleria.find('.galleria-item.has-body').each(function(i, el) {
            // move body from item into extra_detail
            var item = $(el);
            extra_detail.append(item.find('.body'));
        });

        galleria.on('move', function() {
            extra_detail.slideUp(function() {
                hideBody(galleria.find('.galleria-item.active'));
                small_scrollable.unlock();
            });
        });

        galleria.on('click', '.galleria-item', function() {
            var item = $(this);

            if (!item.hasClass('active') && item.hasClass('has-body')) {
                // full height
                var heights = $.map(galleria.find('.galleria-item'), function(el) {return $(el).outerHeight()});
                var max_height = Math.max.apply(Math, heights);
                item.height(max_height);

                small_scrollable.lock();

                var current = galleria.find('.galleria-item.active');
                if (current) {
                    extra_detail.slideUp(function() {
                        hideBody(current);
                        showBody(item);
                        extra_detail.slideDown();
                    });
                } else {
                    showBody(item);
                    extra_detail.slideDown();
                }
            }
        });
    });
});
