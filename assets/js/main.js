/* =================================
------------------------------------
	Letixmix portfolio
	Version: 1.0
 ------------------------------------ 
 ====================================*/

/* ========= LOAD COMPONENT ========= */
async function loadComponent(id, path, callback) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Error loading ${path}`);
    el.innerHTML = await res.text();
    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
}

/* ========= HEADER ========= */
loadComponent("header-placeholder", "/components/header.html", () => {

  /* Active menu item */
  const links = document.querySelectorAll(".main-menu a");
  const currentPage =
    window.location.pathname.split("/").pop() || "index.html";

  links.forEach(link => {
    const linkHref = link.getAttribute("href").split("/").pop();
    if (linkHref === currentPage) {
      link.classList.add("main-menu-active");
    }
  });

  /* Mobile menu */
  $('.nav-switch').on('click', function (e) {
    e.preventDefault();
    $('.main-menu').slideToggle(300);
  });
});

/* ========= FOOTER ========= */
loadComponent("footer-placeholder", "/components/footer.html", () => {
  const yearEl = document.getElementById("current-year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
});


loadComponent("portfolio-placeholder", "../components/portfolio.html", () => {
    $('.portfolios-area').magnificPopup({
        delegate: 'a.portfolio-item',
        type: 'image',
        gallery: {
            enabled: true
        },
        mainClass: 'img-popup-warp',
        removalDelay: 400
    });
});

$(document).ready(function () {

  if ($('.portfolios-area').length) {
    $('.portfolios-area').magnificPopup({
      delegate: 'a.portfolio-thumb',
      type: 'image',

      gallery: {
        enabled: true,
        navigateByImgClick: true,
        preload: [0, 2] // carga la anterior y la siguiente
      },

      mainClass: 'img-popup-warp',
      removalDelay: 300,
      closeOnContentClick: false,
      fixedContentPos: false
    });
  }


});


'use strict';


$(window).on('load', function() { 
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut(); 
	$("#preloder").delay(400).fadeOut("slow");

	if($('.portfolios-area').length > 0 ) {
		var containerEl = document.querySelector('.portfolios-area');
		var mixer = mixitup(containerEl);
	}

});


(function($) {

	/*------------------
		Navigation
	--------------------*/
	/*
	$('.nav-switch').on('click', function(event) {
		$('.main-menu').slideToggle(400);
		event.preventDefault();
	});
*/


	/*------------------
		Background set
	--------------------*/
	/*
	$('.set-bg').each(function() {
		var bg = $(this).data('setbg');
		$(this).css('background-image', 'url(' + bg + ')');
	});*/



	/*----------------------
		Portfolio layout
	------------------------*/
	var port_fi =  $('.portfolios-area .first-item'),
		port_si =  $('.portfolios-area .second-item'),
		port_intro_h =  $('.portfolio-intro').innerHeight();

	if ($(window).width() > 991) {
		port_fi.appendTo('.portfolio-intro');
		port_si.find('.portfolio-item').height(port_intro_h + 601);
	}

	$('.portfolio-item.pi-style2').each(function() {
		var pi_width = $(this).width();
		$(this).height(pi_width + 50);
	});


	/*------------------
		Accordions
	--------------------*/
	$('.panel-link').on('click', function (e) {
		$('.panel-link').parent('.panel-header').removeClass('active');
		var $this = $(this).parent('.panel-header');
		if (!$this.hasClass('active')) {
			$this.addClass('active');
		}
		e.preventDefault();
	});


if($().circleProgress){

	//Set progress circle 1
	$("#progress1").circleProgress({
		value: 0.8,
		size: 146,
		thickness: 6,
		fill: "#979797",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
	//Set progress circle 2
	$("#progress2").circleProgress({
		value: 0.75,
		size: 146,
		thickness: 6,
		fill: "#979797",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
	//Set progress circle 3
	$("#progress3").circleProgress({
		value: 0.7,
		size: 146,
		thickness: 6,
		fill: "#979797",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
	//Set progress circle 4
	$("#progress4").circleProgress({
		value: 0.5,
		size: 146,
		thickness: 6,
		fill: "#979797",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
	//Set progress circle 5
	$("#progress5").circleProgress({
		value: 0.8,
		size: 146,
		thickness: 6,
		fill: "#979797",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
	//Set progress circle 6
	$("#progress6").circleProgress({
		value: 0.8,
		size: 146,
		thickness: 6,
		fill: "#979797",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
	//Set progress circle 7
	$("#progress7").circleProgress({
		value: 0.7,
		size: 146,
		thickness: 6,
		fill: "#979797",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
	//Set progress circle 8
	$("#progress8").circleProgress({
		value: 0.6,
		size: 146,
		thickness: 6,
		fill: "#979797",
		emptyFill: "rgba(0, 0, 0, 0)"
	});
}

})(jQuery);