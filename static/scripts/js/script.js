$(document).ready(function () {
    var prevOffset = 0;
    var prevOffsetDiff = 0;

    $(window).bind('scroll', function () {
        var offsetDiff = prevOffset - window.pageYOffset;
        var offsetDiffSign = Math.sign(offsetDiff);
        var prevOffsetDiffSign = Math.sign(prevOffsetDiff);

        if (offsetDiffSign !== prevOffsetDiffSign) {
            var translateY;

            if (offsetDiffSign > 0) {
                translateY = 0;

            } else {
                translateY = '-100%';
            }

            anime({
                targets: '.header',
                translateY: translateY,
                easing: 'easeInOutSine',
                duration: 200
            });
        }

        prevOffset = window.pageYOffset;
        prevOffsetDiff = offsetDiff;
    });

    anime({
        targets: '.squares__row-item',
        translateX: 50,
        direction: 'alternate',
        delay: function (el, i, l) {
            return i * 100;
        },
        easing: 'easeInExpo',
        duration: 500,
        loop: true
    });

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

    var featuresAnimation = anime({
        targets: '.features__item, .features__image',
        translateY: -50,
        opacity: 1,
        delay: function (el, i, l) {
            return i * 150;
        },
        easing: 'easeInSine',
        duration: 250,
        autoplay: false
    });

    var featuresController = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        triggerElement: '.features'
    })
    .on('enter leave', function(e) {
        if (e.type === 'enter') {
            if (featuresAnimation.reversed) featuresAnimation.reverse();

        } else {
            if (!featuresAnimation.reversed) featuresAnimation.reverse();
        }
        
        featuresAnimation.play();
    })
    .addTo(featuresController);

    var shopAnimation = anime({
        targets: '._item-animation',
        translateY: '10px',
        scale: 0.99,
        opacity: 1,
        easing: 'easeInSine',
        delay: function (el, i, l) {
            return i * 150;
        },
        duration: 200,
        autoplay: false
    });
    
    var shopController = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        triggerElement: '.shop'
    })
    .on('enter leave', function(e) {
        if (e.type === 'enter') {
            if (shopAnimation.reversed) shopAnimation.reverse();

        } else {
            if (!shopAnimation.reversed) shopAnimation.reverse();
        }
        
        shopAnimation.play();
    })
    .addTo(shopController);

    var collectionAnimation = anime({
        targets: '.collection__list-item',
        translateY: '10px',
        opacity: 1,
        easing: 'easeInSine',
        delay: function (el, i, l) {
            return i * 150;
        },
        duration: 200,
        autoplay: false
    });
    
    var collectionController = new ScrollMagic.Controller();

    new ScrollMagic.Scene({
        triggerElement: '.collection'
    })
    .on('enter leave', function(e) {
        if (e.type === 'enter') {
            if (collectionAnimation.reversed) collectionAnimation.reverse();

        } else {
            if (!collectionAnimation.reversed) collectionAnimation.reverse();
        }
        
        collectionAnimation.play();
    })
    .addTo(collectionController);
});