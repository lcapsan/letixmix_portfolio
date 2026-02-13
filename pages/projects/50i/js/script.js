(function($) {

    "use strict";

      // background color when scroll 

  var initScrollNav = function() {
    var scroll = $(window).scrollTop();

    if (scroll >= 200) {
      $('.navbar').addClass("bg-green");
    }else{
      $('.navbar').removeClass("bg-green");
    }
  }

  $(window).scroll(function() {    
    initScrollNav();
  }); 

        $(document).ready(function() { 

             var swiper = new Swiper(".team-swiper", {
                slidesPerView: 3,
                spaceBetween: 30,
                freeMode: true,
                navigation: {
                  nextEl: ".icon-arrow-right",
                  prevEl: ".icon-arrow-left",
                },
                breakpoints: {
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  767: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1299: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                },
              });

              var swiper = new Swiper(".review-swiper", {
                slidesPerView: 3,
                spaceBetween: 30,
                pagination: {
                  el: ".swiper-pagination",
                  clickable: true,
                },
                breakpoints: {
                  0: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                  },
                  767: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  1299: {
                    slidesPerView: 3,
                    spaceBetween: 20,
                  },
                },
              });
              
              AOS.init({
                duration: 2500,
                once: true,
            })

            window.addEventListener("load", (event) => {
              //isotope
           $('.isotope-container').isotope({
             // options
             itemSelector: '.item',
             layoutMode: 'masonry'
             });
     
             
     
             // Initialize Isotope
             var $container = $('.isotope-container').isotope({
                 // options
                 itemSelector: '.item',
                 layoutMode: 'masonry'
             });
     
             $(document).ready(function() {
                 //active button
             $('.filter-button').click(function() {
                 $('.filter-button').removeClass('active');
                 $(this).addClass('active');
                 });
             });
             
             // Filter items on button click
             $('.filter-button').click(function() {
             var filterValue = $(this).attr('data-filter');
             if (filterValue === '*') {
             // Show all items
             $container.isotope({ filter: '*' });
             } else {
             // Show filtered items
             $container.isotope({ filter: filterValue });
             }
             });
     
           });

            // init jarallax parallax
            var initJarallax = function() {
              jarallax(document.querySelectorAll(".jarallax"));

              jarallax(document.querySelectorAll(".jarallax-img"), {
                keepImg: true,
              });
            }
            
            initJarallax();

                                  

        }); // End of a document


    })(jQuery);

function count(data) {
  $.each(data, function(index, item) {
    var counter = { var: 0 };
    $({ countNum: counter.var }).animate({
      countNum: item.value
    }, {
      duration: 3000,
      easing: 'easeInOutCirc',
      step: function() {
        var number = Math.ceil(this.countNum);
        $('.counter').eq(index).html(number);
      },
      complete: function() {
        //count([item]); // reiniciar la animación solo para el conjunto actual
      }
    });
  });
}

// Datos para cada contador
var data = [
  { value: 123 },
  { value: 12 },
  { value: 67 },
  { value: 25 }
];

count(data);

// Función para las cookies
$(document).ready(function() {
    var cookiesAccepted = getCookie("cookies_accepted");
    if (cookiesAccepted === "true" || cookiesAccepted === "false") {
        $("#cookiePopup").hide();
    } else {
        $("#cookiePopup").show();
    }
    
    $(".accept-btn").click(function() {
        document.cookie = "cookies_accepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        $("#cookiePopup").hide();
    });
    
    $(".reject-btn").click(function() {
        document.cookie = "cookies_accepted=false; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        $("#cookiePopup").hide();
    });
});

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

