// set twitter text
function twitter_text(text) {
	text = text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function (m) {
		return '<a href="' + m + '" target="_blank">' + m + '</a>';
	});
	// Usernames
	text = text.replace(/@[A-Za-z0-9_]+/g, function (u) {
		return '<a href="http://twitter.com/#!/' + u.replace(/^@/, '') + '" target="_blank">' + u + '</a>';
	});
	// Hashtags
	text = text.replace(/#[A-Za-z0-9_\-]+/g, function (u) {
		return '<a class="hashtags" href="http://twitter.com/#!/search?q=' + u.replace(/^#/, '%23') + '" target="_blank">' + u + '</a>';
	});
	
	return text;
}

jQuery(document).ready(function(){	
	$('.box_info').css({'visibility':'visible'});
	//SINGLE POST action
	$('.post_title a').click(function(){
		href = $(this).attr('href');
		if (href!=='') {
			$('html').animate({scrollTop:0}, 'slow');
			$('body').append('<div id="BIGLOADER"></div>');
			theUrl =  href;
			$.ajax({
				type: "GET",
				url: theUrl,
				timeout: 1000,
				success: function(){
					window.location.href = theUrl + "#id_blog";
				},
				error: function(x, t, m) {
					$('#BIGLOADER').remove();
				}
			});
		}
		return false;
	});
	
	
	
	/* TIPTIP */
	//$(".bar").tipTip({defaultPosition:'top'});
	
	/* RESUME QUESTION ANSWER */
	$('.ul_questions>li .answer_container').click(function(){
		$(this).find('.plus_minus').toggleClass('plus_minus_active');
		$(this).parent().find('.answer_desc').toggle();
		return false;
	});
	
	/* TIMELINE LIST OF MY CLIENT*/
	$('#timeline').timelinr({
		arrowKeys: 'true',
		startAt:3,
		prevButton: '#client_prev',
		nextButton: '#client_next',
		autoPlay: 'true'
	});
	
	
	//nobTip
	$('.bar_container .bar').nobTip();
	
	//slider for photo on home
	$('#photo_slider').cycle({
		fx:'fade',
		pager:  '#photo_slider_nav',	
		
		containerResize: 1,
		pagerAnchorBuilder: function(idx, el) {
			return '<a href="#" title="Photo '+ (idx+1) +'"></a>';
		},
		slideResize: 0,
		width: '100%',
		fit: 1,
		timeout:3000
		
	});
	
	//SUBMIT FORM
	jQuery.validator.addMethod(
		"math", 
		function(value, element, params) { 
			if (value==='')
				return false;
			return this.optional(element) || value == params[0] + params[1]; 
		},
		jQuery.format("Please enter the correct value for {0} + {1}")
	);
	$('#form_contact').validate({
		rules: {
			input_name: {
				minlength: 3,
				required: true
			},
			input_email: {
				required: true,
				email: true
			},
			input_subject: {
				minlength: 3,
				required: true
			},
			input_message: {
				minlength: 10,
				required: true
			},
			input_captcha: {
				math: [3, 4]
			}
		},
		submitHandler: function(form) {
			var a=$('#form_contact').serialize();
			$.ajax({
				type: "POST",
				url: "contact_process.php",
				data:a,
				complete:function(){
				},
				beforeSend: function() {
				
				},
				success: function(data){
					alert(data);
					$('#form_contact').find("input[type=text], textarea").val("");
				},
				error : function() {
				
				}
			});
			return false;
		}
	});
	
	/* PORTFOLIO MASONRY */
	var $first_masonry = true;
	var $container = $('#portfolio_container');
    $container.imagesLoaded( function(){
      $container.masonry({
        itemSelector : '.box'
      });
    });
	
	//COLORBOX
	$(".pp_image").colorbox({rel:'pp_image',maxWidth:'100%',maxHeight:'100%'});
	$(".pp_video").colorbox({rel:'pp_video',maxWidth:'100%',maxHeight:'100%',iframe:true,innerWidth:425,innerHeight:344});
	
	
	/* Main Menu */
	$('#logo').click( function() {
		$('#main_menu').easytabs('select','#id_home');
		return false;
	});

	$('#main_menu').easytabs({
		panelContext: $('#main_content'),
		transitionIn: 'slideDown',
		transitionOut: 'slideUp',
		animate:true,
		animationSpeed:1000
	}).bind('easytabs:after', function(e,$clicked,$targetPanel,settings) {
		
		if (( $targetPanel.get(0).id === 'id_portfolio' )) {
			$container.imagesLoaded( function(){
				$container.masonry( 'reload' );
				$first_masonry = false;
			});
		} else
		if (( $targetPanel.get(0).id === 'id_resume' )) {
			$('.bar_container .bar').nobTip();
		}
		
		$width = $('.big_container').width();
		if ($width<=470) {
			var scrollDuration = 1000;
				$('html').animate({
					'scrollTop':   $targetPanel.offset().top
				}, scrollDuration);
		}
		 
	}); 
	$('html').animate({scrollTop:0}, 'slow');
	
	//responsive suit
	var $width_responsive;
	var $width_responsive_temp;
	$width_responsive = $('.big_container').width();
	$width_responsive_temp = $width_responsive;
	$(window).resize(function() {
		$width_responsive_temp = $('.big_container').width();
		if ($width_responsive_temp!=$width_responsive) {
			$width_responsive = $width_responsive_temp;
			
			//resize bar
			$('.bar_container .bar').nobTip();
			
			// client timeline
			$('#timeline').timelinr({
				arrowKeys: 'true',
				startAt:3,
				prevButton: '#client_prev',
				nextButton: '#client_next',
				autoPlay: 'true'
			});
			
			// portfolio
			$container.imagesLoaded( function(){
				$container.masonry( 'reload' );
				$first_masonry = false;
			});
			
			
			//scrollpane
			$.modal.close();
		}
	});
	
});