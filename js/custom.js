//  auto language change 
let i = 0;
const randomizeText = () => {
  const phrase = document.querySelector('.random-word');
  const compStyles = window.getComputedStyle(phrase);
  const animation = compStyles.getPropertyValue('animation');
  const animationTime = parseFloat(animation.match(/\d*[.]?\d+/)) * 1000;
  const phrases = ['Hello', 'Portuguese', 'english', 'urdu', 'arabic', 'hindi', 'Russian', 'polish', 'french', 'german', 'italian', 'chinise', 'Spanish', 'Balti', 'swedish', ];
  i = randomNum(i, phrases.length);
  const newPhrase = phrases[i];
  setTimeout(() => {
    phrase.textContent = newPhrase;
  }, 400); // time to allow opacity to hit 0 before changing word
}
const randomNum = (num, max) => {
  let j = Math.floor(Math.random() * max);
  // ensure diff num every time
  if (num === j) {
    return randomNum(i, max);
  } else {
    return j;
  }
}
const getAnimationTime = () => {
  const phrase = document.querySelector('.random-word');
  const compStyles = window.getComputedStyle(phrase);
  let animation = compStyles.getPropertyValue('animation');
  // firefox support for non-shorthand property
  animation != "" ? animation : animation = compStyles.getPropertyValue('-moz-animation-duration');
  // webkit support for non-shorthand property
  animation != "" ? animation : animation = compStyles.getPropertyValue('-webkit-animation-duration');
  const animationTime = parseFloat(animation.match(/\d*[.]?\d+/)) * 1000;
  return animationTime;
}
randomizeText();
setInterval(randomizeText, getAnimationTime());
class Button {
  constructor(node) {
    this.button = node;
    this.distance = 80;
    this.a = 160;
    this.mouseHasEntered = false;
    this.mouseIsInButtonTerritory = false;
    this.init();
    this.handleEvent();
  }
  init() {
    let {
      width,
      height,
      x: centerPointX,
      y: centerPointY
    } = this.button.getBoundingClientRect(); // gives width, height, left-x,top-y of the button
    centerPointX = centerPointX + width / 2; //  center point of button on x-axis
    centerPointY = centerPointY + height / 2; //  center point of button on y-axis
    this.centerPointX = centerPointX;
    this.centerPointY = centerPointY;
  }
  handleEvent() {
    window.addEventListener('mousemove', (e) => this.handleMove(e));
    window.addEventListener('mouseout', () => this.handleReset())
    window.addEventListener('scroll', () => this.init()); //  updates the button x,y position // for the button below viewport
    buttonObjects.push({
      button: this.button,
      isHovered: this.mouseIsInButtonTerritory
    });
  }
  handleMove(e) {
    const x = e.x; // current x of cursor
    const y = e.y; // current y of cursor
    const leftBorderLine = this.centerPointX - this.distance;
    const rightBorderLine = this.centerPointX + this.distance;
    const topBorderLine = this.centerPointY - this.distance;
    const bottomBorderline = this.centerPointY + this.distance;
    this.xWalk = (x - this.centerPointX) / 2; // the distance to move the button when mouse moves on X axis
    this.yWalk = (y - this.centerPointY) / 2; // the distance to move the button when mouse moves on Y axis
    this.mouseIsInButtonTerritory =
      x > leftBorderLine &&
      x < rightBorderLine &&
      y > topBorderLine &&
      y < bottomBorderline; // becomes true if  mouse is inside all of these border-line
    if (this.mouseIsInButtonTerritory) {
      if (!this.mouseHasEntered) {
        //  this must happen only once to create outside borderline
        //  creating another level borderline by increasing distance;
        //  while cursor is returning the button comes out of nearest border-line and return from this borderline
        this.distance = 240;
        this.mouseHasEntered = true;
      }
      this.handleCatch(); // when mouse enters the button's territory
    } else {
      this.handleReset()
    }
    const index = buttonObjects.findIndex(button => button.button === this.button);
    buttonObjects[index].isHovered = this.mouseIsInButtonTerritory;
  }
  handleCatch() {
    // translates the button in the direction where cursor is.
    this.button.style.transform = `translate(${this.xWalk}px, ${this.yWalk}px)`;
  }
  handleReset() {
    // resets the position of the button as it was initial.
    this.button.style.transform = `translate(${0}px, ${0}px)`;
    if (this.mouseHasEntered) this.distance = 80;
    this.mouseHasEntered = false; // when button is return to it's position (mouseHasEntered = true) lets to increase the initial borderline of button for the next time
  }
}
function handleBubble(e) {
  bubble.style.left = `${e.x}px`;
  bubble.style.top = `${e.y}px`;
  const hasAnyButtonHovered = buttonObjects.some(buttonObj => buttonObj.isHovered);
  if (hasAnyButtonHovered || e.target.classList.contains("nav__link")) {
    bubble.classList.add("bubble--big");
    document.body.style.cursor = '-webkit-grab';
  } else {
    bubble.classList.remove("bubble--big");
    document.body.style.cursor = 'auto';
  }
}
const buttons = document.querySelectorAll('.button');
const bubble = document.querySelector('.bubble');
const buttonObjects = [];
buttons.forEach(button => {
  const node = button.querySelector('.button__like-text');
  new Button(node);
});
window.addEventListener("mousemove", (e) => handleBubble(e));
window.onload = function () {
  let player = document.getElementById("player"),
    play = document.getElementById("play");
  play.addEventListener("click", function () {
    player.play();
  });
}
//   add class to hide animated circle on scroll
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(document).scrollTop() > 650) {
      $("body").addClass("hideCircleMouse");
    } else {
      $("body").removeClass("hideCircleMouse");
    }
  });
});

