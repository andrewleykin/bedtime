// Начальная функция

// загрузка страницы и первая анимация
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
	});
})();

// смена слов в заголовке
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

// переключение табов в информации о группах
(function(){
	var ageTab = $('.info__age-tab'),
		ageWrap = $('.info__age-wrap')
		ageBlock = $('.info__age-block'),
		ageImg = $('.info__img img'),
		languageTabs = $('.info__language-tabs')
		languageTab = $('.info__language-tab'),
		languageActive = $('.info__language-active')
		languageActiveText = $('.info__language-active-text'),
		languageActiveFlag = $('.info__language-active-flag img'),
		languageBlock = $('.info__language-block'),
		languageWrap = $('.info__language-wrap'),
		groupTab = $('.info__group-tab'),
		groupBlock = $('.info__group-block'),
		groupWrap = $('.info__group-wrap'),
		hideClass = 'hide',
		activeClass = 'active'
		leaveClass = 'leave';

	var changeActiveClass = function (elem) {
		$(elem).addClass(activeClass).siblings().removeClass(activeClass);
	}

	var changeBlockClass = function (now, cur) {
		$(now).removeClass(activeClass).addClass(leaveClass);
		$(now).on('transitionend', function(){
			$(now).removeClass(leaveClass)
		});
		$(cur).addClass(activeClass, 'trs-delay');
	}

	var changeLanguageActive = function (text, name) {
		languageActiveText.text(text)
		languageActiveFlag.attr('src', 'app/img/content/info/flags/'+ name +'.png');
	}

	ageTab.first().addClass(activeClass);
	ageBlock.first().addClass(activeClass);
	ageBlock.first().find(languageTab).first().addClass(activeClass);
	ageBlock.first().find(languageBlock).first().addClass(activeClass);
	ageBlock.first().find(languageBlock).first().find(groupTab).first().addClass(activeClass);
	ageBlock.first().find(languageBlock).first().find(groupBlock).first().addClass(activeClass);
	changeLanguageActive(ageBlock.first().find(languageTab).first().text(), ageBlock.first().find(languageTab).first().data('name'))
	
	ageTab.click(function(){
		var index = $(this).index(),
			curAgeBlock = ageBlock.eq(index),
			nowAgeBlock = ageBlock.filter('.' + activeClass),
			curLanguageBlock = curAgeBlock.find(languageBlock).first(),
			curGroupBlock = curLanguageBlock.find(groupBlock).first();

		changeActiveClass($(this))
		changeBlockClass(nowAgeBlock, curAgeBlock)
		changeActiveClass(curAgeBlock.find(languageTab).first())
		changeActiveClass(curLanguageBlock)
		changeActiveClass(curLanguageBlock.find(groupTab).first())
		changeActiveClass(curGroupBlock)
		changeLanguageActive(curAgeBlock.find(languageTab).first().text(), curAgeBlock.find(languageTab).first().data('name'))
		ageImg.attr('src', 'app/img/content/info/age/'+ ++index +'.png');
	});

	languageTab.click(function(){
		var index = $(this).index(),
		curLanguageBlock = $(this).closest('.info__language').siblings('.info__language-wrap').find('.info__language-block').eq(index),
		nowLanguageBlock = $(this).closest('.info__language').siblings('.info__language-wrap').find('.info__language-block').filter('.' + activeClass);
		
		changeActiveClass($(this))
		changeBlockClass(nowLanguageBlock, curLanguageBlock)
		changeActiveClass(curLanguageBlock.find(groupTab).first())
		changeActiveClass(curLanguageBlock.find(groupBlock).first())
		changeLanguageActive($(this).text(), $(this).data('name'))
		languageTabs.addClass(hideClass);
	});

	groupTab.click(function(){
		var index = $(this).index(),
			curGroupBlock = $(this).closest('.info__group').siblings('.info__group-wrap').find('.info__group-block').eq(index),
			nowGroupBlock = $(this).closest('.info__group').siblings('.info__group-wrap').find('.info__group-block').filter('.' + activeClass);

		changeActiveClass($(this))
		changeBlockClass(nowGroupBlock, curGroupBlock)
	});

	languageActive.click(function(){
		languageTabs.toggleClass(hideClass)
	});


})();

// попапы в табах информации о группах
(function(){
	var links = $('.ig__descr-block'),
		hideBlock = links.find('.ig__descr-hide'),
		activeClass = 'active';

	links.click(function(e){
		$(this).addClass(activeClass);
		$(this).find(hideBlock).addClass(activeClass)
	});

	hideBlock.click(function(e){
		e.stopPropagation();
		if(e.target === $('.ig__descr-content')[0]) return;
		$(this).closest(links).removeClass(activeClass)
		$(this).removeClass(activeClass)
	});
})();

// раскрытие текста в секции о курсах
(function(){
	var moreReviewLink = $('.about__review-more'),
		hideTextBlocks = moreReviewLink.siblings('.hide'),
		hideClass = 'hide';

	moreReviewLink.click(function(){
		$(this).addClass(hideClass);
		hideTextBlocks.removeClass(hideClass);
	});
})();

// слайдер в отзывах
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

// слайдер в архиве видеокурсов
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

// раскрытие текста в контактах
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

// смена экранов
(function(){
	$(document).ready(function(){

		var activeIndex = 0,
			flag = true,
			mainParent = $('.main'),
			allSection = mainParent.find('.section');
			console.log("​allSection", allSection)
		
		
		var changeFlag = function() {
			setTimeout(function(){
				flag = true;
			},600)
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
				$('.menu__item').removeClass('active');
			}
		}
		
		var initChange = function (event) {
			if (event.deltaY > 0 && activeIndex != allSection.length - 1) {
				activeIndex++;
			} 
			if (event.deltaY < 0 && activeIndex != 0) {
				activeIndex--;
			}
			changePos(activeIndex);
		}
		
		document.onwheel = function (e) {
			var sectionScroll = allSection.eq(activeIndex)[0];
			if (!sectionScroll.hasAttribute('data-scroll')) {
				e.preventDefault()
			}
			if (flag) {
				if ($(sectionScroll).find('.container').height() > window.innerHeight) {
					if (event.deltaY > 0 && sectionScroll.scrollTop === sectionScroll.scrollHeight - sectionScroll.clientHeight) initChange(e)
					if (event.deltaY < 0 && sectionScroll.scrollTop === 0) initChange(e)
				} else {
					e.preventDefault()
					initChange(e)
				}
				flag = false;
				changeFlag()
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
	});
})();
