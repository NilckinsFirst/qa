//loader function
var Loader = function () {};
Loader.prototype = {
  require: function (scripts, callback) {
    this.loadCount = 0;
    this.totalRequired = scripts.length;
    this.callback = callback;
    for (var i = 0; i < scripts.length; i++) {
      this.writeScript(scripts[i]);
    }
  },
  loaded: function (evt) {
    this.loadCount++;
    if (
      this.loadCount == this.totalRequired &&
      typeof this.callback == "function"
    )
      this.callback.call();
  },
  writeScript: function (src) {
    var self = this;
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.defer = true;
    s.src = src;
    s.addEventListener(
      "load",
      function (e) {
        self.loaded(e);
      },
      false
    );
    var head = document.getElementsByTagName("head")[0];
    head.appendChild(s);
  },
};
var lazy;
var callback_loaded = function (element) {
  if (element.closest(".lazy-img")) {
    element.closest(".lazy-img").classList.remove("lazy-progress");
  }
};
//  Указать путь до lazy.js
var l = new Loader();
l.require(["./js/lazy.js"], function () {
  lazy = new LazyLoad({
    elements_selector: ".lazy",
    callback_loaded: callback_loaded,
    unobserve_entered: true,
  });
});

WebFontConfig = {
  google: {
    families: ["Inter:400,500,600,700,800&display=swap"],
    // families: ["Diary of an 8-bit mage"]
  },
};
(function (d) {
  var wf = d.createElement("script"),
    s = d.scripts[0];
  wf.src = "https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js";
  wf.async = true;
  s.parentNode.insertBefore(wf, s);
})(document);

let slideUp = (e, t = 500, s, d) => {
    (e.style.transitionProperty = "height, margin, padding"),
      (e.style.transitionDuration = t + "ms"),
      (e.style.boxSizing = "border-box"),
      (e.style.height = e.offsetHeight + "px"),
      e.offsetHeight,
      (e.style.overflow = "hidden"),
      (e.style.height = 0),
      (e.style.paddingTop = 0),
      (e.style.paddingBottom = 0),
      (e.style.marginTop = 0),
      (e.style.marginBottom = 0),
      window.setTimeout(() => {
        (e.style.display = "none"),
          e.style.removeProperty("height"),
          e.style.removeProperty("padding-top"),
          e.style.removeProperty("padding-bottom"),
          e.style.removeProperty("margin-top"),
          e.style.removeProperty("margin-bottom"),
          e.style.removeProperty("overflow"),
          e.style.removeProperty("transition-duration"),
          e.style.removeProperty("transition-property");
      }, t);
    s.classList.remove(d);

    // setTimeout(() => {
    //   s.classList.remove(d);
    // }, t);
  },
  slideDown = (e, t = 500, s, d) => {
    e.style.removeProperty("display");
    let o = window.getComputedStyle(e).display;
    "none" === o && (o = "block"), (e.style.display = o);
    let r = e.offsetHeight;
    (e.style.overflow = "hidden"),
      (e.style.height = 0),
      (e.style.paddingTop = 0),
      (e.style.paddingBottom = 0),
      (e.style.marginTop = 0),
      (e.style.marginBottom = 0),
      e.offsetHeight,
      (e.style.boxSizing = "border-box"),
      (e.style.transitionProperty = "height, margin, padding"),
      (e.style.transitionDuration = t + "ms"),
      (e.style.height = r + "px"),
      e.style.removeProperty("padding-top"),
      e.style.removeProperty("padding-bottom"),
      e.style.removeProperty("margin-top"),
      e.style.removeProperty("margin-bottom"),
      window.setTimeout(() => {
        e.style.removeProperty("height"),
          e.style.removeProperty("overflow"),
          e.style.removeProperty("transition-duration"),
          e.style.removeProperty("transition-property");
      }, t);
    s.classList.add(d);

    // setTimeout(() => {
    //   s.classList.add(d);
    // }, t);
  };
var slideToggle = (e, t = 500, s, d) =>
  "none" === window.getComputedStyle(e).display
    ? slideDown(e, t, s, d)
    : slideUp(e, t, s, d);

let accordeons = document.querySelectorAll(".accordion");
if (accordeons.length > 0) {
  accordeons.forEach(function (accordeon) {
    let accordeonTitle = accordeon.querySelector(".accordion-title");
    let accordeonContent = accordeon.querySelector(".accordion-content");
    accordeonTitle.addEventListener("click", function (e) {
      console.log(accordeon.open);
      e.preventDefault();
      if (accordeon.open == true) {
        slideUp(accordeonContent, 250, accordeon, "open");
        setTimeout(() => {
          accordeon.open = false;
        }, 250);
      } else {
        accordeon.open = true;
        slideDown(accordeonContent, 250, accordeon, "open");
      }
    });
  });
}

let switchInputs = document.querySelectorAll(".switch");

let textLabels = document.querySelectorAll(".input-label");
textLabels.forEach(function (textLabel) {
  let input = textLabel.querySelector(".input");
  let inputSpan = textLabel.querySelector(".custom-label");
  input.addEventListener("focus", function (e) {
    inputSpan.classList.add("move");
    textLabel.classList.add("focus");
  });
  input.addEventListener("blur", function (e) {
    if (input.value.length == 0) {
      inputSpan.classList.remove("move");
      textLabel.classList.remove("focus");
    }
  });
});

let nicknameInput = document.querySelector(".text");
let fioInput = document.querySelector(".fio");
fioInput.addEventListener("input", function (e) {
  this.value = this.value.replace(/[^a-zа-яё\s]/gi, "");
});

