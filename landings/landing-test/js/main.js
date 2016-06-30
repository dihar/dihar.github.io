var DEV = false;

var bxSliderOptions = {
	controls: false,
	adaptiveHeight: true
}

var spesialSliderOptions = {
	controls: false,
	adaptiveHeight: true,
	maxSlides: 2,
	minSlides:1,
	slideWidth: 240
}

var $slider, $specialSlider, $togglenator;

$(document).ready(function() {

	var showSize = DEV ? ShowSize($(window).width(), $(window).height()) : false;
	togglenator = ToggleTag($('.special-table-cell.title'));

	$slider = $('.gray-list-carousel .gray-list');

	$specialSlider = $('.special-table').bxSlider(spesialSliderOptions);
	$specialSlider.statusSlider = true;

	whenInWindow($('.why-we .blue-big-icon'), function(){
		$(this).addClass('show-icon');
	}, 100);

	main(true);

	addParalax($('.first-window .left-column, .first-window .right-column'));

	$(window).resize(function() {
		
		DEV && showSize($(window).width(), $(window).height());

		main();
	});
});

function main(firstRun){
	if($slider) {
		checkCarousel($slider, $(window).width(), firstRun);
	}
	if($specialSlider) {
		checkSpecialSlider($specialSlider, $(window).width(), firstRun);
	}

}

function ShowSize(winW, winH){

	var scrollBarWidth = winH < $(document).find('body').height() ? 17 : 0; 

	$('body')
		.find(".size-window")
		.remove()
		.end()
		.append('<div class="size-window">'+(winW + scrollBarWidth) +' x '+winH+'</div>')
		.find(".size-window")
		.css({
			position: 'fixed',
			right: '10px',
			top: '10px',
			color: '#fff',
			background: 'rgba(0,0,0,0.5)',
			padding: '5px'
		});
	return function(winW, winH){
		scrollBarWidth = winH < $(document).find('body').height() ? 17 : 0;

		$('body').find(".size-window").text(winW+ scrollBarWidth +' x '+winH);
	}
}


function checkCarousel($slider, winW, firstRun){
	
	if(!$slider.loadSlider && winW < 767){
		$slider.bxSlider(bxSliderOptions);
		$slider.loadSlider = true;
	}
	if(winW > 767 && $slider.loadSlider){
		$slider.destroySlider();
		$slider.statusSlider = false;
	}else if(winW <= 767 && !$slider.statusSlider){
		$slider.reloadSlider(bxSliderOptions);
		$slider.statusSlider = true;
	}else if(winW <= 767 && $slider.statusSlider){
		$slider.redrawSlider();
	}
}

function checkSpecialSlider($slider, winW, firstRun){
	if(winW > 700 && $slider.statusSlider){
		$slider.destroySlider();
		togglenator(true);
		$slider.removeClass('toSlider');
		$slider.statusSlider = false;
	}else if(winW <= 700 && !$slider.statusSlider){
		togglenator(false);
		$slider.reloadSlider(spesialSliderOptions);
		$slider.statusSlider = true;
		$slider.addClass('toSlider');
	}else if(winW <= 700 && $slider.statusSlider){
		if(firstRun){
			$slider.destroySlider();
			togglenator(false);
			$slider.reloadSlider(spesialSliderOptions);
		}
		$slider.redrawSlider();
		$slider.addClass('toSlider');
	}
}

function ToggleTag($selector){
	var $parent = $selector.parent();
	var elStatus = true;
	return function(strict){
		if(strict === false && elStatus){
			$selector.remove();
			elStatus = false;
		}else if(strict === true && !elStatus){
			$parent.prepend($selector);
			elStatus = true;
		}else if(strict !== true && strict !== false){
			if(elStatus){
				$selector = $selector.remove();
				elStatus = false;
			}else {
				$parent.prepend($selector);
				elStatus = true;
			}
		}
	}
}

function addParalax($els){
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var windowHeight = $(window).height();
		var perc = -(scrollTop / windowHeight) * 25;
		$els.each(function(i, el){
			$(el).css('transform', 'translate(0, ' + perc + '%)');
		});
	});
}

function whenInWindow($els, cb, diff, always){
	diff = diff || 0;
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var windowHeight = $(window).height();
		$els.each(function(index, el, arr) {
			el = $(el);
			var offset = el.offset();
			if(scrollTop <= offset.top && 
				(el.height() + offset.top + diff) < (scrollTop + windowHeight)){
	    	  	cb.call(el,scrollTop, windowHeight, offset.top);
		    	always ? false : $els = $els.not(el);
		}});
	});
}