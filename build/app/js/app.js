// Начальная функция

(function(){
	// загрузка страницы
	$(document).ready(function(){
		setTimeout(function(){
			$('.top-banner__bg').removeClass('hide');
		},200);

		$('.top-banner__bg').on('transitionend', function(){
			$('.top-banner__title').removeClass('hide');
			$('.top-banner__descr').removeClass('hide');
			$('.top-banner__btn').removeClass('hide');
			$('.top-banner__bg-clouds').animate({opacity: 1})
			setTimeout(function(){
				topBannerAnimation()
			},600);
		});

		function topBannerAnimation () {
			$('.top-banner__moon').removeClass('hide');
			$('.top-banner__books').removeClass('hide');
			setTimeout(function(){
				$('.top-banner__book-item').removeClass('hide');
			},600);
		}
	});

	var scene = document.getElementById('parallax-1');
	var scene2 = document.getElementById('parallax-2');

	var parallaxInstance = new Parallax(scene, {
		limitX: 20,
		limitY: 10,
		relativeInput: true
	});

	var parallaxInstance = new Parallax(scene2, {
		invertX: true,
		limitX: 10,
		limitY: 5,
		relativeInput: true
	});

	function scrollNav() {
		$('.js-scroll-to').on("click", function(){
			//Animate
			$('html, body').stop().animate({
					scrollTop: $( $(this).attr('href') ).offset().top
			}, 400);
			return false;
		});
	}
	scrollNav();

	// Add and remove on header fixed
	function stickyMenu(){
		var scroll = $(window).scrollTop();

		if (scroll >= 65) {
				$('.header').addClass('header--fixed');
				$('.logo__fixed').removeClass('hide').siblings().addClass('hide');
		}
		else {
				$('.header').removeClass('header--fixed');
				$('.logo__main').removeClass('hide').siblings().addClass('hide');
		}
	}

	$(window).on('scroll', function() {
		stickyMenu();
	})
})();

(function(){
	$('.tbt__list').slick({
		vertical: true,
		appendArrows: $('.tbt__arrows'),
		prevArrow: $('.tbt__arrow--prev'),
		nextArrow: $('.tbt__arrow--next'),
		autoplay: true,
		autoplaySpeed: 3000,
	});
})();

(function(){
	var ageTab = $('.info__age-tab'),
		ageBlock = $('.info__age-block'),
		languageTab = $('.info__language-tab'),
		contentBlock = $('.info__content'),
		activeClass = 'active';

	ageTab.first().addClass(activeClass);
	ageBlock.first().addClass(activeClass);
	ageBlock.first().find(languageTab).first().addClass(activeClass);
	ageBlock.first().find(contentBlock).first().addClass(activeClass);

	ageTab.click(function(){
		var index = $(this).index(),
			curAgeBlock = ageBlock.eq(index);

		$(this).addClass(activeClass).siblings().removeClass(activeClass);
		curAgeBlock.addClass(activeClass).siblings().removeClass(activeClass);
		curAgeBlock.find(languageTab).first().addClass(activeClass).siblings().removeClass(activeClass);
		curAgeBlock.find(contentBlock).first().addClass(activeClass).siblings().removeClass(activeClass);
	});

	languageTab.click(function(){
		var index = $(this).index(),
			curContentBlock = $(this).closest('.info__language').siblings('.info__language-block').find(contentBlock).eq(index);
		
		$(this).addClass(activeClass).siblings().removeClass(activeClass);
		curContentBlock.addClass(activeClass).siblings().removeClass(activeClass);
	});
})();

(function(){
	var moreReviewLink = $('.info__review-more'),
		hideTextBlocks = moreReviewLink.siblings('.hide'),
		hideClass = 'hide';

	moreReviewLink.click(function(){
		$(this).addClass(hideClass);
		hideTextBlocks.removeClass(hideClass);
	});
})();

(function(){
	$('.review__content').slick({
		fade: true,
		arrows: false,
		asNavFor: '.review__users',
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 7000
	});

	$('.review__users').slick({
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		centerMode: true,
		centerPadding: '20px',
		asNavFor: '.review__content',
		variableWidth: true,
		focusOnSelect: true,
		cssEase: 'linear',
		speed: 200,
		draggable: false,
		adaptiveHeight: true
	});
})();

(function(){
	var activeIndex = 0,
		list = $('.archive__list'),
		items = $('.archive__item'),
		lockBlock = $('.archive__lock'),
		activeClass = 'active',
		disableClass = 'disable',
		hideClass = 'hide';

	items.first().addClass(activeClass);

	items.click(function(){
		$(this).addClass(activeClass).siblings().removeClass(activeClass);
		activeIndex = $(this).index();

		var status = $(this).data('status'),
			translatePerc = 50 * activeIndex,
			translateString = 'translateX(-' +translatePerc+ '%)'

		list.css('transform', translateString);

		if (!status) {
			list.addClass(disableClass);
			lockBlock.removeClass(hideClass);
		} else {
			list.removeClass(disableClass);
			lockBlock.addClass(hideClass);
		}
	});
})();

(function(){
	$('.contacts__more').click(function(){
		var hideBlock = $(this).siblings('.contacts__hide'),
			activeClass = 'active';

		if ($(this).hasClass(activeClass)) {
			$(this).removeClass(activeClass);
			$(this).text('Подробнее');
			hideBlock.removeClass(activeClass);
		} else {
			$(this).addClass(activeClass);
			$(this).text('Скрыть');
			hideBlock.addClass(activeClass);
		}
	});
})();
$(document).ready(function () {
    svg4everybody({});
});
// Библиотека wow.js для анимации

(function () {
	new WOW().init();
})();