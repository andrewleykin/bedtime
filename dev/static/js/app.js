// Начальная функция

// загрузка страницы и первая анимация
(function(){
	if (window.innerWidth <= 768) return false
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
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					vertical: false,
					autoplay: false
				}
			}
		]
	});
})();

// мобильное меню
(function(){
	if (window.innerWidth > 768) return false
	var activeClass = 'menu-open';
	var animationMenu = function (bool) {
		if (bool) {
			$('.menu').addClass(activeClass);
			setTimeout(function(){
				$('.menu__item').addClass(activeClass);
				$('.logo__fixed').addClass(activeClass);
				$('.logo__mobile').addClass(activeClass);
				$('.header__action').addClass(activeClass);
				$('.header__burger').addClass(activeClass);
			}, 400)
		} else {
			$('.logo__fixed').removeClass(activeClass);
			$('.logo__mobile').removeClass(activeClass);
			$('.header__action').removeClass(activeClass);
			$('.header__burger').removeClass(activeClass);
			$('.menu__item').removeClass(activeClass);
			setTimeout(function(){
				$('.menu').removeClass(activeClass);
			}, 200)
		}
	}
	$('.header__burger').click(function(){
		if (!$(this).hasClass(activeClass)) {
			animationMenu(true)
		} else {
			animationMenu(false)
		}
	});

	$('.menu__link').click(function(e){
		e.preventDefault();
		animationMenu(false)
		//Animate
    $('html, body').stop().animate({
			scrollTop: $( $(this).attr('href') ).offset().top - 100
		}, 400);
		return false;
	});
})();

// слайдер преимуществ на мобильной версии
(function(){
	if (window.innerWidth > 768) return false
	$('.about__advantage').slick({
		centerMode: true,
		arrows: false,
		variableWidth: true
	})

	$('.about__advantage-img img').click(function(){
		var index = $(this).closest('.about__advantage-block').data('slick-index')
		$('.about__advantage').slick('slickGoTo', index, false)
	})
})();

// учителя в секции о курсах
(function(){
	var post = $('.about__teachers-post'),
		item = $('.about__teachers-item'),
		text = $('.about__teachers-text');
	
	// если больше 768, проставить отступы
	if (window.innerWidth > 768) {
		for (i=0; i<post.length; i++) {
			var curItem = post.eq(i).closest(item),
				curText = curItem.find(text);
			
			if (post.eq(i).height() > 20 && post.eq(i).height() < 50) {
				curText.css('paddingTop', 240)
			} else if (post.eq(i).height() > 50) {
				curText.css('paddingTop', 260)
			} else {
				curText.css('paddingTop', 224)
			}
		}
	}

	// слайдер
	$('.about__teachers-list').slick({
		dots: false,
		arrows: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		infinite: false,
		prevArrow: '<button type="button" class="about__teachers-arrow about__teachers-arrow--prev"></button>',
		nextArrow: '<button type="button" class="about__teachers-arrow about__teachers-arrow--next"></button>',
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					centerMode: true,
					arrows: false
				}
			}
		]
	})

	// если меньше 768, то открывать текст по клику
	if (window.innerWidth <= 768) {
		item.click(function(e){
			e.stopPropagation()
			$(this).find(text).slideToggle()
			$(this).find('.about__teachers-more').toggleClass('active')
		})
	}
})();

// табы в секции о курсах
(function(){
	var tabs = $('.about__example-tab'),
		blocks = $('.about__example-block'),
		activeClass = 'active',
		wrap = $('.about__example-content');

		
	var changeActiveClass = function (elem) {
		$(elem).addClass(activeClass).siblings().removeClass(activeClass);
	}

	var checkActiveBlock = function () {
		if (window.innerWidth > 768) return false
		if (blocks.first().hasClass(activeClass)) {
			wrap.addClass('full-width')
		} else {
			wrap.removeClass('full-width')
		}
	}
	
	changeActiveClass(tabs.first())
	changeActiveClass(blocks.first())
	checkActiveBlock()
	wrap.css('height', blocks.first().height() < 200 ? 200 : blocks.first().height())

	tabs.click(function(){
		var index = $(this).index();
		var now = blocks.filter('.active');
		var cur = blocks.eq(index);

		now.removeClass(activeClass).addClass(leaveClass);
		now.on('transitionend', function(){
			now.removeClass(leaveClass)
		});
		cur.addClass(activeClass, 'trs-delay');

		changeActiveClass(tabs.eq(index));
		checkActiveBlock()
		wrap.css('height', cur.height())
	});
	
})();

