
var snapScroll;

$(document).ready(function() {


	enableScrollButtons();

	$(window).resize(function() {
		!!snapScroll && !!snapScroll.getActive() 
			&& ($(window).height() < 640 || $(window).width() < 991) 
			&& snapScroll.stop();

		!!snapScroll && !snapScroll.getActive() 
			&& ($(window).height() >= 640 && $(window).width() >= 991) 
			&& snapScroll.continue();

		!!snapScroll && !!snapScroll.getActive() && snapScroll.resize();


	});
});

window.addEventListener('load', function(){
	$('.preloader').animate({
		opacity: 0},
		200, function() {
		this.remove();
	});

	setTimeout(function(){
		
		firstWindowAnimation();

		snapScroll = activateSnapScroll();
		if($(window).height() < 640 || $(window).width() < 991){
			snapScroll.stop();
		}
		prepareElementsToShow($('.what-learning-list, .form-and-timer'), {
			'transform': 'translate(0, 50%)',
			'opacity': '0'
		}, {
			'transform': '',
			'opacity': ''
		}, 600);
	}, 300);

	timerTikActivate($('.form-block .timer'));

})





function timerTikActivate($timer){
	var timeObj = TimeObj(new Date(2016, 3, 16));

	var $days = $timer.find('.days');
	var $hours = $timer.find('.hours');
	var $minutes = $timer.find('.minutes');
	var $seconds = $timer.find('.seconds');

	tik();

	function tik(){
		timeObj.update();


		$days.find('.num').text(timeObj.getDay().val);
		$days.find('.caption').text(timeObj.getDay().caption);

		$hours.find('.num').text(timeObj.getHours().val);
		$hours.find('.caption').text(timeObj.getHours().caption);

		$minutes.find('.num').text(timeObj.getMinutes().val);
		$minutes.find('.caption').text(timeObj.getMinutes().caption);

		$seconds.find('.num').text(timeObj.getSeconds().val);
		$seconds.find('.caption').text(timeObj.getSeconds().caption);

		setTimeout(tik, 1000);

	}
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

document.addEventListener('DOMContentLoaded', svgInliner);


function svgInliner(){
	$('[data-svg]').each(function(i, el){
		$.get(el.src, function(data) {
			$(el).after($(data).find('svg')).next().addClass(el.className);
			el.remove();
		});
	});
}

function firstWindowAnimation(){
	var timer = 0;

	$('.bg-view-port .blur-bg').addClass('blured');

	timer+=400;

	setTimeout(function(){
		$('.bg-view-port .blur-bg').addClass('focused');
		$('.first-window .tiket').addClass('showen');
	}, timer);

	timer+=800;

	setTimeout(function(){
		$('.first-window .deadline').addClass('showen');
	}, timer);
}



function activateSnapScroll(){
	var active = true;

	var $navigate = $('.nav-panel a').each(function(index, el) {
		$(this).data('position', index);
	});;
	var snaps = $('[data-snap-scroll]').map(function(index, elem) {
		return {
			position: index,
			element: elem,
			top: $(elem).offset().top
		};
	});

	snaps = [].slice.call(snaps);

	var lastEl = snaps[snaps.length - 1];

	var maxTop = lastEl.top + $(lastEl.element).height() - $(window).height();

	var activeSnap = 0;

	var timer = null;

	var animStatus = {
		stop: false,
		animating: false,
		snapScrolling: false
	}

	goToSnap(snaps[activeSnap]);

	window.addEventListener('scroll', scrolling);

	var oldTop = 0;

	$navigate.click(function(e){
		e.preventDefault();
		activeSnap = parseInt($(this).data('position'));
		goToSnap(snaps[activeSnap]);
	});

	function scrolling(e){
		if(!!timer){
			clearTimeout(timer);
			timer = null;
		}
		var scrollTop = $(window).scrollTop();

		if(animStatus.animating && !animStatus.snapScrolling){
			animStatus.stop = true;
		}

		if((!animStatus.animating && !animStatus.snapScrolling) && scrollTop < maxTop){
			var dir = scrollTop - oldTop > 0;
			oldTop = scrollTop;
			timer = setTimeout(function(){
				timer = null;
				var activeSnap = getNearSnap(
					scrollTop, 
					snaps,
					dir);
				goToSnap(activeSnap);
			},20);
		}
		animStatus.snapScrolling = false;
	}

	function goToSnap(snap){
		animStatus.animating = true;
		$('html, body').animate({scrollTop:snap.top}, {
			duration: 300,
			easing: 'easeOutExpo',
			progress: function(animation){
				animStatus.snapScrolling = true;
				if(animStatus.stop){
					animation.stop();
					animStatus.animating = false;
					animStatus.stop = false;
				}
			},
			done: function(){
				animStatus.animating = false;
				$navigate.removeClass('active').eq(snap.position).addClass('active');
			}
		});
	}

	function getNearSnap(winT, snaps, dir){
		var el = snaps[0];
		var dist = Math.abs(winT - el.top);
		snaps.forEach(function(elem, i){
			if(Math.abs(winT - elem.top) < dist){
				el = elem;
				dist = Math.abs(winT - elem.top);
			}
		});
		if(dir === undefined){
			activeSnap = el.position;
			return el;
		}
		if(activeSnap == el.position && dir && snaps[activeSnap + 1]){
			el = snaps[activeSnap + 1];
		}else if(activeSnap == el.position && !dir && snaps[activeSnap - 1]){
			el = snaps[activeSnap - 1];
		}
		activeSnap = el.position;
		return el;
	}
	return {
		resize: function(){
			snaps.forEach(function(el, index){
				el.top = $(el.element).offset().top;
			});	
			maxTop = lastEl.top + $(lastEl.element).height() - $(window).height();
		},
		stop: function(){
			if(!active){
				return false;
			}
			window.removeEventListener('scroll', scrolling);
			active = false;
			$('.nav-panel').hide();
		},
		continue: function(){
			if(active){
				return false;
			}
			window.addEventListener('scroll', scrolling);
			active = true;
			$('.nav-panel').show();
		},
		getActive: function(){
			return active;
		},
		goTo: function(num){
			num = parseInt(num);
			if(!!snaps[num]){
				goToSnap(snaps[num]);
			}
		}
	}
}

function prepareElementsToShow($els, from, to, dur){
	dur = parseInt(dur);
	if(dur <= 0){
		dur = 0;
	}
	whenInWindow($els, function(){
		$(this).css(to);
		setTimeout($els.css.bind(this,'transition',''), dur+100);
	}, {top: -350, bottom: 0});
	$els.css(from).css('transition','all '+ dur +'ms ease-in');
}

function whenInWindow($els, cb, diff){
	if(diff === undefined){
		diff = {
			top: 0,
			bottom: 0
		};
	}
	diff = diff || 0;
	$(window).scroll(function(){
		var scrollTop = $(window).scrollTop();
		var windowHeight = $(window).height();
		$els.each(function(index, el, arr) {
			el = $(el);
			var offset = el.offset();
			if(scrollTop + windowHeight >= offset.top + diff.top && 
				el.height() + offset.top + diff.bottom >= scrollTop){
	    	  	cb.call(el);
		    	$els = $els.not(el);
		}});
	});
}

function TimeObj(timeStamp){

	var that = {};
	var leftTime;

	that.update = function(){
		leftTime = new Date(timeStamp - new Date());
	}

	that.update();

	that.getDay = function(){
		var leftDay = leftTime.getDate();
		return {
			val: leftDay,
			caption: getNumeralFromArr(['день', 'дня', 'дней'], leftDay)
		};
	}
	that.getHours = function(){
		var leftHours = leftTime.getHours();
		var strVal = (leftHours.toString().length < 2) ? '0' + leftHours : leftHours;
		return {
			val: strVal,
			caption: getNumeralFromArr(['час', 'часа', 'часов'], leftHours)
		};
	}
	that.getMinutes = function(){
		var leftMinutes = leftTime.getMinutes();
		var strVal = (leftMinutes.toString().length < 2) ? '0' + leftMinutes : leftMinutes;
		return {
			val: strVal,
			caption: getNumeralFromArr(['минута', 'минуты', 'минут'], leftMinutes)
		};
	}
	that.getSeconds = function(){
		var leftSeconds = leftTime.getSeconds();
		var strVal = (leftSeconds.toString().length < 2) ? '0' + leftSeconds : leftSeconds;
		return {
			val: strVal,
			caption: getNumeralFromArr(['секунда', 'секунды', 'секунд'], leftSeconds)
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

function enableScrollButtons(){
	$('[data-scroll]').click(function(e){
		e.preventDefault();
		snapScroll.goTo(3);
	});
}