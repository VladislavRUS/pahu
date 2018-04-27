$(document).ready(function () {

    if ($(window).width() >= 1200) {

        $('#line').attr('x2', $('.menu').width())

        $('.menu__item').each(function (idx, elem) {
            $(elem).bind('click', function () {
                makeActive($(this));
            });

            if (idx === 0) {
                makeActive($(elem));
            }
        });
    }

    function makeActive(elem) {
        var menu = $('.menu');

        var elemWidth = elem.width();
        var dashWidth = menu.width() - elemWidth;
        var strokeDasharray = elemWidth + 'px' + ', ' + dashWidth.toFixed(3) + 'px';
        var menuPosition = menu.offset().left;
        var elemPosition = elem.offset().left;

        anime({
            targets: '#line',
            strokeDashoffset: function (el) {
                setTimeout(function () {
                    el.setAttribute('stroke-dasharray', strokeDasharray);
                });
                return [-(elemPosition - menuPosition)];
            },
            easing: 'easeOutExpo',
            duration: 500,
        });
    }

    $('.hamburger').bind('click', function () {
        [$('.header__menu'), $('body'), $('.hamburger')].forEach(function (element) {
            element.toggleClass('_active');
        });

        if ($('.header__menu').hasClass('_active')) {
            anime({
                targets: '.menu',
                translateX: [{
                        value: '-100%',
                        duration: 0
                    },
                    {
                        value: 0,
                        duration: 400
                    }
                ],
                easing: 'easeOutExpo'
            });
        }
    });
});