// попап видео в секции о курсах
(function(){
	$('.aev__info').click(function(e){
		e.stopPropagation();
	})
	$('.aev__block').click(function(){
		var videoBlock = $('.aev__video').eq($(this).index())
		videoBlock.addClass('active').siblings().removeClass('active');
		videoBlock.find('video')[0].play()
	})

	$(document).on('closing', '.aev__remodal', function (e) {
		$('.aev__video.active').find('video')[0].pause()
	});
})();

// слайдер видео в секции о курсах
(function(){
	if (window.innerWidth > 768) return false
	$('.aev__list').slick({
		centerMode: true,
		arrows: false,
		variableWidth: true,
		infinite: false
	})
})();

// сетка фоток в секции о курсах
(function(){
	var list = $('.aep__list') 
		items = list.find('.aep__item'),
	 	col1 = '',
	 	col2 = '',
		col3 = '',
		htmlCols = '',
		colCount = 0;

	
	if (window.innerWidth > 768) {
		for (i=0; i<items.length; i++) {
			if (colCount === 0) {
				col1+= items.eq(i)[0].outerHTML
				colCount++
				continue;
			}
			if (colCount === 1) {
				col2+= items.eq(i)[0].outerHTML
				colCount++
				continue;
			}
			if (colCount === 2) {
				col3+= items.eq(i)[0].outerHTML
				colCount = 0
				continue;
			}
		}
		htmlCols+= '<div class="aep__col">'+col1+'</div><div class="aep__col">'+col2+'</div><div class="aep__col">'+col3+'</div>`';
		list.html(htmlCols);
	} else {
		$('.aep__list').slick({
			arrows: false,
			variableWidth: true
		})
	}
	
})();

