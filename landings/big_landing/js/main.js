$(document).ready(function(){
	$('[data-scroll]').click(function(e){
		e.preventDefault();
		var target = $(this).data('scroll');
		if($(target).length>0){
			$('html, body').animate({scrollTop:$(target).offset().top}, 'slow');
			return false;
		}
	});

	var pralaxObj = pralaxShadow();

	var whatInCourseBlock = $('#whatInCourse');
	var scrollingCard = $('.scrolling-card', whatInCourseBlock);
	var scrollingCardRight = ($(window).width() - $('.row', whatInCourseBlock).width())/2 + 40;

	var timelineScroll = TimelineScroll($('#timeline'));

	var smallWindow = $(window).width() < 767;

	$(window).on('scroll', function(){
		pralaxObj.scroll();

		var windowTop = $(window).scrollTop();
		var centerWindow = $(window).height() / 2 + windowTop;
		var processesBlock = $('#processOfEducation');

		timelineScroll(windowTop);

		if(processesBlock.offset().top-processesBlock.height()/2 < centerWindow){
			$('.circle-check-icon', processesBlock).each(function(i, el){
				setTimeout(function(){
					$(el).removeClass('icon-fade');
				},300+(i*300));
			});		
		}
		var blueIconList = $('.flex-icon-list');
		if(blueIconList.offset().top-blueIconList.height()/2 < centerWindow){
			$('.blue-icon', blueIconList).each(function(i, el){
				setTimeout(function(){
					$(el).removeClass('icon-fade');
				},300+(i*300));
			});		
		}

		if(!smallWindow){
			scrollCard(windowTop, 
				whatInCourseBlock.offset().top + $('h2', whatInCourseBlock).height()*2,
				 whatInCourseBlock.offset().top + whatInCourseBlock.height() - scrollingCard.height() - $('h2', whatInCourseBlock).height()+30, 
				 scrollingCard,{
				 	right: scrollingCardRight,
				 	diff: $('h2', whatInCourseBlock).height()
				});
		}
	});

	$(window).on('resize',function(){
		var windowTop = $(window).scrollTop();

		smallWindow = $(window).width() < 767;

		timelineScroll = TimelineScroll($('#timeline'));
		timelineScroll(windowTop);

		scrollingCardRight = ($(window).width() - $('.row', whatInCourseBlock).width())/2 + 40;
		
		if(!smallWindow){
			scrollCard(windowTop, 
				whatInCourseBlock.offset().top + $('h2', whatInCourseBlock).height()*2,
				 whatInCourseBlock.offset().top + whatInCourseBlock.height() - scrollingCard.height() - $('h2', whatInCourseBlock).height()+30, 
				 scrollingCard,{
				 	right: scrollingCardRight,
				 	diff: $('h2', whatInCourseBlock).height()
				});
		}else{
			scrollingCard.css({
				position: '',
				right: '',
				bottom: '',
				top: ''
			});
		}
	});


	//таймер времени

	var dateDeadline = parseDate($('#date-deadline').val() || '1 августа 2017');
	var timeObj = new TimeObj(
		new Date(dateDeadline.year || (new Date).getFullYear(),
		dateDeadline.month || 0, 
		(dateDeadline.day || 1) + 1, -3));
	var timeSels = $('.deadline');
	updateDate();
	function updateDate(){
		timeObj.update();
		timeSels.each(function(index, el) {
			$(el).toggleClass('darken');
			$('.digit.days .num', el).text(timeObj.getDay().val);
			$('.digit.days .caption', el).text(timeObj.getDay().caption);

			$('.digit.hours .num', el).text(timeObj.getHours().val);
			$('.digit.hours .caption', el).text(timeObj.getHours().caption);

			$('.digit.minutes .num', el).text(timeObj.getMinutes().val);
			$('.digit.minutes .caption', el).text(timeObj.getMinutes().caption);
		});
	}
	setInterval(function(){
		updateDate();
	},1000);

});

function pralaxShadow(){
	var boxes = [];
	$('.card, .diplom').not('.card-modal').each(function(index, val) {
		 boxes.push(new BoxShadow($(val)));
	});
	return{
		scroll: function(){
			var centerWindow = $(window).height() / 2 + $(window).scrollTop();
			boxes.forEach(function(box){
				box.scrolling(centerWindow);
			});
		}
	}
}
function BoxShadow(sel){
	var that = {};
	var halfHeight = sel.innerHeight()/2;
	sel.css('transition', 'all 0.2s');
	var cssShadowValues = parseCssShadow(sel.css('box-shadow'));
	var maxVal = cssShadowValues.yVal;
	var centerBlock = halfHeight + sel.offset().top;
	that.scrolling = function(centerWindow){
		if(centerWindow < centerBlock - (halfHeight*2)){
			setCssShadowValue(sel, cssShadowValues, maxVal);
		}else if(centerWindow > centerBlock + (halfHeight*2)){
			setCssShadowValue(sel, cssShadowValues, maxVal*-1);
		}else{
			var nowVal = maxVal * (centerBlock - centerWindow) / (halfHeight*2);
			setCssShadowValue(sel, cssShadowValues, nowVal);
		}
	}
	return that;
}
function parseCssShadow(string){
	var values = string.split(' ');
	return{
		color: values[0]+' '+values[1]+' '+values[2]+' '+values[3],
		xVal: parseInt(values[4]),
		yVal: parseInt(values[5]),
		sVal: parseInt(values[6]),
		bVal: parseInt(values[7])
	}
}
function setCssShadowValue(el, shadowObj, yVal){
	el.css('box-shadow', shadowObj.color +' '+ shadowObj.xVal 
			+ 'px '+ yVal + 'px '+ shadowObj.sVal + 'px '
				+ shadowObj.bVal + 'px ')
}


