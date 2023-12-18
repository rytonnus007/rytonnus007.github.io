/*
* Template Name: Aveo - Responsive vCard WordPress Theme
* Author: lmpixels
* Author URL: http://themeforest.net/user/lmpixels
* Version: 1.0.1
*/

(function($) {
"use strict";
    var body = $('body');
    // Hide Mobile men
    function mobileMenuHide() {
        var windowWidth = $(window).width(),
            siteHeader = $('#site_header');

        if (windowWidth < 992) {
            siteHeader.addClass('mobile-menu-hide');
            setTimeout(function(){
                siteHeader.addClass('animate');
            }, 500);
        } else {
            siteHeader.removeClass('animate');
        }
    }
    // /Hide Mobile menu

    // Header height
    function headerHeight() {
        setTimeout(function(){
            var windowWidth = $(window).width(),
            subpages = $('.subpages'),
            mainContent = $('#main-content');
            if (windowWidth < 992) {
                mainContent.css( "padding-top", 15 );
                subpages.css( "padding-top", 15 );
            } else {
                var header = $('.header'),
                headerHeight = header.height();
                if ( $('.header').hasClass('sticked') ) {
                    headerHeight = header.height() + 40;
                }
                mainContent.css( "padding-top", headerHeight );
                subpages.css( "padding-top", headerHeight );
            }
        }, 400);
    }
    // Header height

    //On Window load & Resize
    $(window)
        .on('load', function() { //Load
            // Animation on Page Loading
            $(".preloader").fadeOut("slow");

            // initializing page transition.
            var ptPage = $('.subpages');
            if (ptPage[0]) {
                PageTransitions.init({
                    menu: 'ul.site-auto-menu',
                });
            }
            headerHeight();
        })
        .on('resize', function() { //Resize
            mobileMenuHide();
            headerHeight();
        })
        .scroll(function () {
            var header = $('.header');
            if ($(window).scrollTop() < 20) {
                header.removeClass('sticked');
            } else {
                header.addClass('sticked');
            }
        });


    // On Document Load
    $(document).on('ready', function() {
        body.stop().animate({ scrollTop: 0 }, 500);
        // Initialize Portfolio grid
      
        // Mobile menu
        $('.menu-toggle').on("click", function () {
            $('#site_header').addClass('animate');
            $('#site_header').toggleClass('mobile-menu-hide');
        });

        // Mobile menu hide on main menu item click
        $('.site-auto-menu').on("click", "a", function (e) {
            mobileMenuHide();
        });

        // Text rotation
        $('.text-rotation').owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            margin: 10,
            items: 1,
            autoplay: true,
            autoplayHoverPause: false,
            autoplayTimeout: 3800,
            animateOut: 'zoomOut',
            animateIn: 'zoomIn'
        });

        // Lightbox init
        body.magnificPopup({
            fixedContentPos: false,
            delegate: 'a.lightbox',
            type: 'image',
            removalDelay: 300,

            // Class that is added to popup wrapper and background
            // make it unique to apply your CSS animations just to this exact popup
            mainClass: 'mfp-fade',
            image: {
                // options for image content type
                titleSrc: 'title',
                gallery: {
                    enabled: true
                },
            },

            iframe: {
                markup: '<div class="mfp-iframe-scaler">'+
                        '<div class="mfp-close"></div>'+
                        '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>'+
                        '<div class="mfp-title mfp-bottom-iframe-title"></div>'+
                      '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                patterns: {
                    youtube: {
                      index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                      id: null, // String that splits URL in a two parts, second part should be %id%
                      // Or null - full URL will be returned
                      // Or a function that should return %id%, for example:
                      // id: function(url) { return 'parsed id'; }

                      src: '%id%?autoplay=1' // URL that will be set as a source for iframe.
                    },
                    vimeo: {
                      index: 'vimeo.com/',
                      id: '/',
                      src: '//player.vimeo.com/video/%id%?autoplay=1'
                    },
                    gmaps: {
                      index: '//maps.google.',
                      src: '%id%&output=embed'
                    }
                },

                srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
            },

            callbacks: {
                markupParse: function(template, values, item) {
                 values.title = item.el.attr('title');
                }
            },
        });

        $('.ajax-page-load-link').magnificPopup({
            type: 'ajax',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true
            },
        });

        $('.form-control').val('');

        $(".form-control").on("focusin", function(){
            $(this).parent('.form-group').addClass('form-group-focus');
        });

        $(".form-control").on("focusout", function(){
            if($(this).val().length === 0) {
                $(this).parent('.form-group').removeClass('form-group-focus');
            }
        });

    });

})(jQuery);

(function($) { 
"use strict";
    $(document).ready(function ($) {
        var custom_styles = "";
        
        function skillsStyles() {
            $( '.skill-container' ).each( function() {
                var value = $(this).attr('data-value');

                if( typeof value != 'undefined' ) {
                    var id = $(this).attr('id'),
                    $custom_style = '#' + id + ' .skill-percentage { width: ' + value + '%; } ';
                    custom_styles += $custom_style;
                }
            });
            $('head').append('<style data-styles="aveo-theme-skills-css" type="text/css">' + custom_styles  + '</style>');
        }

        skillsStyles();

        $(this).ajaxComplete(function() {
            $('style[data-styles="aveo-theme-skills-css"]').remove().detach();
            skillsStyles();
        });
    });
})(jQuery);