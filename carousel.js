(function ($) {

  var NAME_SPACE = ".carousel-";
  var HIDDEN_CSS_CLASS = "is-hidden";

  var Carousel = {

    init: function( $context ){

      this.interval = null;
      this.timeBetweenSlides = 4000; // 4 seconds
      this.currentslide = 1;
      this.numslides = 3; //put how many slides you have here.

      this._initializeUI($context);


      //Autoplay
      //$context.find("button" + NAME_SPACE + "play").click();

      return this;
    },

    _initializeUI: function($context){

      $context.find(".carousel-item").not(":nth-of-type(1)").attr("aria-hidden", "true").addClass( HIDDEN_CSS_CLASS );

      $context.find("button" + NAME_SPACE + "next").click(this.nextSlide.bind(this));
      $context.find("button" + NAME_SPACE + "previous").click(this.previousSlide.bind(this));
      $context.find("button" + NAME_SPACE + "pause").click(this.pause.bind(this));
      $context.find("button" + NAME_SPACE + "play").click(this.resume.bind(this));

      // add keyboard accessibility for all buttons, enter makes it click...
      $context.find("button").keypress(function (ev) {
        if (ev.which == 13) {
          $(this).click();
          ev.preventDefault();
          return (false);
        }
      });
    },

    resume: function(){
      this.interval= window.setInterval(function () {
        $("button#next").click();
      }, this.timeBetweenSlides);
    },

    pause: function(ev){
      this.interval = window.clearInterval(this.interval);
      ev.preventDefault();
      return false;
    },

    previousSlide: function(){

      this.currentslide = this.currentslide - 1;
      this.showCurrent();
    },

    nextSlide: function(){

      this.currentslide = this.currentslide + 1;
      this.showCurrent();
    },

    showCurrent: function(){

      $("li.carousel-item").attr("aria-hidden", "true").addClass( HIDDEN_CSS_CLASS );

      if (this.currentslide > this.numslides) {
        this.currentslide = 1;
      }
      if (this.currentslide === 0) {
        this.currentslide = this.numslides;
      }

      var slide = this.currentslide - 1;

      $("li.carousel-item:eq(" + slide + ")").attr("aria-hidden", "false").removeClass( HIDDEN_CSS_CLASS );
    }
  };

  function initCarousel(){

    Object.create(Carousel).init($(this));
  };

  $(document).ready(function () {

    $(".carousel-container").each(initCarousel);
  });

  //$(document).ready(function () {
  //
  //  var myVar;//will be interval timer
  //  var transition_time = 1000, // 1 second
  //    time_between_slides = 4000, // 4 seconds
  //    currentslide = 1,
  //    numslides = 3; //put how many slides you have here.
  //
  //  myVar = setInterval(function () {
  //    $("button#next").click()
  //  }, time_between_slides); // every 4 secs next slide
  //
  //  function showcurrent() {
  //
  //    $("li.carousel-item").attr("aria-hidden", "true").addClass("hidden");
  //
  //    if (currentslide > numslides) {
  //      currentslide = 1;
  //    }
  //    if (currentslide === 0) {
  //      currentslide = numslides;
  //    }
  //
  //    var slide = currentslide - 1;
  //
  //    $("li.carousel-item:eq(" + slide + ")").attr("aria-hidden", "false").removeClass("hidden");
  //  }
  //
  //  $("button#next").click(function () {
  //    currentslide = currentslide + 1;
  //    showcurrent();
  //  });
  //
  //  $("button#prev").click(function () {
  //    currentslide = currentslide - 1;
  //    showcurrent();
  //  });
  //
  //
  //  $("button#pause").click(function (ev) {
  //    myVar = window.clearInterval(myVar);
  //    ev.preventDefault();
  //    return (false);
  //  });
  //
  //  $("button#go").click(function () {
  //    myVar = window.setInterval(function () {
  //      $("button#next").click()
  //    }, time_between_slides);
  //  });
  //
  //  // add keyboard accessibility for all buttons, enter makes it click...
  //  $("button").keypress(function (ev) {
  //    if (ev.which == 13) {
  //      $(this).click();
  //      ev.preventDefault();
  //      return (false);
  //    }
  //  });
  //
  //});

})(jQuery);