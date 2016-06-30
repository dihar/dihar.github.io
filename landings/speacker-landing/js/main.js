$(document).ready(function(){

	var fixedNav = new FixedNav($('.programm .contents'));

	addLabel($('.programm-list li'));

	enableScrollButtons();

	chooseTheme($('.programm-list li').not('.busy'));

	addFucknDisable($('select option[selected]'));

	$(window).scroll(function(){
		fixedNav.scroll();
	});

	$(window).resize(function(){
		fixedNav = new FixedNav($('.programm .contents'));
		fixedNav.scroll();
	})
});

function addLabel($elems){
	$elems.not('.busy').each(function(i, el){
		el.innerHTML = el.innerHTML.trim() + 
			'<span class="empty"><span class="label"></span></span>';
	});
}

function addFucknDisable($sel){
	$sel.attr('disabled', 'disabled');
}

function NavContentsControll($titles, $contents){

	var count = $titles.length;
	var active = 1;

	var arrEls = Array.prototype.slice.call($titles.map(function(index, elem) {
		return $(elem).offset().top;
	})).reverse();

	this.scroll = function(){
		var windowTop = $(window).scrollTop();

		arrEls.forEach(function(el, i, arr){
			if(windowTop < el){
				active = arr.length - i;
			}
		});

		$contents.removeClass('active').eq(active-1).addClass('active');
	}
}

function FixedNav($nav){

	resetStyles($nav);

	var paddingBottom = 85;

	var parentNav = $nav.parent();
	var minHeight = parentNav.offset().top;
	var maxHeight = minHeight + parentNav.height() - $nav.height() + 2*paddingBottom/3;

	var leftNav = $nav.offset().left;
	var contentsListHeight = $nav.find('ul').height() - 34;
	var contentsListSlider = $nav.find('.slider');

	function resetStyles($nav){
		$nav.css({
			position: '',
			top: '',
			bottom: '',
			left: ''
		});
	}
	
	this.scroll = function(){
		var windowTop = $(window).scrollTop();

		if(windowTop < minHeight){
			resetStyles($nav);
			contentsListSlider.css('top', 0);
		}else if(windowTop >= minHeight && windowTop <= maxHeight){
			$nav.css({
				position: 'fixed',
				top: 10,
				bottom: 'auto',
				left: leftNav
			});
			contentsListSlider.css('top', 
				contentsListHeight*(1 -(maxHeight - windowTop) / (maxHeight - minHeight))
			);
		}else{
			resetStyles($nav);
			$nav.css({
				top: 'auto',
				bottom: paddingBottom
			});
			contentsListSlider.css('top', contentsListHeight);
		};
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

function chooseTheme($lists){
	$lists.each(function(i, el){
		$(el).click(function(e){
			var text = $(e.target).text();
			var number = $(e.target).parent().prev()[0].className.replace('title','');
			$('.main-form select option').removeAttr('selected').eq(parseInt(number)-1).attr('selected', 'selected');
			$('.main-form input.theme-input').val(text);
			$('html, body').animate({scrollTop:$('.main-form').offset().top}, 'slow');
		});
	});
}