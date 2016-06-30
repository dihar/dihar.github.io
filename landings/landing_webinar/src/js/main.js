var DEV = true;

$(document).ready(function() {

	var showSize = DEV ? ShowSize($(window).width(), $(window).height()) : false;

	activateVideo($('.main-video'), $('.play-button'));

	enableScrollButtons();

	$('.toggle-programms').click(function(e){

		$(this).text(
			$('.programm .hidden-content').slideToggle(400).toggleClass('show').hasClass('show') ? 
			'Скрыть всю программу' : 
			'Показать все программу'
			);
	});

	$('.tab-form .tabs a').click(function (e) {
		e.preventDefault();
		$(this).tab('show');
		$('.tab-form .tabs a').parent().removeClass('active');
		$(this).parent().addClass('active');
	})

	var socCounter = 0;
	whenInWindow($('.soc-icons-block a'), function(){
		setTimeout(function(){
			this.addClass('show-icon');
		}.bind(this), 150 * socCounter++)
	}, 300);

	$(window).resize(function() {
		
		DEV && showSize($(window).width(), $(window).height());

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
			zIndex: '99999'
		});
	return function(winW, winH){
		scrollBarWidth = winH < $(document).find('body').height() ? 17 : 0;

		$('body').find(".size-window").text(winW+ scrollBarWidth +' x '+winH);
	}
}

function activateVideo($video, $button){
	var status = false;

	$video[0].addEventListener('pause', function(e){
		status = false;
		$('.first-window').removeClass('playing');
	})
	$button.click(function(event) {
		if(status){
			$video[0].pause();
			$('.first-window').removeClass('playing');
			status = false;
		}else{
			$video[0].play();
			$('.first-window').addClass('playing');
			status = true;
		}
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

function whenInWindow($els, cb, diff){
	var diff = diff || 0;
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var windowHeight = $(window).height();
		$els.each(function(index, el) {
			el = $(el);
			var offset = el.offset();
			if(scrollTop <= offset.top && 
				(el.height() + offset.top + diff) < (scrollTop + windowHeight)){
	    	  	cb.call(el);
		}});
	});
}
