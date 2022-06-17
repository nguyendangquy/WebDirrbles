function Slider(container) {
  this.container = document.querySelector(container);
  this.slides = this.container.getElementsByClassName("mySlides");
  this.dots = this.container.getElementsByClassName("dot");
  this.btnNext = this.container.querySelector(".next");
  this.btnPrev = this.container.querySelector(".prev");
  this.slideIndex = 1;

  this.showSlides = (n) => {
    let { slides, dots } = this;
    if (n > slides.length) {
      this.slideIndex = 1;
    }
    if (n < 1) {
      this.slideIndex = slides.length;
    }
    for (let i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
    slides[this.slideIndex - 1].style.display = "block";
    dots[this.slideIndex - 1].className += " active";
  };

  const plusSlides = (n) => {
    this.showSlides((this.slideIndex += n));
  };

  const currentSlide = (n) => {
    this.showSlides((this.slideIndex = n));
  };

  const autoPlay = (n) => {
    this.slideIndex++;
    this.showSlides(n);
  };
  setInterval(() => {
    autoPlay(this.slideIndex + 1);
  }, 4000);

  this.btnNext.addEventListener("click", () => plusSlides(1));
  this.btnPrev.addEventListener("click", () => plusSlides(-1));

  for (let i = 0; i < this.dots.length; i++) {
    this.dots[i].addEventListener("click", () => {
      currentSlide(i + 1);
    });
  }
}

const bannerSlider = new Slider("#banner");
bannerSlider.showSlides(1);

const bannerSlider2 = new Slider("#banner2");
bannerSlider2.showSlides(1);
