'use strict';
$(document).ready(function() {

	enableScrollButtons();


	$('.preloader__logo').fadeOut('100', function(){
		$(this).remove();
	});

	$('.header__menu').click(function(){
		$('.menu').addClass('menu_status_open');
	});

	$('.menu__bg-darker').click(function(){
		$('.menu').removeClass('menu_status_open');
	});

	$('.menu__item-link').click(function(){
		$('.menu').removeClass('menu_status_open');
	});

	//circles animation, when they are showed in window
	var circleDelay = 0;
	whenInWindow($('.first-window .first-window__circle-wrap'), function(){
		circleDelay++;
		setTimeout(function(i){
			$(this).removeClass('closed');
		}.bind(this, circleDelay), 500 + 150*circleDelay);
	}, {bottom: 0, top: 0});

	circleDelay = 0;
	whenInWindow($('.help .first-window__circle-wrap'), function(){
		circleDelay++;
		setTimeout(function(i){
			$(this).removeClass('closed');
		}.bind(this, circleDelay), 500 + 50*circleDelay);
	}, {bottom: 100, top: 0});

	//go out big balloon on click
	$('.first-window__balloon4').click(function(){
		$(this).addClass("go-out");
	})

	whenInWindow($('.programm__r-price'), function(){
		$(this).removeClass('closed');
	}, {bottom: 200, top: 200});

	circleDelay = 0;
	whenInWindow($('.special__icon'), function(){
		circleDelay++;
		setTimeout(function(i){
			$(this).removeClass('closed');
		}.bind(this, circleDelay), 300 + 40*circleDelay);
	}, {bottom: 100, top: 100});

	//modal carousel
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
		e.preventDefault();
		openPrModal($(this).data('target'));
	});


	$(window).resize(function() {

	});

	$(window).on('scroll', scrollHandler());

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

function scrollHandler(){

	var $balloon1 = $('.first-window__balloon1');
	var balloon1Styles = window.getComputedStyle($balloon1[0]);
	balloon1Styles = {
		right: parseFloat(balloon1Styles.right),
		top: parseFloat(balloon1Styles.top)
	}
	var $balloon2 = $('.first-window__balloon2');
	var balloon2Styles = window.getComputedStyle($balloon2[0]);
	balloon2Styles = {
		right: parseFloat(balloon2Styles.right),
		top: parseFloat(balloon2Styles.top)
	}
	var $balloon3 = $('.first-window__balloon3');
	var balloon3Styles = window.getComputedStyle($balloon3[0]);
	balloon3Styles = {
		right: parseFloat(balloon3Styles.right),
		top: parseFloat(balloon3Styles.top)
	}
	var $balloon4 = $('.first-window__balloon4');
	var balloon4Styles = window.getComputedStyle($balloon4[0]);
	balloon4Styles = {
		right: parseFloat(balloon4Styles.right),
		top: parseFloat(balloon4Styles.top)
	}


	var ballonWrap = $('.results__balloons');

	var $balloon5 = $('.results__balloon5');
	var balloon5Styles = window.getComputedStyle($balloon5[0]);
	balloon5Styles = {
		left: parseFloat(balloon5Styles.left),
		bottom: parseFloat(balloon5Styles.bottom)
	}
	var $balloon6 = $('.results__balloon6');
	var balloon6Styles = window.getComputedStyle($balloon6[0]);
	balloon6Styles = {
		right: parseFloat(balloon6Styles.right),
		bottom: parseFloat(balloon6Styles.bottom)
	}
	var $balloon7 = $('.results__balloon7');
	var balloon7Styles = window.getComputedStyle($balloon7[0]);
	balloon7Styles = {
		left: parseFloat(balloon7Styles.left),
		bottom: parseFloat(balloon7Styles.bottom)
	}
	var $balloon8 = $('.results__balloon8');
	var balloon8Styles = window.getComputedStyle($balloon8[0]);
	balloon8Styles = {
		left: parseFloat(balloon8Styles.left),
		bottom: parseFloat(balloon8Styles.bottom)
	}

	return function(e){
		var scroll = $(window).scrollTop();

		// first window balloons
		var k = Math.min(scroll / 1000, 1);
		if(Math.abs(k) <= 1){
			$balloon1.css({
				right: balloon1Styles.right + k * 40,
				top: balloon1Styles.top - k * 200
			});
			$balloon2.css({
				right: balloon2Styles.right - k * 60,
				top: balloon2Styles.top - k * 400
			});
			$balloon3.css({
				right: balloon3Styles.right + k * 100,
				top: balloon3Styles.top - k * 100
			});
			$balloon4.css({
				right: balloon4Styles.right - k * 100,
				top: balloon4Styles.top - k * 200
			});
		}

		// last window balloons
		var k = Math.min((scroll - ballonWrap.offset().top - 200) / 1000, 1);

		if(Math.abs(k) <= 1){
			$balloon5.css({
				left: balloon5Styles.left + k * 40,
				bottom: balloon5Styles.bottom - k * 100
			});
			$balloon6.css({
				right: balloon6Styles.right - k * 30,
				bottom: balloon6Styles.bottom - k * 50
			});
			$balloon7.css({
				left: balloon7Styles.left + k * 10,
				bottom: balloon7Styles.bottom - k * 80
			});
			$balloon8.css({
				left: balloon8Styles.left + k * 100,
				bottom: balloon8Styles.bottom - k * 20
			});
		}

	}


}


function whenInWindow($els, cb, diff){
	if(diff === undefined){
		diff = {
			top: 0,
			bottom: 0
		};
	}
	diff = diff || {
			top: 0,
			bottom: 0
		};
	$(window).on('scroll load', function(){
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