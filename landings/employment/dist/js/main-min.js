function onYouTubeIframeAPIReady(){player=new YT.Player("ytplayer")}function pauseVideo(){player.pauseVideo()}function enableScrollButtons(){$("[data-scroll]").click(function(o){o.preventDefault();var e=$(this).data("scroll");if($(e).length>0)return $("html, body").animate({scrollTop:$(e).offset().top},"slow"),!1})}$(window).load(function(){function o(o){$(".programm-modal").removeClass("open"),!!o&&o.preventDefault(),setTimeout(function(){$("body").removeClass("modal-open").css("paddingRight",""),$(".pr-modal-backdrop").hide(),$(".programm-modal").hide()},200)}function e(o){a.jumpTo(parseInt(o)-1),$("body").addClass("modal-open").css("paddingRight",17),$(".pr-modal-backdrop").show(),$(".programm-modal").show(),setTimeout(function(){$(".programm-modal").addClass("open")},0)}enableScrollButtons(),$(".preloader__logo").fadeOut("100",function(){$(this).remove()}),$(".menu__close").eq(0).click(function(){$(".menu").toggleClass("menu__status_open")}),$(".menu__bg-darker").click(function(){$(".menu").removeClass("menu__status_open")}),$(".menu__item-link").click(function(){$(".menu").removeClass("menu__status_open")}),$(".programm-modal .slider").owlCarousel({singleItem:!0,pagination:!1});var a=$(".programm-modal .slider").data("owlCarousel");$(".programm-modal__ctr-button").click(function(){$(this).hasClass("programm-modal__ctr-button_right")?a.next():a.prev()}),$(".programm-modal__close").click(o),$(".pr-modal-backdrop").click(o),$('[data-role="programm-modal"]').click(function(o){e($(this).data("target"))}),$("#video").on("hide.bs.modal",function(o){pauseVideo()}),$(window).resize(function(){})});var player;
//# sourceMappingURL=dist/js/main-min.js.map