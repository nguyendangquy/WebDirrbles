let slideIndex = 1;

showSlides(slideIndex);

function autoPlay(n) {
  slideIndex++;
  console.log(n);
  showSlides(n);
}

setInterval(() => {
  autoPlay(slideIndex + 1);
}, 4000);

function plusSlide(n) {
  showSlides((slideIndex += n));
}

function currentSlides(n) {
  if (n == -1) {
    slideIndex = slideIndex - 1;
  } else if (n == 0) {
    slideIndex = slideIndex + 1;
  } else {
    slideIndex = n;
  }
  showSlides(slideIndex);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("slideshow-item");
  let dots = document.getElementsByClassName("slideshow-dots-item");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
  // console.log(slideIndex);
}
let dots = document.getElementsByClassName("slideshow-dots-item");

for (let i = 0; i < dots.length; i++) {
  dots[i].addEventListener("click", () => {
    currentSlides(i + 1);
  });
}
