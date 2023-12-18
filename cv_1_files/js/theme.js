(function($) {
"use strict";

    //On Window load & Resize
    $(window)
        .on('load', function() { //Load
      



        // /Main color

        // Header position
        $('#header_position').on("click", "a", function() {
            var page = $('#page'),
                selector = $(this).data("id");
            $('.layout-switcher').removeClass("current-layout");
            page.removeClass (function (index, className) {
                return (className.match (/(^|\s)layout-menu\S+/g) || []).join(' ');
            });
            $(this).addClass('current-layout');
            page.addClass(selector);
        });
        // Header position

        // Header color
        $('#header_color').on("click", "a", function() {
            var header = $('#site_header'),
                selector = $(this).data("id");
            $('.h-color-switcher').removeClass("current-h-color");
            header.removeClass (function (index, className) {
                return (className.match (/(^|\s)header-color\S+/g) || []).join(' ');
            });
            $('#header_color a').removeClass('current-h-color');
            $(this).addClass('current-h-color');
            header.addClass(selector);
        });
        // /Header color



    });

})(jQuery);

