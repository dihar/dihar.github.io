var DEV = false;


var moduleSliderOptions = {
  pager: true,
  pagerType: 'short',
  pagerSelector: '.modules-programms.main-programm .controls-header .pages',
  pagerShortSeparator: '/',
  nextSelector: '.modules-programms.main-programm .controls-header .slider-next',
  prevSelector: '.modules-programms.main-programm .controls-header .slider-prev',
  nextText: '<span class="icon icon-right-arrow"></span>',
  prevText: '<span class="icon icon-left-arrow"></span>',
  infiniteLoop: false,
  minSlides: 4,
  maxSlides: 4,
  slideWidth: 4000
};

var teacherSliderOptions = {
  pager: true,
  pagerType: 'short',
  pagerSelector: '.modules-programms.teachers .controls-header .pages',
  pagerShortSeparator: '/',
  nextSelector: '.modules-programms.teachers .controls-header .slider-next',
  prevSelector: '.modules-programms.teachers .controls-header .slider-prev',
  nextText: '<span class="icon icon-right-arrow"></span>',
  prevText: '<span class="icon icon-left-arrow"></span>',
  infiniteLoop: false,
  minSlides: 4,
  maxSlides: 4,
  slideWidth: 4000
};

var learningPlanSliderOptions = {
  pager: false,
  prevSelector: '.learning-plan .controls .prev',
  nextSelector: '.learning-plan .controls .next',
  nextText: '<div class="circle"><span class="icon icon-right-arrow-small"></span></div>',
  prevText: '<div class="circle"><span class="icon icon-left-arrow-small"></span></div>',
  onSlideBefore: function($slideElement, oldIndex, newIndex){
    $('.learning-plan-slider-wrap .numSlide').text((++newIndex<10 ? '0' : '') + newIndex);
  },
  onSliderLoad: function(currentIndex){
    $('.learning-plan-slider-wrap .numSlide').text((++currentIndex<10 ? '0' : '') + currentIndex);
    $('.learning-plan-slider-wrap .countSlides').text((this.getSlideCount()<10 ? '0':'') + this.getSlideCount());
  }
};

var daysSliderOptions = {
  controls: false,
  auto: true,
  pager: true,
  buildPager: function(){
    return '<span class="point"></span>';
  }
};

var minisliderOptions = {
  controls: false,
  mode: 'vertical',
  auto: true,
  buildPager: function(){
    return '<span class="point"></span>';
  }
}

$(document).ready(function(){

  var showSize = DEV ? ShowSize($(window).width(), $(window).height()) : false;

  var daysSlider = $('.days-slider')
      .not('.no-slider').bxSlider(daysSliderOptions);

  var moduleSlider = $('.main-programm .modules-slider')
      .bxSlider(moduleSliderOptions);

  var teacherSlider = $('.teachers .modules-slider')
      .bxSlider(teacherSliderOptions);

  var learningPlanSlider = $('.learning-plan-slider')
      .bxSlider(learningPlanSliderOptions);

  var minislider1 = $('.diploms-box .minislider1')
      .bxSlider(minisliderOptions);

  var minislider2 = $('.diploms-box .minislider2')
      .bxSlider(minisliderOptions);


  windowResize();

  function windowResize(){
    DEV && showSize($(window).width(), $(window).height());

  	daysSlider.reloadSlider(daysSliderOptions);

  	learningPlanSlider.reloadSlider(learningPlanSliderOptions);

  	if($(document).innerWidth()>860){
      typeof moduleSlider.reloadSlider === 'function' && 
              moduleSlider.reloadSlider(moduleSliderOptions);

      typeof teacherSlider.reloadSlider === 'function' && 
              teacherSlider.reloadSlider(teacherSliderOptions);
  	}
  	else if($(document).innerWidth()<=860 && $(document).innerWidth()>500){
      typeof moduleSlider.reloadSlider === 'function' && 
              moduleSlider.reloadSlider($.extend(moduleSliderOptions,{
                minSlides: 2,
                maxSlides: 2,
              }));
      typeof teacherSlider.reloadSlider === 'function' && 
              teacherSlider.reloadSlider($.extend(teacherSliderOptions,{
                minSlides: 2,
                maxSlides: 2,
              }));
  	}
  	else if($(document).innerWidth()<=500){
      typeof moduleSlider.reloadSlider === 'function' && 
              moduleSlider.reloadSlider($.extend(moduleSliderOptions,{
                minSlides: 1,
                maxSlides: 1,
              }));
      typeof teacherSlider.reloadSlider === 'function' && 
              teacherSlider.reloadSlider($.extend(teacherSliderOptions,{
                minSlides: 1,
                maxSlides: 1,
              }));
  	}
  }

  $(window).resize(function(event) {
  	windowResize();
  });

  var skipOneScroll = true;
  var timeoutId;
  $(document).scroll(function(event) {
  	if(skipOneScroll){
		skipOneScroll = false;
  		return false;
  	}
  	clearTimeout(timeoutId);
  	$('.bounced').removeClass('bouncing');
  	setTimeout(function(){
  		$('.bounced').addClass('bouncing');
  	},50);
  	timeoutId = setTimeout(function(){
	  	$('.bounced').removeClass('bouncing');
  	}, 1000);
  });


  $(document).on('form change', 'input', function(){
    placeholdersRefresh($(this));
	});
  $('input').removeAttr('placeholder');
  function placeholdersRefresh(elem){
    if(elem.val().length > 0){
      elem.addClass('filled');
    }else{
      elem.removeClass('filled');
    }
    elem.removeAttr('placeholder');
  }
  $('.scrollTo').click(function(e){
    e.preventDefault();
    var target = $(this).data('scroll');
    if($(target).length>0){
      $('html, body').animate({scrollTop:$(target).offset().top}, 'slow');
      return false;
    }
  });

  $('.learning-plan-slider .read-more').click(function(){
      var buttonHtml = '<button type="button"'+
                        ' class="close" data-dismiss="modal"'+
                        ' aria-hidden="true">&times;</button>';
      $('#full-module .full-module')[0].innerHTML = buttonHtml + $(this).next('.content-module')[0].innerHTML;
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
      'z-index': 100000
    });
  return function(winW, winH){
    scrollBarWidth = winH < $(document).find('body').height() ? 17 : 0;
    $('body').find(".size-window").text(winW+ scrollBarWidth +' x '+winH);
  }
}