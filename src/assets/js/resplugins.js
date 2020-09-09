const restPlugins = () => {
  (function ($) {
    $(function () {
      // console.log('rest plugins')
      $(".enlarge.inline-demo").data("options", {
        button: true,
        hoverZoomWithoutClick: true,
        delay: 200,
        flyout: {
          width: 200,
          height: 200
        },
        placement: "inline",
        magnification: 5
      });
//
//
      $(document).bind("enhance", function () {
        $("body").addClass("enhanced");
      });

      $(document).trigger("enhance");
    });
  }(jQuery));
//
// const init_map = () => {
//   var var_location = new google.maps.LatLng(-6.7705459, -79.8395662);
//   var var_mapoptions = {
//     center: var_location,
//     zoom: 19
//   };
//   var var_marker = new google.maps.Marker({
//     position: var_location,
//     map: var_map,
//     title: " Vicente de la Vega 800 - Tienda 04, Chiclayo"
//   });
//   var var_map = new google.maps.Map(document.getElementById("map-container"),
//     var_mapoptions);
//   var_marker.setMap(var_map);
// }

// google.maps.event.addDomListener(window, 'load', init_map);

  $('.carousel-time-multi').carousel({
    interval: 9000000
  });

  $('#myModal').modal({
    crolling: false
  });


  objectFitImages();
  /* init Jarallax */
  jarallax(document.querySelectorAll('.jarallax'));
  jarallax(document.querySelectorAll('.jarallax-keep-img'), {
    keepImg: true,
  });

  <!--CAROUSEL DE PRODUCTOS NUEVA COLECCION-->
  $('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    navText: [
      "<i class='fas fa-chevron-left text-color-next-prev'></i>",
      "<i class='fas fa-chevron-right text-color-next-prev'></i>"
    ],
    autoplay: true,
    autoplayHoverPause: true,
    autoplayTimeout: 3000,
    responsive: {
      0: {
        items: 1
      },
      576: {
        items: 1
      },
      640: {
        items: 2
      },
      768: {
        items: 1
      },
      992: {
        items: 2
      },
      1200: {
        items: 2
      },
    }
  });

  <!--CAROUSEL MARCAS-->
  $('.bxslider').bxSlider({
    auto: true,
    slideWidth: 210,
    controls: false,
    moveSlides: 1,
    pager: false,
    minSlides: 2,
    maxSlides: 6,
    responsive: true,
    speed: 500,
    pause: 1000,
    touchEnabled: false,
    preloadImages: 'visible'
  });


  <!--VELOCIDAD CAROUSEL MDB-->
  $('.carousel-time').carousel({
    interval: 1900
  });

  <!--TOOLTIP-->
  $(function () {
    $('[data-toggle="tooltip"]').tooltip()
  });

  <!-- CHAT WIDGET -->

  (function () {
    var options = {
      facebook: "1107143302724514", // Facebook page ID
      company_logo_url: "//scontent.flim5-4.fna.fbcdn.net/v/t1.0-9/21768359_1232891180149725_4117141583066308901_n.jpg?_nc_cat=102&_nc_eui2=AeHuGMUpYS7O8_tQmbcxTiuqrekuX7XVlXRn5-cp49aQqyE5qa1o-j7IiFQ0Q95V7jHAf8aI2sGzuYqQcWE9ScRUMKRSLvSdq6iFtiW8PW5hZg&_nc_ht=scontent.flim5-4.fna&oh=58a9fa5d2f9688cc72cd0234a2a5446c&oe=5D42E8C2", // URL of company logo (png, jpg, gif)
      greeting_message: "¿Hola en que podémos ayudarte?", // Text of greeting message
      call_to_action: "¡Chat Online!", // Call to action
      position: "right", // Position may be 'right' or 'left'
    };
    var proto = document.location.protocol, host = "whatshelp.io", url = proto + "//static." + host;
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = url + '/widget-send-button/js/init.js';
    s.onload = function () {
      WhWidgetSendButton.init(host, proto, options);
    };
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
  })();

  <!-- MARQUESILLA -->
  $('#anuncio').modal('show');

  <!--BUSQUEDA-->
  // $(function () {
  //   //autocomplete
  //   $(".auto").autocomplete({
  //     source: "search.php",
  //     minLength: 1
  //   });
  // });

  function Suscripcion() {
    var email = document.getElementById('suscripcion').value;
    $.get("cVenta.php", {opcion: "iSuscripcion", email: email})
      .done(function (data) {
        if (data !== '0') {
          swal("Gracias por tu preferencia!", "Tu dirección de correo se ha registrado!", "success");
        } else {
          swal("Correo Electrónico Registrado!", "La información ya fue registrada!", "success");
        }
      });
    document.getElementById('suscripcion').value = '';
  }

  <!--FIN BUSQUEDA-->


  <!--STICKY-->
  $(function () {
    $(".sticky-anuncio").sticky({
      topSpacing: 0
      , zIndex: 2
    });
  });

  $(function () {
    $(".sticky-nav-img").sticky({
      topSpacing: 32
      , zIndex: 3
    });
  });
  $(function () {
    $(".sticky-nav").sticky({
      topSpacing: 105
      , zIndex: 2
    });
  });
  $(function () {
    $(".sticky-full").sticky({
      topSpacing: 0
      , zIndex: 2
    });
  });

//   <!--CAROUSEL OPINIONES-->
  $('.carousel-opinion').carousel({
    interval: 8000,
    pause: 'hover'
  });

  $('a.page-scroll').bind('click', function (event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top - 149)
    }, 1250, 'easeInOutExpo');
    event.preventDefault();
  });
  $('body').scrollspy({
    target: '.navbar-fixed-top',
    offset: 51
  });
  // $('.navbar-collapse ul li a').click(function () {
  //   $('.navbar-toggler:visible').click();
  // });
  // $('#mainNav').affix({
  //   offset: {
  //     top: 100
  //   }
  // });


}


const detailPluging = () => {
  $('.zoom-img_ms').zoom();
  $('.carousel-pause').carousel(
    {
      interval: 900000
    });
}
