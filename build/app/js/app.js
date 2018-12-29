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
			$('.parallax__clouds').animate({opacity: 1}, 1000);
			$('.top-banner__bg-clouds').animate({opacity: 1}, 1000);
			setTimeout(function(){
				$('.top-banner__btn').removeClass('trs-delay');
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

		$('.top-banner__book-item').eq(0).on('transitionend', function(){
			$('.top-banner__book-item').addClass('trs-none');
			$(window).on('mousemove', function(e) {
				var w = $(window).width();
				var h = $(window).height();

				var offsetX = 0.5 - e.pageX / w;
				var offsetY = 0.5 - e.pageY / h;

				$('#top-banner__book-list--front').find('.top-banner__book-item').each(function(i,el){
					var offset = $(el).data('offset');
					
					var translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 0";
					
					$(el).css({
						'transform': translate
					})
				})

				$('#top-banner__book-list--back').find('.top-banner__book-item').each(function(i,el){
					var offset = $(el).data('offset');
					
					var translate = "translate3d(" + Math.round(offsetX * offset) + "px," + Math.round(offsetY * offset) + "px, 0";
					
					$(el).css({
						'transform': translate
					})
				})
			})
		});
	});

	var scene = document.getElementById('parallax-1');
	var scene2 = document.getElementById('parallax-2');

	var parallaxInstance = new Parallax(scene, {
		limitX: 30,
		limitY: 20,
		relativeInput: true
	});

	var parallaxInstance = new Parallax(scene2, {
		invertX: true,
		limitX: 20,
		limitY: 10,
		relativeInput: true
	});
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
			translatePerc = 755 * activeIndex,
			translateString = 'translateX(-' +translatePerc+ 'px)'

		list.css('transform', translateString);

		if (!status) {
			list.removeClass(disableClass);
			lockBlock.addClass(hideClass);
			setTimeout(function(){
				list.addClass(disableClass);
				lockBlock.removeClass(hideClass);
			},500);
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

(function(){
	var activeIndex = 0,
		flag = true,
		mainParent = $('.main'),
		allSection = mainParent.find('.section'),
		clouds = $('.top-banner__bg-clouds');

	var changeFlag = function() {
		setTimeout(function(){
			flag = true;
		},400);
	}

	var changePos = function (index) {
		var posTop = allSection.eq(index).position().top
		mainParent.css('margin-top', '-' +posTop+ 'px');

		if (index > 0) {
			$('.header').addClass('header--fixed');
			$('.logo__fixed').removeClass('hide').siblings().addClass('hide');
			$('.menu__item').eq(index-1).addClass('active').siblings().removeClass('active');
		} else {
			$('.header').removeClass('header--fixed');
			$('.logo__main').removeClass('hide').siblings().addClass('hide');
		}
	}

	var initChange = function (event) {
		if (flag) {
			flag = false
			if (event.deltaY > 0 && activeIndex != allSection.length - 1) {
				activeIndex++;
			} 
			if (event.deltaY < 0 && activeIndex != 0) {
				activeIndex--;
			}
			changePos(activeIndex);
			changeFlag();
		}
	}

	
	

	document.onwheel = function (e) {
		var sectionScroll = $(e.target.closest('.section'))[0];
			
		if ($(sectionScroll).find('.container').height() > window.innerHeight) {
			if (event.deltaY > 0 && sectionScroll.scrollTop === sectionScroll.scrollHeight - sectionScroll.clientHeight) initChange(e)
			if (event.deltaY < 0 && sectionScroll.scrollTop === 0) initChange(e)
		} else {
			initChange(e)
		}
	}

	$('.menu__link').click(function(e) {
		e.preventDefault();
		activeIndex = $(this).closest('.menu__item').index() + 1;
		if (flag) {
			flag = false;
			changePos(activeIndex);
			changeFlag();
		}
	})

	$('.logo').click(function(e) {
		e.preventDefault();
		activeIndex = 0;
		if (flag) {
			flag = false;
			changePos(activeIndex);
			changeFlag();
		}
	})
})();

$(document).ready(function () {
    svg4everybody({});
});
// Библиотека wow.js для анимации

(function () {
	new WOW().init();
})();