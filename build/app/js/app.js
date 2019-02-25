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

// слайдер учителей в секции о курсах
(function(){
	
	$('.about__teachers-list').slick({
		dots: false,
		arrows: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: false,
		adaptiveHeight: false,
		prevArrow: '<button type="button" class="about__teachers-arrow about__teachers-arrow--prev"></button>',
		nextArrow: '<button type="button" class="about__teachers-arrow about__teachers-arrow--next"></button>'
	})
})();

// табы в секции о курсах
(function(){
	var tabs = $('.about__example-tab'),
		blocks = $('.about__example-block'),
		activeClass = 'active';
	
	var changeActiveClass = function (elem) {
		$(elem).addClass(activeClass).siblings().removeClass(activeClass);
	}

	changeActiveClass(tabs.first())
	changeActiveClass(blocks.first())

	tabs.click(function(){
		var index = $(this).index();

		changeActiveClass(tabs.eq(index))
		changeActiveClass(blocks.eq(index))
	});
	
})();

// сетка фоток в секции о курсах
(function(){
	var wrap = $('.aep__list') 
		items = $('.aep__item'),
	 	col1 = '',
	 	col2 = '',
	 	col3 = '',
		html = '',
		colCount = 0;
	
	for(i=0; i<items.length; i++) {
		if (colCount === 0) {
			col1+= items.eq(i).html()
			colCount++
			continue;
		}
		if (colCount === 1) {
			col2+= items.eq(i).html()
			colCount++
			continue;
		}
		if (colCount === 2) {
			col3+= items.eq(i).html()
			colCount = 0
			continue;
		}
	}
	html+= `<div class="aep__col">${col1}</div><div class="aep__col">${col2}</div><div class="aep__col">${col3}</div>`;
	wrap.html(html)

})();