// слайдер в сетке фоток в секции о курсах
(function(){
	$('.aep__item').click(function(){
		if (window.innerWidth <= 768) return false
		var index = $(this).index();
		var indexCol = $(this).closest('.aep__col').index();
		var inst = $('[data-remodal-id=slider]').remodal();
		var initSlideIndex = 0;

		if (index === 0) {
			initSlideIndex = indexCol
		} else {
			if (indexCol === 0) {
				initSlideIndex = 3*index
			} else {
				initSlideIndex = 3*index+indexCol
			}
		}

		inst.open();
		$('.aep__slider').slick({
			prevArrow: '<button type="button" class="about__teachers-arrow about__teachers-arrow--prev"></button>',
			nextArrow: '<button type="button" class="about__teachers-arrow about__teachers-arrow--next"></button>',
			initialSlide: initSlideIndex
		})
	});

	$(document).on('closed', '.remodal', function (e) {
		$('.aep__slider').slick('unslick')
	});
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

	languageTabs.click(function(e){
		e.stopPropagation();
		$(this).addClass(hideClass);
	})

	languageTab.click(function(){
		if ($(this).hasClass(activeClass)) return false
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

	languageActive.click(function(e){
		e.stopPropagation();
		$(this).siblings(languageTabs).toggleClass(hideClass)
	});

	$('.info').click(function(){
		for(i=0; i<languageTabs.length;i++) {
			if (!languageTabs.eq(i).hasClass(hideClass)) {
				languageTabs.eq(i).addClass(hideClass)
			}
		}
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
		hideClass = 'hide',
		activeClass = 'active';

	moreReviewLink.click(function(){
		if ($(this).hasClass(activeClass)) {
			$(this).removeClass(activeClass).text('Читать полностью');
			hideTextBlocks.addClass(hideClass);
		} else {
			$(this).addClass(activeClass).text('Скрыть');
			hideTextBlocks.removeClass(hideClass);
		}
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
		autoplaySpeed: 7000,
		adaptiveHeight: true
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
		if (window.innerWidth <= 768) return false
		var activeIndex = 0,
			flag = true,
			mainParent = $('.main'),
			allSection = mainParent.find('.section');
		
		
		var changeFlag = function() {
			setTimeout(function(){
				flag = true;
			},600)
		}
		
		var changePos = function (index) {
			var posTop = allSection.eq(index).position().top
			mainParent.css('margin-top', '-' +posTop+ 'px');

			if (index > 0) {
				if (!mainParent.hasClass('non-first')) mainParent.addClass('non-first');
				$('.header').addClass('header--fixed');
				$('.logo__fixed').removeClass('hide').siblings().addClass('hide');
				$('.menu__item').eq(index-1).addClass('active').siblings().removeClass('active');
			} else {
				if (mainParent.hasClass('non-first')) mainParent.removeClass('non-first');
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

// функция валидации формы
(function(){

	if ($('[data-validation]').length) {
		initializeValidate();
  }
  
	if($('.form').length) {
		clearForm();
	}

	function clearForm(){
		var inputs = $('.form').find('input, textarea'),
			newVal = '';

		for(i=0;i<inputs.length;i++) {
			inputs.eq(i).val(newVal);
		}
	}

	$('.form__input').each(function() {
		$(this).focus(function() {
				$(this).siblings('.form__label').addClass('hide');
		});
		$(this).blur(function(){
				if(!($(this).val())){
						$(this).siblings('.form__label').removeClass('hide')
				};
		});
	});

	/* Validate Form */
	function initializeValidate() {
		$('[data-validation]').each(function () {
			var validator = $(this),
			inputs = validator.find('input:not(:checkbox, [type=hidden], #order-other), textarea'),
			submit = validator.find('button[type=submit]'),
			stopSubmit = false,
			url = validator.attr('action'),
			data = validator.serializeArray(),
			success = $('[data-remodal-id=success]').remodal();

			validator.on('change keyup', 'input[data-name]', function () {
				var elm = $(this);
				checkValidity(elm);
			});

			submit.on('click', function (e) {
				var mass = [];
				stopSubmit = true;
				for (var i = 0; i < inputs.length; i++) {
					var input = inputs[i];
					mass.push(input);

					if (input.checkValidity() == true) {
						var elm = input;
						checkValidity(elm);
					}

					if ($(input).parent().hasClass('valid')) {
						stopSubmit = false;
					} else {
						stopSubmit = true;
						break;
					}
				}
				e.preventDefault();
				if (!stopSubmit) {
					$.ajax({
						type: 'POST',
						url: url,
						data: data,
					}).done(function() {
						success.open();
						clearForm();
					});
				}
			});
		});
	}

	function checkValidity(elm) {
	    var elm = $(elm),
	        val = elm.val(),
	        block = elm.parent(),
	        name_reg = /^[A-Za-zА-Яа-яЁё\-\s]+$/,
			    text_reg = /^[A-Za-zА-Яа-яёЁ\s\d]/,
	        mail_reg = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i,
	        phone_reg = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11,14}(\s*)?$/,
	        num_reg = /^\d+$/;


	    if (elm.prop('disabled')) {
	        return;
	    } else if (elm.is('[data-name="name"]')) {
	        if (name_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } else if (elm.is('[data-name="email"]')) {
	        if (mail_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } else if (elm.is('[data-name="phone"]')) {
	        if (phone_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } else if (elm.is('[data-name="num"]')) {
	        if (num_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } else if (elm.is('[data-name="text"]')) {
	        if (text_reg.test(val)) {
	            block.removeClass('invalid').addClass('valid');
	        } else {
	            block.removeClass('valid').addClass('invalid');
	        }
	    } 
	}
})();