(function ($) {

  var NAME_SPACE = ".carousel-";
  var HIDDEN_CSS_CLASS = "is-hidden";
  var IS_PLAYING_CLASS = "is-playing";
  var IS_PAUSED_CLASS = "is-paused";

  var Carousel = {

    init: function( $context ){

      this._$context = $context;

      this.interval = null;
      this.timeBetweenSlides = 4000; // 4 seconds
      this.currentslide = 1;
      this.numslides = 3; //put how many slides you have here.

      this._initializeUI();


      //Autoplay
      //$context.find("button" + NAME_SPACE + "play").click();

      return this;
    },

    _initializeUI: function(){

      this._$context.find(".carousel-item").not(":nth-of-type(1)").attr("aria-hidden", "true").addClass( HIDDEN_CSS_CLASS );

      this._$context.find(NAME_SPACE + "next").click(this.nextSlide.bind(this));
      this._$context.find(NAME_SPACE + "previous").click(this.previousSlide.bind(this));
      this._$context.find(NAME_SPACE + "pause").click(this.pause.bind(this));
      this._$context.find(NAME_SPACE + "play").click(this.resume.bind(this));

      // add keyboard accessibility for all buttons, enter makes it click...
      this._$context.find(NAME_SPACE + "button").keypress(function (ev) {
        if (ev.which == 13) {
          $(this).click();
          ev.preventDefault();
          return (false);
        }
      });
    },

    resume: function(){

      this._$context.removeClass( IS_PAUSED_CLASS).addClass( IS_PLAYING_CLASS );

      this._$context.find(NAME_SPACE + "next").click();

      this.interval= window.setInterval(function () {
        this._$context.find(NAME_SPACE + "next").click();
      }.bind(this), this.timeBetweenSlides);
    },

    pause: function(ev){

      this._$context.addClass( IS_PAUSED_CLASS).removeClass( IS_PLAYING_CLASS );

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

      this._$context.find("li.carousel-item").attr("aria-hidden", "true").addClass( HIDDEN_CSS_CLASS );

      if (this.currentslide > this.numslides) {
        this.currentslide = 1;
      }
      if (this.currentslide === 0) {
        this.currentslide = this.numslides;
      }

      var slide = this.currentslide - 1;

      this._$context.find("li.carousel-item:eq(" + slide + ")").attr("aria-hidden", "false").removeClass( HIDDEN_CSS_CLASS );
    }
  };

  function initCarousel(){

    Object.create(Carousel).init($(this));
  };

  $(document).ready(function () {

    $(".carousel-container").each(initCarousel);
  });

})(jQuery);