$(document).ready(function(){

	function scroll(scrollLink, speed){
		$('html, body').animate({
			scrollTop: scrollLink.offset().top
		}, speed);
		return false;
	}
	$('.anchor').click(function(e){
		const href = $(this).attr('data-href');
		e.preventDefault();
		scroll($(href), 1500);
	});

	// Collapse

		$(".collapse__group.active").find(".collapse__group-body").slideDown();

		$('.collapse').on('click', '.collapse__group-header', function(){
			var collapseInner = $(this).parents('.collapse').find('.collapse__group');

			$(this)
				.parent()
				.toggleClass('active');

			$(this)
				.next()
				.slideToggle('slow');

			collapseInner
				.not($(this).parent())
				.removeClass('active');

			collapseInner
				.children('.collapse__group-body')
				.not($(this).next())
				.slideUp("slow");

		});
	// Tabs
		$('[data-action="tab"]').click(function(){			
			// Tab links toggle class
				$(this).closest(".tabs__list").children("li").removeClass('active');
				$(this).parent().addClass('active');
			// Show tab content
				var tabTarget = $(this).attr('data-target');
				$(tabTarget).fadeIn(0);
				$(".tabs__content > div").not($(tabTarget)).fadeOut(0);
		});

	var $navigationLinks = $('#js-navigation-menu > li > a');
	// cache (in reversed order) the sections
	var $sections = $($("section").get().reverse());

	// map each section id to their corresponding navigation link
	var sectionIdTonavigationLink = {};
	$sections.each(function() {
			var id = $(this).attr('id');
			sectionIdTonavigationLink[id] = $('#js-navigation-menu > li > a[href=\\#' + id + ']');
	});

	// throttle function, enforces a minimum time interval
	function throttle(fn, interval) {
		var lastCall, timeoutId;
		return function () {
			var now = new Date().getTime();
			if (lastCall && now < (lastCall + interval) ) {
					// if we are inside the interval we wait
					clearTimeout(timeoutId);
					timeoutId = setTimeout(function () {
							lastCall = now;
							fn.call();
					}, interval - (now - lastCall) );
			} else {
					// otherwise, we directly call the function 
					lastCall = now;
					fn.call();
			}
		};
	}

	function highlightNavigation() {
		// get the current vertical position of the scroll bar
		var scrollPosition = $(window).scrollTop();

		// iterate the sections
		$sections.each(function() {
				var currentSection = $(this);
				// get the position of the section
				var sectionTop = currentSection.offset().top;

				// if the user has scrolled over the top of the section  
				if (scrollPosition >= sectionTop - 200) {
					// get the section id
					var id = currentSection.attr('id');
					// get the corresponding navigation link
					var $navigationLink = sectionIdTonavigationLink[id];
					// if the link is not active
					if (!$navigationLink.hasClass('active')) {
							// remove .active class from all the links
							$navigationLinks.removeClass('active');
							// add .active class to the current link
							$navigationLink.addClass('active');
					}
					// we have found our section, so we return false to exit the each loop
					return false;
				}
		});
	}
	throttle(highlightNavigation, 100);
	$(window).scroll( throttle(highlightNavigation,100) );

	$('.reviews-carousel').slick({
	  centerMode: true,
	  centerPadding: '60px',
	  slidesToShow: 3,
	  arrows: true,
	  responsive: [
	    {
	      breakpoint: 768,
	      settings: {
	        centerMode: true,
	        centerPadding: '40px',
	        slidesToShow: 1
	      }
	    },
	    {
	      breakpoint: 480,
	      settings: {
	        centerMode: false,
	        centerPadding: '20px',
	        slidesToShow: 1
	      }
	    }
	  ]
	});

	// Set date
	function getMonthName(month) {
		const monthList = ["Января", "Февраля", "Марта", "Апреля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
		return monthList[month];
	}
	function setDateToBlocks() {
		const today = new Date();
		const hours = today.getHours();
		const day = today.getDate();
		const month = today.getMonth();
		const nextCourse = 3;

		let dayOneText;
		let dayTwoText;
		let monthText;

		if ( hours >= 19 && hours <= 24 ) {
			dayOneText = day + 1;
		} else {
			dayOneText = day;
		}

		dayTwoText = dayOneText + nextCourse;
		monthText = getMonthName(month);

		$('.js-day-one').html(dayOneText);
		$('.js-day-two').html(dayTwoText);
		$('.js-month').html(monthText);
	}

	setDateToBlocks();

	$('.registration__form .control').attr('for', 'option2');
	$('.registration__form input[type="checkbox"]')
		.attr('id', 'option2')
		.attr('name', 'option2');

	$('.js-toggle-phone-wrapper input[type="checkbox"]').each(function(){
		$(this).change(function(){
			const that = $(this);
			const phone = $(this).closest('form').find('.js-form-phone-wrapper');
			if (this.checked) {
	      phone.removeClass('form__row_hidden');
	      setTimeout(function(){
	      	phone.find('input').focus();
	      }, 200);
	    } else {
	    	phone.addClass('form__row_hidden');
	    }
		});
	});

	$('input[name="__gc__internal__form__helper"]').val(window.location.href);
});	