$(document).ready(function(){
	$(document).on('form change', 'input', function(){
    placeholdersRefresh($(this));
	});
  function placeholdersRefresh(elem){
    if(elem.val().length > 0){
      elem.addClass('filled');
    }else{
      elem.removeClass('filled');
    }
  }

	$('.scrollTo').click(function(e){
		e.preventDefault();
		var target = $(this).data('scroll');
		if($(target).length>0){
			$('html, body').animate({scrollTop:$(target).offset().top}, 'slow');
			return false;
		}
	});
	$('.hint').click(function(event) {
		$(this).toggleClass('cliked');
	});
	$(window).on('scroll', function(){
		var block = $('#block4');
		var halfHeight = block.height() / 2;
		var centerBlock = halfHeight + block.offset().top;
		var centerWindow = $(window).height() / 2 + $(window).scrollTop();
		if(centerWindow < centerBlock - halfHeight){
			block.css('background-position', '50% 30%');
			console.log('min');
		}else if(centerWindow > centerBlock + halfHeight){
			block.css('background-position', '50% 70%');
		}else{
			var pos = 20*(centerWindow - centerBlock)/(halfHeight);
			block.css('background-position', '50% '+(pos+50)+'%');
		} 
	})

});