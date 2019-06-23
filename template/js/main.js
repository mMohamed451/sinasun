$(function () {
  "use strict";

  //------- Parallax -------//
  skrollr.init({
    forceHeight: false
  });

  //------- Active Nice Select --------//
  $('select').niceSelect();

  //------- hero carousel -------//
  $(".hero-carousel").owlCarousel({
    items: 3,
    margin: 10,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: false,
    dots: false,
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      810: {
        items: 3
      }
    }
  });

  //------- Best Seller Carousel -------//
  if ($('.owl-carousel').length > 0) {
    $('#bestSellerCarousel').owlCarousel({
      loop: true,
      margin: 30,
      nav: true,
      navText: ["<i class='ti-arrow-left'></i>", "<i class='ti-arrow-right'></i>"],
      dots: false,
      responsive: {
        0: {
          items: 1
        },
        600: {
          items: 2
        },
        900: {
          items: 3
        },
        1130: {
          items: 4
        }
      }
    })
  }

  //------- single product area carousel -------//
  $(".s_Product_carousel").owlCarousel({
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    loop: true,
    nav: false,
    dots: false
  });

  //------- mailchimp --------//  
  function mailChimp() {
    $('#mc_embed_signup').find('form').ajaxChimp();
  }
  mailChimp();

  //------- fixed navbar --------//  
  $(window).scroll(function () {
    var sticky = $('.header_area'),
      scroll = $(window).scrollTop();

    if (scroll >= 100) sticky.addClass('fixed');
    else sticky.removeClass('fixed');
  });

  //------- Price Range slider -------//
  if (document.getElementById("price-range")) {

    var nonLinearSlider = document.getElementById('price-range');

    noUiSlider.create(nonLinearSlider, {
      connect: true,
      behaviour: 'tap',
      start: [500, 4000],
      range: {
        // Starting at 500, step the value by 500,
        // until 4000 is reached. From there, step by 1000.
        'min': [0],
        '10%': [500, 500],
        '50%': [4000, 1000],
        'max': [10000]
      }
    });


    var nodes = [
      document.getElementById('lower-value'), // 0
      document.getElementById('upper-value') // 1
    ];

    // Display the slider value and how far the handle moved
    // from the left edge of the slider.
    nonLinearSlider.noUiSlider.on('update', function (values, handle, unencoded, isTap, positions) {
      nodes[handle].innerHTML = values[handle];
    });

  }

});

//getting data from the backend


var xhr = new XMLHttpRequest();
(function MyFunc() {

  xhr.open('GET', `http://localhost:3000/getproductswithouttoken`, true);
  xhr.onload = function (x) {
    const response = JSON.parse(xhr.response);
    console.log('response', response);
    response.forEach(element => {
      document.getElementById('test').innerHTML +=
        `
            
               
                <div class="col-md-6 col-lg-4 ${element.category}">
                <div class="card text-center card-product">
                  <div class="card-product__img">
                    <img class="card-img" src="../backend/public/uploads/${element.url}" alt="">
                    <ul class="card-product__imgOverlay">
                      <li><button><i class="ti-search"></i></button></li>
                      <li><button><i class="ti-shopping-cart"></i></button></li>
                      <li><button><i class="ti-heart"></i></button></li>
                    </ul>
                  </div>
                  <div class="card-body">
                    <p>${element.category}</p>
                    <h4 class="card-product__title"><a href="#">${element.name}</a></h4>
                  </div>
                </div>
              </div>

 
`;
    });
  }

  xhr.send();

})();

function sortedWithCategoryHoney() {
  $('.OLIVES').hide();
  $('.DATES').hide();
  $('.HONEY').show();
  $('.OTHERS').hide();


}

function sortedWithCategoryDates() {
  $('.OLIVES').hide();
  $('.HONEY').hide();
  $('.DATES').show();
  $('.OTHERS').hide();


}

function sortedWithCategoryPickledOils() {
  $('.DATES').hide();
  $('.HONEY').hide();
  $('.OLIVES').show();
  $('.OTHERS').hide();


}

function showAll() {
  $('.DATES').show();
  $('.HONEY').show();
  $('.OLIVES').show();
  $('.OTHERS').show();

}

function sortedWithCategoryOthers() {
  $('.DATES').hide();
  $('.HONEY').hide();
  $('.OLIVES').hide();
  $('.OTHERS').show();
}