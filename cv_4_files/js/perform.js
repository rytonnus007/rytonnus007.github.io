(function ($) {
	"use strict";
	
	var modelApp = {

		peloader: function() {
			var $preloaderSelector = $("#preloader-wrap");
			$preloaderSelector.delay(200).fadeOut();
		},
		/* ---------------------------------------------
		 Car Video
		--------------------------------------------- */
		onePageMenu: function() {
			function onePageNav($selector) {
				var $navSelector = $($selector);
				$navSelector
				.not('[href="#"]')
				.not('[href="#0"]')
				.click(function(event) {
				    if ( location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname ) {
				      	var target = $(this.hash);
				      	target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');

				      	$navSelector.removeClass("active");
				      	if( target.length) {
					      	if($(this)[0].hash.slice(1) === target[0].id) {
					      		$(this).addClass("active");
					      	} else {
					      		$(this).removeClass("active");
					      	}
				      	}
				     	
					    if (target.length) {
					        event.preventDefault();
					        $('html, body').animate({
					          	scrollTop: target.offset().top
					        }, 1000);
					    }
				    }
				});

				$navSelector.each(function(event) {
			      	var target = $(this.hash);
			      	if( target.length) {
				      	if(location.hash.slice(1) === target[0].id) {
				      		$(this).addClass("active");
				      	} else if(!location.hash) {
				      		
				      	} else {
				      		$(this).removeClass("active");
				      	}
			      	}
				});

				function onScroll(event){
				    var scrollPos = $(document).scrollTop();
				    $navSelector.each(function () {
				        var currLink = $(this);
		                if(currLink[0].hash !== "" && $(currLink[0].hash).position() !== undefined) {

	                		var $getNavHas = $(currLink).prop('href').split('#')[1],
	                			$getSection = $('#' + $getNavHas); 

	                		$getSection.each(function() {
		                		var $topPos = $(this).offset().top,
		                			$topPosRound = Math.round($topPos - 120 ),
		                			$presentPos = Math.round(scrollPos);

		                		if ($topPosRound <= $presentPos && $topPosRound + $(this).height() > $presentPos) {
		                		    $(currLink).parent().addClass("active"); 
		                		} else {
		                			$(currLink).parent().removeClass("active");
		                		}
	                		});
		                } else {
		                	return false;
		                }
				    });
				}

				$(document).on("scroll", onScroll);	     
			}
			onePageNav('.mainmenu li a');
			onePageNav('.btn-banner');
		},

		/* ---------------------------------------------
		 Individual Menu
		--------------------------------------------- */
		individual_menu: function() {
			var combinedmenu = $('.main-navigation ul.mainmenu').clone();
			combinedmenu.appendTo('#mobile-nav');

			// Sub Menu Indicator
			var $submenuIndicator = $('.mainmenu li > .sub-menu');
			$submenuIndicator.prev().append('<i class="fa fa-angle-down"></i>');

			var $submenu = $(".mainmenu").find('li').has('.sub-menu');
			$submenu.prepend("<span class='menu-click'><i class='menu-arrow fa fa-plus'></i></span>");
			var $mobileSubMenuOpen = $(".menu-click");
			$mobileSubMenuOpen.each(function() {
				var $self = $(this);
				$self.on("click", function(e) {
					e.stopImmediatePropagation();
				    $self.siblings(".sub-menu, .dropdown-menu").slideToggle("slow");
				    $self.children(".menu-arrow").toggleClass("menu-extend");
				});
			});

			// Mobile Menu
			function mobileNav($selector, $parentSelector) {
				var $mobileNav = $($selector);
				$mobileNav.on("click", function(e) {
					e.preventDefault();
					$($parentSelector).addClass('slide-left');
				});

				var $closeButton = $($parentSelector).find(".close-menu");
				$closeButton.each(function(){
					var $self = $(this);
					$self.on("click", function() {
						$self.parent($parentSelector).removeClass('slide-left');
					});
				});

				$(document).on('click', function(e) {
					var $selectorType = $($parentSelector).add($mobileNav);
				    if ($selectorType.is(e.target) !== true && $selectorType.has(e.target).length === 0) {
				        $($parentSelector).removeClass("slide-left");
				    }				   
				});
			}

			mobileNav('.hamburger-menu a', '.expand-block');
		},

		/* ---------------------------------------------
		Individual Select
		 --------------------------------------------- */
		individual_select: function() {
			$('select').bsm_select();
		},
		/* ---------------------------------------------
		Ajax Popup
		--------------------------------------------- */
		ajaxpopup: function() {
			$('.ajax-popup-link').magnificPopup({
			  type: 'ajax'
			});
		},
		/* ---------------------------------------------
		 Banner Background Effect
		--------------------------------------------- */
		banner_backgorund_effect: function() {
			var $carVideo = $('.signle-post-content');
			$carVideo.fitVids();


			$('.timer').countTo();

			var $brandSlider = $(".client-slider");
			$brandSlider.owlCarousel({
				loop: false,
				items: 4,
				margin: 30,
				nav: true,
				navText: ['<i class="fa fa-angle-left"</i>', '<i class="fa fa-angle-right"></i>'],
				responsive:{
					280:{
						items: 1
					},
					480 : {
						items: 2
					},
					768 : {
					   items: 3
					},
					1200 : {
					   items: 4
					},
					1400 : {
						items: 4
					}
				}
			});			

			var $testimonialSlider = $(".testimonial-slider");
			$testimonialSlider.owlCarousel({
				loop: false,
				items: 2,
				margin: 30,
				nav: true,
				navText: ['<i class="fa fa-angle-left"</i>', '<i class="fa fa-angle-right"></i>'],
				responsive:{
					280:{
						items: 1
					},
					480 : {
						items: 1
					},
					768 : {
					   items: 1
					},
					1200 : {
					   items: 1
					},
					1400 : {
						items: 2
					}
				}
			});

			var $testimonialSlider = $(".hobby-slider");
			$testimonialSlider.owlCarousel({
				loop: false,
				items: 2,
				margin: 30,
				nav: true,
				navText: ['<i class="fa fa-angle-left"</i>', '<i class="fa fa-angle-right"></i>'],
				responsive:{
					280:{
						items: 2
					},
					480 : {
						items: 3
					},
					768 : {
					   items: 5
					},
					1200 : {
					   items: 7
					},
					1400 : {
						items: 7
					}
				}
			});
		},

		/* ---------------------------------------------
		 Widget Mobile fix
		--------------------------------------------- */
		widget_mobile: function () {
		    function debouncer(func, timeout) {
		        var timeoutID, timeout = timeout || 500;
		        return function () {
		            var scope = this,
		                args = arguments;
		            clearTimeout(timeoutID);
		            timeoutID = setTimeout(function () {
		                func.apply(scope, Array.prototype.slice.call(args));
		            }, timeout);
		        }
		    }
		    function resized() {
		        var getWidgetTitle = $('.widget .widget-title');
		        var getWidgetTitleContent;
		        if ($(window).width() <= 991) {
		            getWidgetTitleContent = $('.widget .widget-title').nextAll().hide();
		            getWidgetTitle.addClass('expand-margin');
		            getWidgetTitle.on('click', function(e) {
		                e.stopImmediatePropagation();
		                $(this).toggleClass('expand');
		                $(this).nextAll().slideToggle();
		                return false;
		            });
		            getWidgetTitle.each(function(){
		                $(this).addClass('mb-widget');
		            });
		        } else {
		            getWidgetTitleContent = $('.widget .widget-title').nextAll().show();
		            getWidgetTitle.removeClass('expand-margin');
		            getWidgetTitle.each(function(){
		                $(this).parent().removeClass('mb-widget');
		            });
		        };
		    }
		    resized();

		    var prevW = window.innerWidth || $(window).width();
		    $(window).resize(debouncer(function (e) {
		        var currentW = window.innerWidth || $(window).width();
		        if (currentW != prevW) {
		            resized();
		        }
		        prevW = window.innerWidth || $(window).width();
		    }));

		    //Mobile Responsive
		    var $extendBtn = $(".extend-btn .extend-icon");
		    $extendBtn.on("click", function(e) {
		        e.preventDefault();
		        var $self = $(this);
		        $self.parent().prev().toggleClass("mobile-extend");
		        $self.parent().toggleClass("extend-btn");
		        $self.toggleClass("up");
		    });
		},
		/* ---------------------------------------------
		 Scroll top
		--------------------------------------------- */
	    scroll_top: function () {
	    	//Fixed Navbar
	    	var $fixedHeader = $('.sticky-header');
	    	$(window).on('scroll', function() {
	    		if($(this).scrollTop() >= $(this).height()) {
	    			$fixedHeader
	    			.addClass('sticky-show')
	    			.removeClass('sticky-hide');
	    		} else if($(this).scrollTop() >= 50) {
	    			$fixedHeader
	    			.addClass('sticky-hide')
	    			.removeClass('sticky-show');
	    		} else {
	    			$fixedHeader
	    			.removeClass('sticky-hide');
	    		}
	    	});

	    	//Footer Scroll Top
			$("body").append("<a href='#top' id='scroll-top' class='topbutton btn-hide'><span class='fa fa-chevron-up'></span></a>");
			var $scrolltop = $('#scroll-top');
			$(window).on('scroll', function() {
				if($(this).scrollTop() > $(this).height()) {
					$scrolltop
					.addClass('btn-show')
					.removeClass('btn-hide');
				} else {
					$scrolltop
					.addClass('btn-hide')
					.removeClass('btn-show');
				}
			});
			$("a[href='#top']").on('click', function() {
				$("html, body").animate({
					scrollTop: 0
				}, "normal");
				return false;
			});

		},

		hoverAnimation: function() {
			$(' .portfolio-tabs .item ').each( function() { $(this).hoverdir(); } );
		},
 		/* ---------------------------------------------
		 Mobile Tab
		 --------------------------------------------- */
		mobileTab:function() {
			var $nextEL = $('.tabs-nav-area');
			$nextEL.each(function() {
				var $selfTab = $(this);
				var $tabNav = $selfTab.find('.bsm-tabs li a');

				var $selectOption = $('<select class="responsive-nav "/>');

				$tabNav.each(function(e, value) {
					var $select = $("<option value='"+ e +"'>"+ $(this).text() +"</option>");
					$selectOption.append($select);
				});
				$selectOption.appendTo($selfTab);

				var $responsiveNav = $(".responsive-nav");
				
				$responsiveNav.on("change", function (e) {
					var url = $(this).val();
					if($.isNumeric(url) === true) {
						var $navSlector = $tabNav;
				    	var $getId = $navSlector.eq(url).prop('href').split('#')[1];
				    	var $tabId = $('#' + $getId);
			    		$tabId.prevAll().removeClass('active');
			    		$tabId.nextAll().removeClass('active');
			    		$tabId.prevAll().hide();
			    		$tabId.nextAll().hide();
			    		$tabId.addClass('active');
			    		$tabId.show();
					} else {
						window.location = url;
					}
				});
			});

			var $responsiveNav = $(".responsive-nav");
			$responsiveNav.bsm_select();



			// Progress Bar
			var $progressBar = $('.skill-progress');
	        $('.skill-bar').each(function() {
	            $(this).find('.progress-content').animate({
	                width: $(this).attr('data-percentage')
	            }, 2150);
	            $(this).find('.progress-mark').animate({
	                left: $(this).attr('data-percentage')
	            }, {
	                duration: 2150,
	                step: function(now, fx) {
	                    var data = Math.round(now);
	                    $(this).find('.percent').html(data + '%');
	                }
	            });
	        });

		},
		/* ---------------------------------------------
		 function initializ
		 --------------------------------------------- */
		initializ: function() {
			modelApp.onePageMenu();
			modelApp.individual_menu();
			modelApp.individual_select();
			modelApp.ajaxpopup();
			modelApp.banner_backgorund_effect();
			modelApp.widget_mobile();
			modelApp.scroll_top();
			modelApp.hoverAnimation();
			modelApp.mobileTab();
		}
	};
	/* ---------------------------------------------
	 Document ready function
	 --------------------------------------------- */
	$(function() {
		modelApp.initializ();
	});
	
	$(window).on('load', function () {
		modelApp.peloader();
	});

})(jQuery);
