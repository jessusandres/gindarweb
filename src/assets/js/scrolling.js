(function ($) {
    "use strict";
    $('a.page-scroll').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: ($($anchor.attr('href')).offset().top - 149)
        }, 1250, 'easeInOutExpo');
        event.preventDefault();
    });
    $('body').scrollspy({
        target: '.navbar-fixed-top',
        offset: 51
    });
    $('.navbar-collapse ul li a').click(function () {
        $('.navbar-toggler:visible').click();
    });
    $('#mainNav').affix({
        offset: {
            top: 100
        }
    })
})(jQuery);
