$(window).load(function() {
	$('body').removeClass('unload');
	$('.preloader').detach();
	timerTikActivate($('.sale-time-timer'));
	checkWindowSize(true);
	activatePopovers();
});


var isTouching = false;
if ('ontouchstart' in window) {
	isTouching = true;
	$('.stand-image-wrap a').on('click', function(e){
		e.stopImmediatePropagation();
	});
}


//no optimize code:
function activatePopovers(){
	$('.stand-up-wrap .stand-box').each(function(i, box){
		setTimeout(function(){
			$(box).removeClass('isHover');
		}, i*150 + 500);
		var timer;
		var isOpen = false;
		var noOpen = false; //hoisting inner function hideNewBox() status
		$(box)
			.on('mouseenter', function(){
				showBox();
			})
			.on('mouseleave', function(){
				hideBox();
			})
			.on('click', function(e){
				if(isTouching) {
					if(noOpen){
						noOpen = false;
					} else{
						showBox();
					}
				}else{
					$('.modal-book form select').val($(box).data('select'));
					$('.modal-book').modal('show');
				}
			});
		$(box).find('.stand-btn').click(function(){
			if(isTouching) {
				$('.modal-book form select').val($(box).data('select'));
				$('.modal-book').modal('show');
			}
		});
		$(window).click(function(){
			noOpen = false;
		})

		function showBox(){
			if(!isOpen){
				timer = setTimeout(function(){
					timer = 0;
					isOpen = true;
					var boxWrap = $(box).parent();
					var offset = boxWrap.offset();
					var windowScroll = $(window).scrollTop();

					var buttons = $('.stand-front .stand-btn');
					buttons.each(function(i, button){
						button = $(button);
						button.clone(true).css({
							position: 'fixed',
							left: button.offset().left,
							top: button.offset().top - windowScroll,
							display: 'block',
							width: button.width()
						}).data('offset', button.offset()).appendTo('.box-area');
					});

					var boxWrapNew = boxWrap.clone(true).css({
						position: 'fixed',
						left: offset.left,
						top: offset.top - windowScroll,
						display: 'block',
						height: boxWrap.height()
					});

					$(window).scroll(function(){
						var windowScroll = $(window).scrollTop();
						var buttons = $('.box-area>.stand-btn');
						buttons.each(function(i, button){
							button = $(button);
							button.css({
								left: button.data('offset').left,
								top: button.data('offset').top - windowScroll,
							});
						});
						boxWrapNew.css({
							left: offset.left,
							top: offset.top - windowScroll,
						});
					});

					$('.hover-area').show(0)
						.find('.dark-black').fadeIn(300)
						.end().find('.box-light')
						.css('left', offset.left + boxWrap.width() / 2).addClass('isVisible')
						.end().find('.box-area').append(boxWrapNew);
						boxWrapNew.find('.stand-box').addClass('isLighten');

					$('.stand-popover', boxWrapNew).fadeIn();
					$(box).addClass('isHover');

					var touchStamp;
					$('.stand-box', boxWrapNew)
						.on('mouseleave', function(){
							hideNewBox();
						})
						.on('touchstart', function(){
							touchStamp = new Date();
						})
						.on('touchend', function(){
							if(new Date() - touchStamp < 100){
								hideNewBox();
								noOpen = true;
							}
						});

					function hideNewBox(){
						$('.hover-area').hide(0)
							.find('.dark-black').finish().hide(0)
							.end().find('.box-light').removeClass('isVisible')
							.end().find('.box-area').empty();
						isOpen = false;
						$('.stand-popover', boxWrapNew).finish().hide(0);
						$(box).removeClass('isHover');
						$(window).unbind('scroll');
					}


				}, 200);
			}
		}

		function hideBox(){
			clearTimeout(timer);
			if(!!timer){
				isOpen = false;
				$('.dark-back').finish().fadeOut(0).find('.box-area').empty();
				$(window).unbind('scroll');
				$('.stand-popover', box).finish().hide(0);
			}
		}

	});
}


