let colorList = document.querySelectorAll(".colors-list li");
let RandomSelectButton = document.querySelectorAll(".random-spans span");
let backgroundOption = true;
let backgroundInterval;
let bulletContainer = document.querySelector(".nav-bullets");
let activateBullets = document.querySelectorAll(".active-bullets-spans span");
let landing = document.querySelector(".landing-page");
let bullets = document.querySelectorAll(".nav-bullets .bullet");
let links = document.querySelectorAll(".options li a");
//check if there is a value in local storage
//check the value of image
let backgroundLocalImage = localStorage.getItem("image");
if (backgroundLocalImage !== null) {
  landing.style.backgroundImage = backgroundLocalImage;
}
//check the value of random OPtion
let randomizeOption = localStorage.getItem("randomOption");
if (randomizeOption !== null) {
  if (randomizeOption == "no") {
    backgroundOption = false;
    clearInterval(backgroundInterval);
  }
  for (let i = 0; i < RandomSelectButton.length; i++) {
    RandomSelectButton[i].classList.remove("active");
    if (RandomSelectButton[i].dataset.background === randomizeOption) {
      // console.log(RandomSelectButton[i].dataset.background);
      RandomSelectButton[i].classList.add("active");
    }
  }
}
//check the value of color
let mainColor = localStorage.getItem("color-option");
if (mainColor !== null) {
  document.documentElement.style.setProperty("--main-color", mainColor);
  for (let i = 0; i < colorList.length; i++) {
    colorList[i].classList.remove("active");
    if (mainColor === colorList[i].dataset.color) {
      colorList[i].classList.add("active");
    }
  }
}
//check the value of acitve bullet
let activebullet = localStorage.getItem("active-bullet");
if (activebullet !== null) {
  for (let i = 0; i < activateBullets.length; i++) {
    activateBullets[i].classList.remove("active");
    if (activateBullets[i].dataset.active == activebullet) {
      activateBullets[i].classList.add("active");
      console.log(activateBullets[i].dataset.active);
      console.log(activebullet);
    }
  }
  if (activebullet == "yes") {
    bulletContainer.classList.add("active");
  } else {
    bulletContainer.classList.remove("active");
  }
}
//check the value of acitve bullets button

//toggle button spin
let button = document.querySelector(".setting");
let settingBox = document.querySelector(".settings-box");
button.onclick = function () {
  button.children[0].classList.toggle("fa-spin");
  settingBox.classList.toggle("open");
};
//set colorlist
colorList.forEach((e) => {
  e.onclick = () => {
    for (let i = 0; i < colorList.length; i++) {
      colorList[i].classList.remove("active");
    }
    e.classList.add("active");
    document.documentElement.style.setProperty("--main-color", e.dataset.color);
    localStorage.setItem("color-option", e.dataset.color);
  };
});
//set randon btns
RandomSelectButton.forEach((e) => {
  e.onclick = () => {
    for (let i = 0; i < RandomSelectButton.length; i++) {
      RandomSelectButton[i].classList.remove("active");
    }
    e.classList.add("active");
    localStorage.setItem("randomOption", e.dataset.background);
    if (e.dataset.background == "yes") {
      backgroundOption = true;
      randomizeImages();
    } else {
      backgroundOption = false;
      clearInterval(backgroundInterval);
    }
  };
});
//set landing page element
let current = 1;
let imgarr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function randomizeImages() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      let random = Math.floor(Math.random() * 10);
      landing.style.backgroundImage = `url("../images/image-${imgarr[random]}.jpg")`;
      localStorage.setItem(
        "image",
        `url("../images/image-${imgarr[random]}.jpg")`
      );
    }, 10000);
  }
}
randomizeImages();

//on skroll reach function
let skills = document.querySelector(".skills");
window.onscroll = () => {
  let skillOffsetTop = skills.offsetTop;
  let SkillOuterHeight = skills.offsetHeight;
  let windowHeigh = this.innerHeight;
  let windowScrollTop = this.scrollY;
  // console.log("scroll top "+windowScrollTop);
  // console.log("total"+(skillOffsetTop+SkillOuterHeight-windowHeigh));
  if (windowScrollTop > 700) {
    let progressSkill = document.querySelectorAll(".skill-progress span");
    progressSkill.forEach((e) => {
      e.style.width = e.dataset.progress;
    });
  }
};
let gallery = document.querySelectorAll(".gallery img");
gallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //add div overlay
    let popupOverlay = document.createElement("div");
    popupOverlay.classList.add("popup-overlay");
    document.body.appendChild(popupOverlay);
    //add img box
    let popupBox = document.createElement("div");
    popupBox.classList.add("popup-box");
    let popupImg = document.createElement("img");
    popupImg.src = img.src;
    popupBox.appendChild(popupImg);
    document.body.appendChild(popupBox);
    if (img.alt !== null) {
      // console.log(img.alt);
      let title = document.createElement("h3");
      title.classList.add("popup-title");
      title.appendChild(document.createTextNode(img.alt));
      popupBox.prepend(title);
    }
    //add close button
    let closeButton = document.createElement("span");
    closeButton.classList.add("close-button");
    closeButton.appendChild(document.createTextNode("X"));
    popupBox.appendChild(closeButton);
    closeButton.onclick = () => {
      popupBox.remove();
      popupOverlay.remove();
    };
  });
});
// start bullet navigation
function scrollTo(elements) {
  elements.forEach((element) => {
    addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.dataset.nav != null) {
        document.querySelector(e.target.dataset.nav).scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });
}
scrollTo(bullets);
scrollTo(links);
// end bullet navigation
activateBullets.forEach((button) => {
  button.addEventListener("click", (e) => {
    activateBullets.forEach((e) => {
      e.classList.remove("active");
    });
    localStorage.setItem("active-bullet", e.target.dataset.active);
    // console.log(e.target.dataset.active);
    e.target.classList.add("active");
    if (e.target.classList.contains("yes")) {
      bulletContainer.classList.add("active");
    } else {
      bulletContainer.classList.remove("active");
    }
  });
});
function handle(ev) {
  ev.target.parentElemnt.querySelectorAll(".active").forEach((e) => {
    e.classList.remove("active");
  });
  ev.target.classList.add("active");
}
// view bullets or no
document
  .querySelector(".settings-box .reset-options")
  .addEventListener("click", () => {
    localStorage.clear();
    window.location.reload();
  });
let toggleButton = document.querySelector(
  ".landing-page .header-area .toggle-button"
);
let options = document.querySelector(".landing-page .header-area .options");
toggleButton.onclick = (e) => {
  e.stopPropagation();
  toggleButton.classList.toggle("active");
  options.classList.toggle("active");
};
options.onclick = (e) => {
  e.stopPropagation();
};
document.addEventListener("click", (e) => {
  if (e.target !== toggleButton && e.target !== options)
    if (options.classList.contains("active")) {
      toggleButton.classList.toggle("active");
      options.classList.toggle("active");
    }
});
