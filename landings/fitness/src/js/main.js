
$(document).ready(function() {

	$('.trainers__tab-link').click(function(e){
		e.preventDefault();
		$('.trainers__content').removeClass('trainers__content_open');
		$('.trainers__tab-link').removeClass('trainers__tab-link_active');
		$($(this).attr('href')).addClass('trainers__content_open');
		$(this).addClass('trainers__tab-link_active');
	});

	$('.feedback__carousel').owlCarousel({
		singleItem: true,
		navigationText: [
			'<div class="feedback__control"><i class="icon-arr-left"></i></div>', 
			'<div class="feedback__control feedback__control_right"><i class="icon-arr-right"></i></div>'],
		pagination: false,
		navigation: true
	});

	$('button[type="submit"]').on('click', function(){
		$(this).parent('form').addClass('didSubmit')
	});

	$('.feedback__item button').click(function(e){
		$('.m-feedback__item').hide();
		$($(this).data('story')).show();
	});
	enableScrollButtons();
});


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