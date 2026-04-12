/* =================================
------------------------------------
	Letixmix portfolio
	Version: 1.0
 ------------------------------------ 
 ====================================*/

/* ========= TRANSLATIONS ========= */

let translations = {};
let currentLang = 'es';

async function loadTranslations() {
  try {
    const res = await fetch('/translations.json');
    translations = await res.json();

    const savedLang = localStorage.getItem('lang');
    const browserLang = navigator.language.startsWith('en') ? 'en' : 'es';

    setLang(savedLang || browserLang);
  } catch (error) {
    console.error('Error loading translations:', error);
  }
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);

  document.body.style.opacity = 0.8;

  applyTranslations();

  setTimeout(() => {
    document.body.style.opacity = 1;
  }, 150);
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');

    if (translations[currentLang] && translations[currentLang][key]) {
      // Si tiene el atributo data-i18n-html, usar innerHTML
      if (el.hasAttribute('data-i18n-html')) {
        el.innerHTML = translations[currentLang][key];
      } else {
        el.textContent = translations[currentLang][key];
      }
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (translations[currentLang] && translations[currentLang][key]) {
		  el.placeholder = translations[currentLang][key];
		}
  });

  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    const key = el.getAttribute('data-i18n-title');
    if (translations[currentLang] && translations[currentLang][key]) {
		  el.title = translations[currentLang][key];
		}
  });
}

loadTranslations().then(() => {
  initApp();
});

function initApp() {

  /* ========= HEADER ========= */
  loadComponent("header-placeholder", "/components/header.html", () => {
    
    // Aplicar traducciones al contenido cargado
    applyTranslations();

    // Active menu item
    const links = document.querySelectorAll(".main-menu a");
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    links.forEach(link => {
        const linkHref = link.getAttribute("href").split("/").pop();
        if (linkHref === currentPage) link.classList.add("main-menu-active");
    });

    // Mobile menu
    $('.nav-switch').on('click', function (e) {
        e.preventDefault();
        $('.main-menu').slideToggle(300);
    });

    // Botones de idioma
    document.querySelectorAll('.lang-btn').forEach(btn => {
        const lang = btn.getAttribute('data-lang');

        // Marcar activo al cargar
        if(lang === currentLang) btn.classList.add('active');

        // Listener para cambiar idioma
        btn.addEventListener('click', () => {
            setLang(lang);

            // Actualizar clase active
            document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

});

  /* ========= FOOTER ========= */
  loadComponent("footer-placeholder", "/components/footer.html", () => {

    const yearEl = document.getElementById("current-year");
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }

    const currentPage =
      window.location.pathname.split("/").pop();

    if (currentPage === "" || currentPage === "index.html"|| currentPage === "contact.html") {
      document.querySelector(".footer-section").classList.add("fixed-footer");
      document.body.classList.add("home");
    }

  });

  /* ========= PORTFOLIO ========= */
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

}

/* ========= LOAD COMPONENT ========= */
async function loadComponent(id, path, callback) {
  const el = document.getElementById(id);
  if (!el) return;

  try {
    const res = await fetch(path);
    if (!res.ok) throw new Error(`Error loading ${path}`);
    el.innerHTML = await res.text();

    applyTranslations();

    if (callback) callback();
  } catch (error) {
    console.error(error);
  }
}

$(document).ready(function () {

  if ($('.portfolios-area').length > 0) {
  var containerEl = document.querySelector('.portfolios-area');
  var mixer = mixitup(containerEl, {
    callbacks: {
      onMixStart: function() {
        containerEl.classList.remove('mix-loading');
      }
    },
    load: {
      filter: 'all'
    }
  });

  // Fallback por si el callback no se dispara
  setTimeout(function() {
    containerEl.classList.remove('mix-loading');
  }, 500);
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
	// Mobile menu
$('.nav-switch').on('click', function(e) {
  e.preventDefault();
  $('#main-nav').toggleClass('open');
});


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