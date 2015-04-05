(function ($) {

  var NAME_SPACE = ".carousel-";
  var HIDDEN_CSS_CLASS = "is-hidden";
  var IS_PLAYING_CLASS = "is-playing";
  var IS_PAUSED_CLASS = "is-paused";

  /**
   *
   * @type {{init: Function, _initializeUI: Function, resume: Function, pause: Function, previousSlide: Function, nextSlide: Function, _showCurrent: Function}}
   */
  var Carousel = {

    /**
     * @descritpion Initializes carousel.
     * @param $context jQuery DOM context for widget
     * @returns {Carousel}
     */
    init: function( $context ){

      this._$context = $context;
      var delayInSeconds = this._$context.data("delay");
      this.timeBetweenSlides = (typeof delayInSeconds === "number") ? ( delayInSeconds * 1000 ) : 4000;
      this.interval = null;
      this.currentslide = 1;
      this.numslides = this._$context.find(".carousel-item").length;
      this._initializeUI();

      return this;
    },

    _initializeUI: function(){

      this._$context.find(".carousel-item").not(":nth-of-type(1)").attr("aria-hidden", "true").addClass( HIDDEN_CSS_CLASS );

      this._$context.find(NAME_SPACE + "next").click(this.nextSlide.bind(this));
      this._$context.find(NAME_SPACE + "previous").click(this.previousSlide.bind(this));
      this._$context.find(NAME_SPACE + "pause").click(this.pause.bind(this));
      this._$context.find(NAME_SPACE + "play").click(this.resume.bind(this));

      // Add keyboard accessibility for all buttons, enter makes it click...
      var handleButtonClick = function (ev) {
        if (ev.which == 13) {
          $(this).click();
          ev.preventDefault();
          return (false);
        }
      };

      this._$context.find(NAME_SPACE + "button").keypress(handleButtonClick);

      if( this._$context.data("autoplay") === true ){

        this.resume();
      }
    },

    /**
     * @description Resumes playing the carousel
     */
    resume: function(ev){

      this._$context.removeClass( IS_PAUSED_CLASS).addClass( IS_PLAYING_CLASS );

      if( ev && ( ev.type === "click" || ev.type === "keypress") ){

        //Set focus to the pause button now that the play button is hidden
        this._$context.find(NAME_SPACE + "pause").focus();
      }

      this.interval= window.setInterval(function () {
        this.currentslide = this.currentslide + 1;
        this._showCurrent();
      }.bind(this), this.timeBetweenSlides);
    },

    /**
     * @description Pauses execution of the carousel
     * @param ev jQuery event
     * @param ignoreSettingFocusToPlayButton optional parameter that can be used to NOT set the focus to the play button
     * @returns {boolean}
     */
    pause: function(ev, ignoreSettingFocusToPlayButton){

      ignoreSettingFocusToPlayButton = (typeof ignoreSettingFocusToPlayButton === "boolean" ) ? ignoreSettingFocusToPlayButton : false;

      this._$context.addClass( IS_PAUSED_CLASS).removeClass( IS_PLAYING_CLASS );

      if( ev && ( ev.type === "click" || ev.type === "keypress") && ignoreSettingFocusToPlayButton === false ){

        //Set focus to the play button now that the pause button is hidden
        this._$context.find(NAME_SPACE + "play").focus();
      }

      this.interval = window.clearInterval(this.interval);
      ev.preventDefault();
      return false;
    },

    /**
     * @description Pauses execution and shifts carousel to previous slide
     */
    previousSlide: function(ev){

      this.pause(ev, true);

      this.currentslide = this.currentslide - 1;
      this._showCurrent();
    },

    /**
     * @description Pauses execution and shifts carousel to next slide
     */
    nextSlide: function(ev){

      this.pause(ev, true);

      this.currentslide = this.currentslide + 1;
      this._showCurrent();
    },

    /**
     * @description Manipulates the DOM to hide and show the appropriate slide
     */
    _showCurrent: function(){

      this._$context.find(".carousel-item").attr("aria-hidden", "true").addClass( HIDDEN_CSS_CLASS );

      if (this.currentslide > this.numslides) {
        this.currentslide = 1;
      }
      if (this.currentslide === 0) {
        this.currentslide = this.numslides;
      }

      var slide = this.currentslide - 1;

      this._$context.find(".carousel-item:eq(" + slide + ")").attr("aria-hidden", "false").removeClass( HIDDEN_CSS_CLASS );
    }
  };

  function initCarousel(){

    Object.create(Carousel).init($(this));
  };

  $(document).ready(function () {

    $(".carousel-container").each(initCarousel);
  });

})(jQuery);