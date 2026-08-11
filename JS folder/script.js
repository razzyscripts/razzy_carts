// ================= HERO SLIDER =================

const slides = document.querySelectorAll(".hero-slide");
const dots = document.querySelectorAll(".dots span");

let currentSlide = 0;

function showSlide(index){

    slides.forEach((slide)=>{
        slide.classList.remove("active");
    });

    dots.forEach((dot)=>{
        dot.classList.remove("active");
    });

    slides[index].classList.add("active");
    dots[index].classList.add("active");

}

function nextSlide(){

    currentSlide++;

    if(currentSlide >= slides.length){
        currentSlide = 0;
    }

    showSlide(currentSlide);

}

function previousSlide(){

    currentSlide--;

    if(currentSlide < 0){
        currentSlide = slides.length - 1;
    }

    showSlide(currentSlide);

}

// Auto Slide Every 10 Seconds

setInterval(nextSlide,10000);

// Arrow Buttons

document.querySelector(".right").onclick = nextSlide;

document.querySelector(".left").onclick = previousSlide;

// Dot Navigation

dots.forEach((dot,index)=>{

    dot.addEventListener("click",()=>{

        currentSlide = index;

        showSlide(currentSlide);

    });

});