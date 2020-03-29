window.onload = function() {
  let headerNavElems = document.querySelectorAll(".menu ul li");
  let headerNavActive = document.querySelector(".menu ul li.active");
  headerNavElems.forEach(el => {
    el.addEventListener("click", event => {
      headerNavActive.classList.remove("active");
      headerNavActive = event.target.closest("LI");
      event.target.closest("LI").classList.add("active");
    });
  });

  let burgerMenuIcon = document.querySelector(".burger-menu-icon");
  let burgerModal = document.querySelector(".burger-modal");
  burgerMenuIcon.addEventListener("click", () => {
    burgerModal.classList.remove("hidden");
    let burgerNavElems = document.querySelectorAll(".burger-menu .menu ul li");
    let burgerNavActive = document.querySelector(
      ".burger-menu .menu ul li.active"
    );
    burgerNavElems.forEach(el => {
      el.addEventListener("click", event => {
        burgerNavActive.classList.remove("active");
        burgerNavActive = event.target.closest("LI");
        event.target.closest("LI").classList.add("active");
        burgerModal.classList.add("hidden");
      });
    });
  });

  document.querySelectorAll(".clickable").forEach(el => {
    el.addEventListener("click", event => {
      console.log(event);

      let bgVert = document.querySelectorAll(".vertical-bg");
      let bgHor = document.querySelectorAll(".horisontal-bg");
      if (
        event.offsetX > 200 &&
        event.offsetX < 240 &&
        event.offsetY > 460 &&
        event.offsetY < 500
      ) {
        bgVert.forEach(el => el.classList.toggle("black-bg"));
      } else if (
        event.offsetX > 430 &&
        event.offsetX < 470 &&
        event.offsetY > 260 &&
        event.offsetY < 300
      ) {
        bgHor.forEach(el => el.classList.toggle("black-bg"));
      }
    });
  });

  let items = document.querySelectorAll(".slide");
  let currentItem = 0;
  let frontSlide = document.querySelector(".slider-img-1");
  let backSlides = document.querySelectorAll(".slider-img-2");

  document.querySelector(".right-arrow img").addEventListener("click", () => {
    backSlides[currentItem].classList.add("from-right", "active");
    currentItem = (currentItem + 1 + backSlides.length) % backSlides.length;
    backSlides[currentItem].addEventListener("animationend", function() {
      backSlides.forEach(el => {
        console.log(el, backSlides[currentItem]);

        if (el == backSlides[currentItem]) el.classList.remove("from-right");
        else el.classList.remove("active");
      });
    });
  });

  document.querySelector(".left-arrow img").addEventListener("click", () => {
    backSlides[currentItem].classList.add("from-left", "active");
    currentItem = (currentItem + 1 + backSlides.length) % backSlides.length;
    backSlides[currentItem].addEventListener("animationend", function() {
      backSlides.forEach(el => {
        console.log(el, backSlides[currentItem]);

        if (el == backSlides[currentItem]) el.classList.remove("from-left");
        else el.classList.remove("active");
      });
    });
  });

  let portfolioNav = document.querySelectorAll(".portfolio-nav-btn");
  portfolioNav.forEach(el =>
    el.addEventListener("click", event => {
      portfolioNav.forEach(el => el.classList.remove("portfolio-nav-active"));
      event.target.classList.add("portfolio-nav-active");
      let portfolioImage = document.querySelector(".picture");
      let portfolioImageArea = document.querySelector(".pictures");
      portfolioImageArea.appendChild(portfolioImage.cloneNode());
      portfolioImage.remove();
      setPictureEvent();
    })
  );

  setPictureEvent();

  let form = document.forms.contact;
  let nameFormField = form.name;
  let emailFormField = form.email;
  let subjectFormField = form.subject;
  let detailsFormField = form.details;
  let submitBtn = form.submit;
  let modal = document.querySelector(".modal");
  [...form.elements].forEach(el =>
    el.addEventListener("change", () => {
      el.classList.remove("invalid-input");
    })
  );

  submitBtn.addEventListener("click", event => {
    event.preventDefault();
    let errors = 0;
    if (
      !nameFormField.value ||
      !/[A-Za-zА-ЯЁа-яё\-]+\s*[A-Za-zА-ЯЁа-яё\-]*/.test(
        nameFormField.value.trim()
      )
    ) {
      nameFormField.classList.add("invalid-input");
      errors++;
    }

    if (
      !emailFormField.value ||
      !/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/.test(
        emailFormField.value.trim()
      )
    ) {
      emailFormField.classList.add("invalid-input");
      errors++;
    }
    if (!errors) {
      let message = document.createElement("div");
      message.classList.add("message");
      modal.appendChild(message);
      let messageHeading = document.createElement("p");
      messageHeading.textContent = "Письмо отправлено";
      message.appendChild(messageHeading);

      let subjectMsg = document.createElement("p");
      if (!subjectFormField.value) {
        subjectMsg.textContent = "Без темы";
      } else if (subjectFormField.value.length > 200) {
        subjectMsg.textContent =
          "Тема: " + subjectFormField.value.slice(0, 200);
      } else subjectMsg.textContent = "Тема: " + subjectFormField.value;
      message.appendChild(subjectMsg);

      let detailsMsg = document.createElement("p");
      if (!detailsFormField.value) {
        detailsMsg.textContent = "Без описания";
      } else if (detailsFormField.value > 500) {
        detailsMsg.textContent =
          "Описание: " + detailsFormField.value.slice(0, 500);
      } else detailsMsg.textContent = "Описание: " + detailsFormField.value;
      message.appendChild(detailsMsg);

      let btn = document.createElement("button");
      btn.textContent = "Ok";
      btn.classList.add("modal-button");
      btn.addEventListener("click", () => {
        message.remove();
        modal.classList.add("hidden");
        nameFormField.value = "";
        emailFormField.value = "";
        subjectFormField.value = "";
        detailsFormField.value = "";
      });
      message.appendChild(btn);
      modal.classList.remove("hidden");
    }
  });
};

function setPictureEvent() {
  let portfolioImages = document.querySelectorAll(".picture");
  portfolioImages.forEach(el =>
    el.addEventListener("click", event => {
      portfolioImages.forEach(el => el.classList.remove("outlined"));
      event.target.classList.add("outlined");
    })
  );
}