let fileLabel = document.querySelector(".file-label");
let fileSpan = fileLabel.querySelector(".custom-label");
let fileButton = fileLabel.querySelector(".choose-file");
let fileDelete = fileLabel.querySelector(".delete-file");
let fileInput = document.querySelector("input[type=file]");
fileInput.addEventListener("change", function (e) {
  fileDelete.addEventListener("click", function (e) {
    fileInput.value = "";
    fileDelete.classList.add("d-none");
    fileSpan.textContent = "Мой персонаж";
    fileSpan.classList.remove("choosen");
    fileButton.textContent = "Выбрать файл";
    fileLabel.classList.remove("focus");
  });
  if (this.value) {
    fileSpan.textContent = this.value;
    fileSpan.classList.add("choosen");
    fileButton.textContent = "Выбрать другой файл";
    fileLabel.classList.add("focus");
    fileDelete.classList.remove("d-none");
  } else {
    fileSpan.textContent = "Мой персонаж";
    fileSpan.classList.remove("choosen");
    fileButton.textContent = "Выбрать файл";
    fileLabel.classList.remove("focus");
    fileDelete.classList.add("d-none");
  }
});

function valid(a, b) {
  a.classList.add("d-none");
  b.classList.remove("not-valid-label");
  b.classList.add("valid-label");
}

function notValid(a, b) {
  a.classList.remove("d-none");
  b.classList.remove("valid-label");
  b.classList.add("not-valid-label");
  a.textContent = "неправильный формат";
}

let emailDiv = document.querySelector(".email-input");
let emailLabel = emailDiv.querySelector(".input-label");
let emailInput = emailDiv.querySelector(".email");
let emailNotValid = emailDiv.querySelector(".not-valid");
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
emailDiv.addEventListener("change", function (e) {
  if (!emailPattern.test(emailInput.value)) {
    notValid(emailNotValid, emailLabel);
  } else {
    valid(emailNotValid, emailLabel);
  }
});

let telDiv = document.querySelector(".tel-input");
let telLabel = telDiv.querySelector(".input-label");
let telInput = telDiv.querySelector(".tel");
let telNotValid = telDiv.querySelector(".not-valid");
telInput.addEventListener("input", function (e) {
  e.target.value = e.target.value.replace(/\D+/g, "");
});

telLabel.addEventListener("change", function (e) {
  if (telInput.value.length < 11) {
    notValid(telNotValid, telLabel);
  } else {
    valid(telNotValid, telLabel);
  }
});

let switchFirst = document.querySelector(".switch-first");
let switchSecond = document.querySelector(".switch-second");
let sendForm = document.querySelector(".send-form");
sendForm.addEventListener("click", function (e) {
  if (
    fileInput.value.length != 0 &&
    emailInput.value.length != 0 &&
    telInput.value.length != 0 &&
    nicknameInput.value.length != 0 &&
    fioInput.value.length != 0 &&
    switchFirst.checked &&
    switchSecond.checked
  ) {
    console.log(10);
  }
});















let curentScroll = 0;
let prevScroll = 0;
let ticking = false;
let preHeader = document.querySelector(".preheader");
doSomething();
function doSomething(scroll_pos) {
  if (prevScroll > scroll_pos) {
    preHeader.classList.remove("now-scroll");
    preHeader.style.marginTop = "0px";
  } else if (scroll_pos > 100) {
    preHeader.classList.add("now-scroll");
    preHeader.style.marginTop = -preHeader.clientHeight + "px";
  }
  prevScroll = scroll_pos;
}

window.addEventListener("scroll", function (e) {
  curentScroll = window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(function () {
      doSomething(curentScroll);
      ticking = false;
    });
    ticking = true;
  }
});

setTimeout(() => {
  let runTexts = document.querySelectorAll(".run-text .run-words");
  if (runTexts.length > 0) {
    runTexts.forEach(function (runText) {
      let wordGroup = runText.querySelector(".words-group");
      runText.style.setProperty(
        "--runtext",
        "-" + Math.round(wordGroup.clientWidth) + "px"
      );
    });
  }
}, 300);

let modal = document.querySelector(".modal");
let header = document.querySelector('.header');
let body = document.body;
let modalOpen = document.querySelector(".open-modal");

let backcall = document.querySelector('.backcall');
let backcallOpen = document.querySelector('.backcall-open');
let backcallClose = document.querySelector('.backcall-menu-close');
backcallOpen.addEventListener("click", function (e) {
  backcall.classList.toggle('open');
});

backcallClose.addEventListener("click", function (e) {
  backcall.classList.remove('open');
});

modalOpen.addEventListener("click", function (e) {
  modal.classList.add("opened");
  modalOpening();
});

let modalClose = document.querySelector(".close-modal");
modalClose.addEventListener("click", function (e) {
  modalClosing();
});

let modalOpenClosing = document.querySelector(".modal");
modalOpenClosing.addEventListener("click", function (e) {
  if (e.target == e.currentTarget) {
    modalClosing();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.key === 'Escape') {
    modalClosing();
  }
});


function modalOpening() {
  modal.classList.add("opened");
  body.classList.add("block-overflow");
  body.style.paddingRight = getScrollbarWidth() + "px";
  header.style.paddingRight = getScrollbarWidth() + "px";
}

function modalClosing() {
  modal.classList.add("closing")
  setTimeout(() => {
   modal.classList.remove("opened");
   body.classList.remove("block-overflow");
   body.style.paddingRight = "0px";
   header.style.paddingRight = "0px";
   modal.classList.remove("closing");
 }, 190)
}

function getScrollbarWidth() {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  outer.style.msOverflowStyle = "scrollbar";
  document.body.appendChild(outer);
  const inner = document.createElement("div");
  outer.appendChild(inner);
  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  outer.parentNode.removeChild(outer);
  return scrollbarWidth;
}
