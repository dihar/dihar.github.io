
$(window).load(function() {

	enableScrollButtons();


	$('.preloader__logo').fadeOut('100', function(){
		$(this).remove();
	});




	$('.menu__close').eq(0).click(function(){
		$('.menu').toggleClass('menu__status_open');
	});

	$('.menu__bg-darker').click(function(){
		$('.menu').removeClass('menu__status_open');
	});

	$('.menu__item-link').click(function(){
		$('.menu').removeClass('menu__status_open');
	});



	$('.programm-modal .slider').owlCarousel({
		singleItem: true,
		pagination: false
	});

	var carousel = $('.programm-modal .slider').data('owlCarousel');

	$('.programm-modal__ctr-button').click(function(){
		if($(this).hasClass('programm-modal__ctr-button_right')){
			carousel.next();
		} else{
			carousel.prev();
		}
	});

	$('.programm-modal__close').click(closePrModal);
	$('.pr-modal-backdrop').click(closePrModal);

	function closePrModal(e){
		$('.programm-modal').removeClass('open');
		!!e && e.preventDefault();
		setTimeout(function(){
			$('body').removeClass('modal-open').css('paddingRight', '');
			$('.pr-modal-backdrop').hide();
			$('.programm-modal').hide();
		}, 200);
	}

	function openPrModal(num){
		carousel.jumpTo(parseInt(num)-1);
		$('body').addClass('modal-open').css('paddingRight', 17);
		$('.pr-modal-backdrop').show();
		$('.programm-modal').show();
		setTimeout(function(){
			$('.programm-modal').addClass('open');
		}, 0);
	}

	$('[data-role="programm-modal"]').click(function(e){
		openPrModal($(this).data('target'));
	});


    $('#video').on('hide.bs.modal', function (e) {
    	pauseVideo();
	});

	$(window).resize(function() {
		
	});
});

var player;

function onYouTubeIframeAPIReady(){
    player = new YT.Player('ytplayer');
}

function pauseVideo(){
	player.pauseVideo();
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