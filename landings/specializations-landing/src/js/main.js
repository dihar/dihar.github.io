var DEV = false;

$(document).ready(function() {

	var winH = $(window).height();
	var winW = $(window).width();

	var showSize = DEV ? ShowSize(winW, winH) : false;

	doMaxHeight(winH, winW < 768);

	$('.side .close').eq(0).click(function(){
		$('.side').toggleClass('open');
	});

	$('.side').next('.back-layout').click(function(){
		$('.side').removeClass('open');
	})

	checkMobile(winW);

	enableScrollButtons();

	feedbackHandle($('.feedback .feedback-content'), $('.feedback .feedback-list .feedback-person'), '.full-feedback');

	var pralaxListForm = [
		{
			$list: $('.form-block .form-main'),
			max: 20
		},
		{
			$list: $('.form-block .request'),
			min: 36,
			max: 15
	}];

	var pralaxListResult = [
		{
			$list: $('.pralax-lists .left-list'),
			min: 0,
			max: 20
		},
		{
			$list: $('.pralax-lists .right-list'),
			min: 45,
			max: 0
	}];

	var pralaxResults = pralaxLists(pralaxListResult, 200);
	var pralaxForm = pralaxLists(pralaxListForm, 200);
	var winC = $(window).scrollTop() + winH/2;
		pralaxResults(winC, winW > 767);
		pralaxForm(winC, winW > 767);


	// doDisableOptionInSelect($('.form-main select option:first'));

	$(window).resize(function() {
		
		winH = $(window).height();
		winW = $(window).width();

		DEV && showSize(winW, winH);

		doMaxHeight(winH, winW < 768);

		checkMobile(winW);

		pralaxResults = pralaxLists(pralaxListResult, 200);
		pralaxForm = pralaxLists(pralaxListForm, 200);

		var winC = $(window).scrollTop() + winH/2;
		pralaxResults(winC, winW > 767);
		pralaxForm(winC, winW > 767);

	});

	$(window).scroll(function(){
		var winC = $(window).scrollTop() + winH/2;
		pralaxResults(winC);
		pralaxForm(winC);
	});

});

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
			padding: '5px',
			fontSize: '16px'
		});
	return function(winW, winH){
		scrollBarWidth = winH < $(document).find('body').height() ? 17 : 0;

		$('body').find(".size-window").text(winW+ scrollBarWidth +' x '+winH);
	}
}

function doMaxHeight(winH, isMobile){
	var el = $('.max-height');
	if(isMobile){
		el.removeAttr('style');
		return function(){};
	}
	var diff = parseInt(el.css('padding-top')) + parseInt(el.css('padding-bottom'));
	el.height(winH - diff);
	return function(winH){
		el.height(winH - diff);
	}
}

function checkMobile(winW){
	if(winW<992){
		$('body').addClass('mobile');
	}else{
		$('body').removeClass('mobile');
	}
}

function pralaxLists(lists, distance){
	// lists = [
	// 	{
	// 		$list,
	// 		min,
	// 		max
	// 	},...
	// ]
	if(!lists){
		return false;
	}
	var centerLists = isNU(lists[0]) && 
				isNU(lists[0].$list) && 
				lists[0].$list.offset().top + lists[0].$list.height()/ 2;


	var distance = distance || 100;

	function isNU(a){
		return a !== undefined;
	}

	var position = new Array(lists.length);

	var enable = true;

	return function(winC, enableBool){
		if(enableBool === false){
			enable = false;
		}
		if(enableBool === true){
			enable = true;
		}
		if(!enable && !isNU(enableBool)){
			return false;
		}

		lists.forEach(function(list, i){
			if(!isNU(list.min)){
				list.min = 0;
			}
			if(!(isNU(list.$list) && isNU(list.max))) {
				return false;
			}
			if(enableBool === false){
				list.$list.removeAttr('style');
				return false;
			}
			if(centerLists - winC > distance){
				if(position[i] !== 'top') {
					position[i] = 'top';
					list.$list.css('top', list.min);
				}
			}else if(winC - centerLists > distance){
				if(position[i] !== 'bottom') {
					position[i] = 'bottom';
					list.$list.css('top', list.max);
				}
			}else{
				position[i] = '';
				var perc = (winC - centerLists + distance)/(distance*2);
				list.$list.css('top', 
					(list.max - list.min)*perc + list.min);
			}
		});
	}
}

function feedbackHandle($contentTarget, $contentSources, sorceClass){
	var active = $contentSources.eq(0);
	var enable = true;
	$contentSources.click(function(e){
		if(enable){
			var $that = $(this);
			enable = false;
			$contentTarget.animate({
				opacity: 0
			},200, function() {
				$contentSources.removeClass('active');
				$contentTarget.text($that.addClass('active').find(sorceClass).text());
				$contentTarget.animate({
					opacity: 1
				},200, function(){
					enable = true;
				});
			});
		}
	});
}

function doDisableOptionInSelect($option){
	$option.attr({
		hidden: 'hidden',
		disabled: 'disabled',
		selected: 'selected'
	});
}


function enableScrollButtons(){
	$('[data-scroll]').click(function(e){
		e.preventDefault();
		var target = $(this).data('scroll');
		if($(target).length>0){
			$('html, body').animate({scrollTop:$(target).offset().top}, 'slow');
			return false;
		}
	});
}