// переключение табов в информации о группах
(function(){
	var ageTab = $('.info__age-tab'),
		ageBlock = $('.info__age-block'),
		ageImg = $('.info__img img'),
		languageTabs = $('.info__language-tabs')
		languageTab = $('.info-language-tab'),
		languageActive = $('.info__language-active')
		languageActiveText = $('.language-active-text'),
		levelActiveText = $('.level-active-text'),
		languageActiveFlag = $('.info__language-active-flag img'),
		languageBlock = $('.info__language-block'),
		languageWrap = $('.info__language-wrap'),
		groupTab = $('.info-group-tab'),
		groupBlock = $('.info__group-block'),
		groupWrap = $('.info__group-wrap'),
		groupTabs = $('.info-language-tabs-group'),
		groupTabsWrap = $('.info__language-tabs-group-wrap')
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

	ageTab.first().addClass(activeClass); // таб возраста
	ageBlock.first().addClass(activeClass); // блок возраста
	ageBlock.first().find(languageBlock).first().addClass(activeClass); // блок языка
	ageBlock.first().find('.info-language-tabs').find('.info__language-tab').first().addClass(activeClass); // табу языков
	ageBlock.first().find('.info-language-tabs-group').find(groupTabsWrap).first().find(groupTab).first().addClass(activeClass); // табу группы
	ageBlock.first().find(languageBlock).first().find(groupBlock).first().addClass(activeClass); // блок группы
	ageBlock.first().find(groupTabs).find(groupTabsWrap).first().addClass(activeClass) // блок табов группы
	changeLanguageActive(ageBlock.first().find(languageTab).first().text(), ageBlock.first().find(languageTab).first().data('name'))
	levelActiveText.text(ageBlock.first().find(groupTabs).find(groupTabsWrap).first().find(groupTab).first().text())

	// активный класс  табу групы
	
	ageTab.click(function(){
		var index = $(this).index(),
			curAgeBlock = ageBlock.eq(index),
			nowAgeBlock = ageBlock.filter('.' + activeClass),
			curLanguageBlock = curAgeBlock.find(languageBlock).first(),
			curGroupBlock = curLanguageBlock.find(groupBlock).first(),
			curGroupTabsBlock = curAgeBlock.find(groupTabs).find(groupTabsWrap).first(),
			curGroupTab = curGroupTabsBlock.find(groupTab).first()			
		

		changeActiveClass($(this))
		changeBlockClass(nowAgeBlock, curAgeBlock)
		changeActiveClass(curAgeBlock.find(languageTab).first())
		changeActiveClass(curLanguageBlock)
		changeActiveClass(curGroupBlock)
		changeActiveClass(curGroupTabsBlock)
		changeActiveClass(curGroupTab)
		changeLanguageActive(curAgeBlock.find(languageTab).first().text(), curAgeBlock.find(languageTab).first().data('name'))
		levelActiveText.text(curGroupTabsBlock.find(groupTab).first().text())
		ageImg.attr('src', 'app/img/content/info/age/'+ ++index +'.png');
	});

	languageTab.click(function(){
		var index = $(this).index(),
		curLanguageBlock = $(this).closest('.info__header').siblings('.info__language-wrap').find('.info__language-block').eq(index),
		nowLanguageBlock = $(this).closest('.info__header').siblings('.info__language-wrap').find('.info__language-block').filter('.' + activeClass),
		curGroupTabsBlock = $(this).closest('.info__age-block').find(groupTabsWrap).eq(index),
		curGroupTab = curGroupTabsBlock.find(groupTab).first()
		
		changeActiveClass($(this))
		changeBlockClass(nowLanguageBlock, curLanguageBlock)
		changeActiveClass(curLanguageBlock.find(groupTab).first())
		changeActiveClass(curLanguageBlock.find(groupBlock).first())
		changeActiveClass(curGroupTabsBlock)
		changeActiveClass(curGroupTab)
		changeLanguageActive($(this).text(), $(this).data('name'))
		levelActiveText.text(curGroupTabsBlock.find(groupTab).first().text())
		languageTabs.addClass(hideClass);
	});

	groupTab.click(function(){
		var index = $(this).index(),
			indexLanguage = $(this).closest('.info__header').find('.info-language-tabs').find('.info__language-tab').filter('.' + activeClass).index();
			curGroupBlock = $(this).closest('.info__header').siblings('.info__language-wrap').find('.info__language-block').eq(indexLanguage).find(groupBlock).eq(index),
			nowGroupBlock = $(this).closest('.info__header').siblings('.info__language-wrap').find('.info__language-block').eq(indexLanguage).find(groupBlock).filter('.' + activeClass);
			console.log($(this).closest('.info__header').siblings('.info__language-wrap').find('.info__language-block'))
			console.log('TCL: nowGroupBlock', nowGroupBlock)

		

		changeActiveClass($(this));
		changeBlockClass(nowGroupBlock, curGroupBlock);
		levelActiveText.text($(this).text())
		languageTabs.addClass(hideClass);
	});

	languageActive.click(function(){
		$(this).siblings(languageTabs).toggleClass(hideClass)
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

// раскрытие текста в секции faq
(function(){
	var moreReviewLink = $('.faq__review-more'),
		hideTextBlocks = moreReviewLink.siblings('.hide'),
		hideClass = 'hide';

	moreReviewLink.click(function(){
		$(this).addClass(hideClass);
		hideTextBlocks.removeClass(hideClass);
	});
})();

// аккордеон в секции faq
(function(){
	var link = $('.faq__tab-header'),
		body = $('.faq__tab-body')

	link.click(function(){
		var curBlock= $(this).closest('.faq__tab');
		if (curBlock.hasClass('active')) {
			curBlock.removeClass('active');
			curBlock.find(body).slideUp();
		} else {
			body.slideUp()
			curBlock.find(body).slideDown();
			curBlock.addClass('active').siblings().removeClass('active')
		}
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

$(document).ready(function () {
    svg4everybody({});
});
// Библиотека wow.js для анимации

(function () {
	new WOW().init();
})();