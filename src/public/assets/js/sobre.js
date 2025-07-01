document.addEventListener("DOMContentLoaded", function () {
  const slides = document.querySelectorAll(".slide");
  let index = 0;
  let intervalo;

  function mostrarSlideAtual() {
    slides.forEach(slide => slide.style.display = "none");
    if (slides[index]) slides[index].style.display = "block";
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

  window.mudarSlide = function (n) {
    mostrarSlideManual(index + n);
  };

  // Inicializa o carrossel
  mostrarSlideAtual();
  intervalo = setTimeout(avancarSlide, 3000);
});
