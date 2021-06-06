// slick slider jquery
$('.slider-one').slick({
    dots: false,
    infinite: true,
    speed: 1100,
    slidesToShow: 4,
    slidesToScroll: 4,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [{
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    ]
});


// players slider

const container = document.querySelector('.players-slide'),
    slider = document.querySelector('.player-inner-slider');

// Keep track of user's mouseup and down
let isPressedDown = false;

// x horizontal space of inner container
let cursorXspace;

container.addEventListener('mousedown', (e) => {
    isPressedDown = true;

    cursorXspace = e.offsetX - slider.offsetLeft;
    container.style.cursor = 'grabbing'
});

container.addEventListener('mouseup', () => {
    container.style.cursor = 'grab';
})

window.addEventListener('mouseup', () => {
        isPressedDown = false;
    })
    // This function moves the slider 
container.addEventListener('mousemove', (e) => {
    e.preventDefault();

    if (!isPressedDown) return;

    slider.style.left = `${e.offsetX - cursorXspace}px`;
    boundCards();
});

function boundCards() {
    const container__rect = container.getBoundingClientRect();
    const slider__rect = slider.getBoundingClientRect();

    if (parseInt(slider.style.left) > 0) {

        slider.style.left = 0;

    } else if (slider__rect.right < container__rect.right) {
        slider.style.left = `-${slider__rect.width - container__rect.width}px`;
        // console.log(`${slider__rect.width - container__rect.width}px`);
    }
}


// fetching imgs from football api for latest news section

const newCardEl = document.querySelector('.latest-news-cards');
let cardImg;

function getData() {
    const option = {
        url: "https://free-football-soccer-videos.p.rapidapi.com/",
        method: 'GET',
        headers: {
            "x-rapidapi-key": "aaf9d55d6dmshd6a2dc87e648964p11f8a8jsn5533666c75b0",
            "x-rapidapi-host": "free-football-soccer-videos.p.rapidapi.com"
        }
    }
    axios.request(option).then(res => {
        cardImg = res.data;
        const cut = cardImg.slice(5, 9);
        showOutput(cut)
    }).catch(err => console.log(err));
}

// showing images in the DOM
function showOutput(imgs) {
    const allImgs = imgs.map((img) => {
        return newCardEl.innerHTML += `
    <div class="card">
            <img src="${img.thumbnail}" alt="" class="img-top">
        <div class="card-body py-0">
            <div class="card-hdtxt">
                <small>AWARDS FOOTBALL</small>
                <h5 class="fw-bolder">The end for a great tournament in baseball world</h5>
            </div>
                <p>
                Loogy tapper win off-speed run batted in designated hitter helmet save. No decision left on base bases loaded walk off steal bunt bleeder
                </p>
            </div>
    </div>
`
    }).join('')

    return allImgs;
}

getData();


// navbar items

const humbarger = document.querySelector('.humburger');
const nav_closebtn = document.querySelector('.nav-closebtn');
const closeBtnsLIne = document.querySelectorAll('.lines');

const mainMenu = document.querySelector('.main-menu');
const overlay = document.querySelector('.overlay');
const header = document.querySelector('.header');
const logoMain = document.querySelectorAll(".logo-main");

const navLinks = document.querySelectorAll('.main-menu .nav-link');

window.addEventListener('scroll', () => {
    // adding bacground color to the top header
    header.classList.toggle('sticky', scrollY > 500);
    humbarger.classList.toggle('sticky', scrollY > 500);
    //   Adding color to navlinks
    navLinks.forEach((links) => links.classList.toggle('linkColors', scrollY > 500));
    // changing style on logo
    logoMain.forEach((log) => {
        log.classList.add('sticky', scrollY > 500);
        if (scrollY === 0) {
            log.classList.remove('sticky');
        }
    });
});

// humburger button
humbarger.addEventListener('click', () => {
    addStyle();
    navLinks.forEach((links) => {
        if (links.classList.contains('linkColors')) {
            links.classList.remove('linkColors')
        }
    })
});

// navbar closing button

nav_closebtn.addEventListener('click', () => {
        removeStyle();
    })
    // overlay
overlay.addEventListener('click', function() {
    removeStyle();
})

// Removing styling from Elements
function removeStyle() {
    mainMenu.style.left = '-100%';
    overlay.style.display = 'none';

    closeBtnsLIne.forEach(line => line.style.transform = 'rotate(0) translateY(0)');
    mainMenu.style.left = '-100%'
    this.style.display = 'none'
}

// Adding style to elements
function addStyle() {
    mainMenu.style.left = '0%';
    overlay.style.display = 'block';
    closeBtnsLIne[0].style.transform = 'rotate(45deg) translateY(8px)';
    closeBtnsLIne[1].style.transform = 'rotate(-45deg) translateY(-8px)';
};

// count score
const scoreNums = document.querySelectorAll('.score-num')
const speed = 2000;

scoreNums.forEach((counter) => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;

        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1000);
        } else {
            count.innerText = target
        }
    }
    window.addEventListener('scroll', () => {
        if (scrollY > 350) {
            updateCount();
        }
    })
});


// AOS JS
var ssAOS = function() {
    AOS.init({
        easing: 'ease-in-sine',
        delay: 100,
        duration: 500,
        once: false,
    });
};
ssAOS();