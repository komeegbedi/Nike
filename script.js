
const indicators = document.querySelectorAll('.slider-indicators button');
const sliderInner = document.querySelectorAll('.slider-inner .slider-item');
let menubtn = document.querySelector('.menu #nav-icon3');
let navBar = document.querySelector('div.collapse.navbar-collapse');
let header = document.querySelector('nav.fixed-top');
let navLinks = document.querySelectorAll("ul.navbar-nav li a");
let logo = document.querySelector('.navbar-brand svg');
let sticky = header.offsetTop + 350;
let currentIndex = 0;
let interval;


//this function changes the slider image
const changeSliderActive = (index) =>{
    

    //first start by removing the current animation classes
    sliderInner[currentIndex].querySelector('h5.shoe-name').classList.remove('animate__slideInDown');
    sliderInner[currentIndex].querySelector('img').classList.remove('animate', 'animate__slideRight');
    sliderInner[currentIndex].querySelector('.bottom-text').classList.remove('animate__slideInUp');

    //then we add a fadeout animation in order to fade out smoothly 
    sliderInner[currentIndex].querySelector('h5.shoe-name').classList.add('animate__fadeOutLeft');
    sliderInner[currentIndex].querySelector('img').classList.add('animate__animated','animate__fadeOutLeft');
    sliderInner[currentIndex].querySelector('.bottom-text').classList.add('animate__fadeOutLeft');
    indicators[currentIndex].classList.remove('active');
    

    //since the fadeout animation takes 1s to finish, we want to wait for that animation to be done before we slide in the next image
    setTimeout(() => {

        sliderInner[currentIndex].classList.remove('active');

        //remove the fadeout animation 
        sliderInner[currentIndex].querySelector('h5.shoe-name').classList.remove('animate__fadeOutLeft');
        sliderInner[currentIndex].querySelector('img').classList.remove('animate__animated', 'animate__fadeOutLeft');
        sliderInner[currentIndex].querySelector('.bottom-text').classList.remove('animate__fadeOutLeft');


        //move to the next image and add the animation to slideIn

        currentIndex = index === undefined ? (currentIndex + 1) % indicators.length : index - 1;

        indicators[currentIndex].classList.add('active');
        sliderInner[currentIndex].classList.add('active');

        sliderInner[currentIndex].querySelector('h5.shoe-name').classList.add('animate__animated', 'animate__slideInDown');
        sliderInner[currentIndex].querySelector('img').classList.add('animate', 'animate__slideRight');
      
        sliderInner[currentIndex].querySelector('.bottom-text').classList.add('animate__animated', 'animate__slideInUp');
    }, 1000);
}


//this function controls the header to be fixed on scroll (only on screens with width > 992 px)
const fixedOnScroll = () => {

    if (window.pageYOffset > sticky && innerWidth > 992) {

        header.style.background = "#fff";
        logo.style.fill = "#000";

        navLinks.forEach(link => {
            link.style.color = "#000";
        });

    } else if (innerWidth > 992) {
        
        header.style.background = "transparent";
        logo.style.fill = "#fff";

        navLinks.forEach(link => {
            link.style.color = "#fff";
        });
    }
}

const startInterval = () => {

    interval = setInterval(() => {

        changeSliderActive();

    }, 5000);
}

indicators.forEach(btn => {
    btn.addEventListener('click' , () => {

        let index = parseInt(btn.getAttribute('data-target'));
        changeSliderActive(index);

        clearInterval(interval);

        setTimeout(() => {
            startInterval();
        }, 2500);

    });
});


menubtn.addEventListener('click' , () => {

    menubtn.classList.toggle('open');
    navBar.classList.toggle('show');
});


startInterval();

onscroll = function () {
    fixedOnScroll();
}

