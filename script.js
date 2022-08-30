const cubsSection = document.querySelector(".cubs");
const cubsInner = document.querySelector(".cubs__inner");
const cubs = document.querySelectorAll(".cubs-item");

// animate cubs on hover

let isElemMouseMove = false;
cubsSection.addEventListener("mousemove", (e) => {
  console.log(2);
  throttleMouseMove(e);
});
function throttleMouseMove(e) {
  if (isElemMouseMove == false && cubsSection.classList.contains("scrolled")) {
    console.log(1);
    window.requestAnimationFrame(function () {
      cubs.forEach((el, i) => {
        const transform = cubesTransform[i];

        let rx = transform.rotateX;
        let ry = transform.rotateY;
        let rz = transform.rotateZ;

        let x = Math.round((e.clientX * transform.movingValue) / 350);
        let y = Math.round((e.clientY * transform.movingValue) / 350);

        el.style.transform = `rotateX(${rx + y}deg) rotateY(${
          ry + x
        }deg) rotateZ(${rz + y}deg)`;
      });
      isElemMouseMove = false;
    });
    isElemMouseMove = true;
  }
}

// position animation when scrolling to the cub section

window.addEventListener("scroll", throttleScroll, false);

let isScrolling = false;

function throttleScroll(e) {
  if (isScrolling == false) {
    window.requestAnimationFrame(function () {
      scrolling();
      isScrolling = false;
    });
  }
  isScrolling = true;
}

function scrolling() {
  if (
    isFullyVisible(cubsInner) &&
    !cubsSection.classList.contains("scrolled")
  ) {
    cubsSection.classList.add("scrolled");
    setTransform(cubs);

    setTimeout(() => {
      cubsSection.classList.add("done");
    }, 600);
  }
}

function isFullyVisible(el) {
  let elementBoundary = el.getBoundingClientRect();

  let top = elementBoundary.top;
  let bottom = elementBoundary.bottom;
  let height = elementBoundary.bottom;

  return top >= 0 && bottom + 200 <= window.innerHeight;
}

function getRandomDigit(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let cubesTransform = [
  {
    rotateX: -21,
    rotateY: 16,
    rotateZ: 6,
    movingValue: getRandomDigit(16, 4),
  },
  {
    rotateX: -75,
    rotateY: 40,
    rotateZ: 5,
    movingValue: getRandomDigit(16, 4),
  },
  {
    rotateX: -5,
    rotateY: 25,
    rotateZ: 40,
    movingValue: getRandomDigit(16, 4),
  },
  {
    rotateX: -52,
    rotateY: 21,
    rotateZ: 26,
    movingValue: getRandomDigit(16, 4),
  },
  {
    rotateX: -55,
    rotateY: -15,
    rotateZ: 35,
    movingValue: getRandomDigit(16, 4),
  },
  {
    rotateX: 35,
    rotateY: 7,
    rotateZ: 28,
    movingValue: getRandomDigit(16, 4),
  },
  {
    rotateX: 5,
    rotateY: 70,
    rotateZ: 30,
    movingValue: getRandomDigit(16, 4),
  },
];

function setTransform(elems) {
  elems.forEach((el, i) => {
    el.style.transform = `rotateX(${cubesTransform[i].rotateX}deg) rotateY(${cubesTransform[i].rotateY}deg) rotateZ(${cubesTransform[i].rotateZ}deg)`;
  });
}

// animate when page reload on visible cubs inner

if (isFullyVisible(cubsInner)) {
  cubsSection.classList.add("scrolled");
  setTransform(cubs);

  setTimeout(() => {
    cubsSection.classList.add("done");
  }, 600);
}
