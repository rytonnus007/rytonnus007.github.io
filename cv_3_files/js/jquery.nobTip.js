(function($) {
	$.fn.nobTip = function(options) {
		var defaults = { 
			activation: "hover",
			keepAlive: false,
			maxWidth: "200px",
			edgeOffset: 3,
			defaultPosition: "top",
			delay: 400,
			fadeIn: 200,
			fadeOut: 200,
			attribute: "title",
			big_container:".big_container",
			content: false, // HTML or String to fill TipTIp with
		  	enter: function(){},
		  	exit: function(){}
	  	};
	 	var opts = $.extend(defaults, options);
		
		return this.each(function(){
			var nob_elem = $(this);
			$(this).find('.nb_tiptip_holder').remove();
			var nob_title = nob_elem.attr(opts.attribute);
			if ((nob_title==undefined)||(nob_title==''))
				return '';
			var $out;
			$out = '<div style="max-width: 200px; margin: 409px 0px 0px 185px; display: block;" class="nb_tiptip_holder nb_tip_top">\
						<div class="nb_tiptip_arrow" style="margin-left: 25px; margin-top: 21px;">\
							<div class="nb_tiptip_arrow_inner"></div>\
						</div>\
						<div class="nb_tiptip_content">'+ nob_title +'</div>\
					</div>';
			nob_elem.append($out);
			var tiptip_holder = nob_elem.find(".nb_tiptip_holder");
			var tiptip_content = nob_elem.find(".nb_tiptip_content");
			var tiptip_arrow = nob_elem.find(".nb_tiptip_arrow");
			nob_active_tiptip();
			
			function nob_active_tiptip(){
				opts.enter.call(this);
								
				var top = parseInt(nob_elem.offset()['top']); 
				top = 0;
				var left = parseInt(nob_elem.offset()['left']);
				left = 0;
				var nob_width = parseInt(nob_elem.outerWidth());
				var nob_height = parseInt(nob_elem.outerHeight());
				var tip_w = tiptip_holder.outerWidth();
				var tip_h = tiptip_holder.outerHeight();
				var w_compare = Math.round((nob_width - tip_w));
				var h_compare = Math.round((nob_height - tip_h) / 2);
				var marg_left = Math.round(left + w_compare);
				var marg_top = Math.round(top + nob_height + opts.edgeOffset);
				var t_class = "";
				var arrow_top = "";
				var arrow_left = Math.round(tip_w - 12) / 2;
				
				if(opts.defaultPosition == "bottom"){
					t_class = "_bottom";
				} else if(opts.defaultPosition == "top"){ 
					t_class = "_top";
				} else if(opts.defaultPosition == "left"){
					t_class = "_left";
				} else if(opts.defaultPosition == "right"){
					t_class = "_right";
				}
				
				var right_compare = (w_compare + left) < parseInt($(window).scrollLeft());
				var left_compare = (tip_w + left) > parseInt($(window).width());
				
				if((right_compare && w_compare < 0) || (t_class == "_right" && !left_compare) || (t_class == "_left" && left < (tip_w + opts.edgeOffset + 5))){
					t_class = "_right";
					arrow_top = Math.round(tip_h - 13) / 2;
					arrow_left = -12;
					marg_left = Math.round(left + nob_width + opts.edgeOffset);
					marg_top = Math.round(top + h_compare);
				} else if((left_compare && w_compare < 0) || (t_class == "_left" && !right_compare)){
					t_class = "_left";
					arrow_top = Math.round(tip_h - 13) / 2;
					arrow_left =  Math.round(tip_w);
					marg_left = Math.round(left - (tip_w + opts.edgeOffset + 5));
					marg_top = Math.round(top + h_compare);
					
				}

				var top_compare = (top + nob_height + opts.edgeOffset + tip_h + 8) > parseInt($(window).height() + $(window).scrollTop());
				var bottom_compare = ((top + nob_height) - (opts.edgeOffset + tip_h + 8)) < 0;
				
				//if(top_compare || (t_class == "_bottom" && top_compare) || (t_class == "_top" && !bottom_compare)){
					if(t_class == "_top" || t_class == "_bottom"){
						t_class = "_top";
					} else {
						t_class = t_class+"_top";
					}
					arrow_top = tip_h;
					marg_top = Math.round(top - (tip_h + 5 + opts.edgeOffset));
				//} 
				/*else if(bottom_compare | (t_class == "_top" && bottom_compare) || (t_class == "_bottom" && !top_compare)){
					if(t_class == "_top" || t_class == "_bottom"){
						t_class = "_bottom";
					} else {
						t_class = t_class+"_bottom";
					}
					arrow_top = -12;						
					marg_top = Math.round(top + nob_height + opts.edgeOffset);
				}*/
			
				if(t_class == "_right_top" || t_class == "_left_top"){
					marg_top = marg_top + 5;
				} else if(t_class == "_right_bottom" || t_class == "_left_bottom"){		
					marg_top = marg_top - 5;
				}
				if(t_class == "_left_top" || t_class == "_left_bottom"){	
					marg_left = marg_left + 5;
					
				}
				
				/*
				var $xxx;
				$xxx = $('.big_container').width();
				
				
				if (($xxx==300)||($xxx==470))
					marg_left = Math.round(marg_left);
				else
				*/
				marg_left_temp = marg_left;
				marg_left = Math.round(marg_left + (tiptip_content.outerWidth()/2));
				marg_left_x = Math.round(marg_left + (tiptip_content.outerWidth()));
				
				var $xxx;
				$xxx = $(opts.big_container).width();
				if (($xxx==300)||($xxx==470)) {
					if ($xxx==300) {
						if (marg_left_x>270)
							marg_left = marg_left_temp;
					}
					if ($xxx==470) {
						if (marg_left>450)
							marg_left = marg_left_temp;
					}
				}
					
				//alert(marg_left);
				xyz = tiptip_content.outerWidth()-15;
				tiptip_content.css({"width": xyz +"px"});
				tiptip_arrow.css({"margin-left": arrow_left+"px", "margin-top": arrow_top+"px"});
				tiptip_holder.css({"margin-left": marg_left+"px", "margin-top": marg_top+"px"}).attr("class","nb_tip"+t_class).addClass('nb_tiptip_holder');
				
				tiptip_holder.show();
					
			}
				
				
			
			
		});
	};
}(jQuery));