$(window).resize(checkWindowSize);

//sorry for this globals variables=)
var owl;
var timer;

function checkWindowSize(e){
	if(!!timer){
		clearTimeout(timer);
	}
	timer = setTimeout(function(){
		if($(window).width() < 660){
			if(!owl){
				owl = $('.stand-up-wrap').owlCarousel({
					items: 5,
					itemsTablet: [660,3],
					pagination: false
				}).data('owlCarousel');
				$('.owl-controls').show();
				$('.owl-controls .owl-prev').click(owl.prev.bind(owl));
				$('.owl-controls .owl-next').click(owl.next.bind(owl));
				$('.hover-area').addClass('inCarousel')
			}
		}else if(!!owl){
			$('.owl-controls .owl-prev').unbind('click');
			$('.owl-controls .owl-next').unbind('click');
			$('.hover-area').removeClass('inCarousel');
			owl.destroy();
			owl = undefined;
			$('.owl-controls').hide();
		}
	}, e===true ? 0 : 300);
}


function timerTikActivate($timer){

	var timeArr = $('.time-stamp').text().split(', ');
	$('.time-stamp').remove();
	var timeObj = TimeObj(new Date(timeArr[0], timeArr[1] - 1, timeArr[2]));

	var $days = $timer.find('.sale-time-days');
	var $hours = $timer.find('.sale-time-hours');
	var $minutes = $timer.find('.sale-time-minutes');

	tik();

	function tik(){
		timeObj.update();


		$days.find('.sale-time-num').text(timeObj.getDay().val);
		$days.find('.sale-time-caption').text(timeObj.getDay().caption);

		$hours.find('.sale-time-num').text(timeObj.getHours().val);
		$hours.find('.sale-time-caption').text(timeObj.getHours().caption);

		$minutes.find('.sale-time-num').text(timeObj.getMinutes().val);
		$minutes.find('.sale-time-caption').text(timeObj.getMinutes().caption);

		$timer.find('.limiter').css({opacity: '0'});

		setTimeout(function(){
			$timer.find('.limiter').css({opacity: ''});
		}, 500);

		setTimeout(tik, 1000);

	}
}
function TimeObj(timeStamp){

	var that = {};
	var leftTime;
	var timeLost = false;

	that.update = function(){
		leftTime = new Date(timeStamp - new Date());
		if(timeStamp < new Date()){
			timeLost = true;
		}
	}

	that.update();

	that.getDay = function(){
		var leftDay = timeLost ? 0 : leftTime.getDate() - 1;

		return {
			val: leftDay,
			caption: getNumeralFromArr(['день', 'дня', 'дней'], leftDay)
		};
	}
	that.getHours = function(){
		var leftHours = timeLost ? 0 : leftTime.getHours();
		var strVal = (leftHours.toString().length < 2) ? '0' + leftHours : leftHours;
		return {
			val: strVal,
			caption: getNumeralFromArr(['час', 'часа', 'часов'], leftHours)
		};
	}
	that.getMinutes = function(){
		var leftMinutes = timeLost ? 0 : leftTime.getMinutes();
		var strVal = (leftMinutes.toString().length < 2) ? '0' + leftMinutes : leftMinutes;
		return {
			val: strVal,
			caption: getNumeralFromArr(['минута', 'минуты', 'минут'], leftMinutes)
		};
	}

	return that;

}

function getNumeralFromArr(arr, digit){
	if(arr.length<3){
		return false;
	}
	strDigit = digit.toString();
	if(strDigit.length>1 && 
			strDigit.slice(strDigit.length-2, strDigit.length-1) === "1"){
		return arr[2];
	}
	var temp = strDigit.slice(strDigit.length-1, strDigit.length);
	if(strDigit.length>0 && temp === "1"){
		return arr[0];
	}
	temp = parseInt(temp);
	if(strDigit.length>0 && temp > 1 && temp < 5){
		return arr[1];
	}
	return arr[2];
}