//Принимает объект даты до которого ведется счисление

function TimeObj(date){

	var that = {};
	var lostDate;

	that.update = function(){
		lostDate =  new Date(date - new Date());
	}

	that.update();

	that.getDay = function(){
		var day = lostDate.getDate() - 1;
		return {
			val: day,
			caption: getNumeralFromArr(['день', 'дня', 'дней'], day)
		};
	}
	that.getHours = function(){
		var hours = lostDate.getHours();
		return {
			val: hours,
			caption: getNumeralFromArr(['час', 'часа', 'часов'], hours)
		};
	}
	that.getMinutes = function(){
		var minutes = lostDate.getMinutes();
		return {
			val: minutes,
			caption: getNumeralFromArr(['минута', 'минуты', 'минут'], minutes)
		};

	}
	return that;
}

// Старый плагин вывода дат, обновляется каждую неделю автоматически
//принимает номер дня недели обновления

// function TimeObj(nextDay){
// 	if(nextDay<0 || nextDay>6){
// 		return false
// 	};

// 	var that = {};
// 	var now;
// 	var dayNum;
// 	var diffDay;

// 	that.update = function(){
// 		now = new Date();
// 		dayNum = now.getDay();
// 		diffDay = nextDay+7 - dayNum;
// 		if(diffDay>7){
// 			diffDay-=7;
// 		}
// 		(diffDay === 7) && (diffDay = 0);
// 	}

// 	that.update();

// 	that.getDay = function(){
// 		return {
// 			val: diffDay,
// 			caption: getNumeralFromArr(['день', 'дня', 'дней'], diffDay)
// 		};
// 	}
// 	that.getHours = function(){
// 		var hours = 23 - now.getHours();
// 		return {
// 			val: hours,
// 			caption: getNumeralFromArr(['час', 'часа', 'часов'], hours)
// 		};
// 	}
// 	that.getMinutes = function(){
// 		var minutes = 59 - now.getMinutes();
// 		return {
// 			val: minutes,
// 			caption: getNumeralFromArr(['минута', 'минуты', 'минут'], minutes)
// 		};

// 	}
// 	return that;
// }


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

function scrollCard(winTop, blockTop, maxTop, card, opt){
	if(winTop < blockTop){
		card.css({
			position: 'absolute',
			right: 40,
			top: 20,
			bottom: 'auto'
		});
	}else if(winTop >= blockTop && winTop <=maxTop){
		card.css({
			right: opt.right,
			position: 'fixed',
			top: 20,
			bottom: 'auto'
		});
	}else if(winTop > maxTop){
		card.css({
			position: 'absolute',
			right: 40,
			bottom: 5,
			top: 'auto'
		});
	}
}

function TimelineScroll(timelineBlock){
	var count = 0;
	var oldCount = 0;
	var diff = 120;
	var counter = timelineBlock.find('.counter');
	var offsetLeft = $(window).width()<800 ? 10 : 18;
	counter.css('left', timelineBlock.offset().left - offsetLeft);

	var animAr = [];

	timelineBlock.find('.items .item').each(function(i, el){
		animAr.push(0);
	});

	return function(winTop){
		count = 0;
		timelineBlock.find('.items .item').each(function(i, el){
			if(winTop - $(el).offset().top + 40 > 0){
				count += parseInt($(el).find('.digit').text());
			}
		});
		
		$('.digit',counter).text(count);
		$('.caption',counter).text(getNumeralFromArr(['Час', 'Часа', 'Часов'], count));
		
		if(oldCount !== count){
			counter.addClass('active')
			oldCount = count;
			setTimeout(function(){
				counter.removeClass('active');
			}, 200)
		}

		if(winTop < timelineBlock.offset().top - diff ||
			winTop > timelineBlock.offset().top + timelineBlock.height()){
			counter.css('opacity', 0);
		}else{
			counter.css('opacity', 1);
		}
	}
}

function parseDate(str){
	var monthArr = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
	var regExp = new RegExp(/^\s?(\d{1,2})\s([А-ЯЁа-яё]+)\s?(\d{4})?/,'i');
	var dateArr = regExp.exec(str);
	var day = parseInt(dateArr[1]) || 1;
	var month = monthArr.indexOf(dateArr[2]);
	if(month < 0){
		month = 0;
	}
	var year = parseInt(dateArr[3]);

	return {
		day: day,
		month: month,
		year: year
	}
}
