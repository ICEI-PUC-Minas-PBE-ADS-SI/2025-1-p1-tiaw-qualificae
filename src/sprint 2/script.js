const slides = document.querySelectorAll(".slide");
let index = 0;
let intervalo;

function mostrarSlideAtual() {
  slides.forEach(slide => slide.style.display = "none");
  slides[index].style.display = "block";
}

function mostrarSlideManual(i) {
  clearTimeout(intervalo);
  index = (i + slides.length) % slides.length;
  mostrarSlideAtual();
  intervalo = setTimeout(avancarSlide, 3000);
}

function avancarSlide() {
  index = (index + 1) % slides.length;
  mostrarSlideAtual();
  intervalo = setTimeout(avancarSlide, 3000);
}

function mudarSlide(n) {
  mostrarSlideManual(index + n);
}

mostrarSlideAtual();
intervalo = setTimeout(avancarSlide, 3000);