$(window).on('load', function() { // makes sure the whole site is loaded 
  $('#status').fadeOut(); // will first fade out the loading animation 
  $('#preloader').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website. 
  $('body').delay(350).css({'overflow':'visible'});
});


document.addEventListener("DOMContentLoaded", function(event) {
  animation_text_1("#text-anim");
});

function animation_text_1 (element){
  var newText = "";
  var theText = document.querySelector(element);
  for (i = 0; i < theText.innerText.length; i++) {
    newText += "<div>";
    if (theText.innerText[i] == " "){newText += "&nbsp;"}
    else {newText += theText.innerText[i];}
    newText += "</div>";
  }
  theText.innerHTML = newText;
  gsap.fromTo(element+" div ", {
    opacity:0, 
    y:90
  }, {
    duration: 2, 
    opacity:1, 
    y:0, 
    stagger: 0.03, 
    ease: "elastic(1.2, 1.5)",
    scrollTrigger: {
      trigger: element,
      start: "top 70%", // start when the top of the <h1> reaches 70% down from the top of the viewport
      toggleActions: "restart none none reverse"
    }
  });
  x = setTimeout("animation_text_1('#text-anim')", 5000); //will loop every 5 seconds.
};
animation_text_1("#text-anim");

 // for ripple effect

 let scroll_tl = gsap.timeline({
  scrollTrigger: {
      trigger: '.factsContainer',
      start: "top center",
      // pin: true,
      scrub: true,
      end: "+=300",
      // markers: true,
  }
}),
  facts = [...document.querySelectorAll('.fact')]
scroll_tl.to('.factsContainer h2', {
  scale: 1.5,
  duration: 1,
  ease: "slow"
})
scroll_tl.to(facts, {
  xPercent: -85 * (facts.length - 1),
  scrollTrigger: {
      trigger: ".factsContainer_sm",
      start: "center center",
      pin: true,
      // horizontal: true,
      // pinSpacing:false,
      // markers: true,
      scrub: 1,
      snap: 1 / (facts.length - 1),
      // base vertical scrolling on how wide the container is so it feels more natural.
      // end: () => `+=${smallFactsContainer.offsetWidth}`
      end: () => `+=1320`
  }
});


