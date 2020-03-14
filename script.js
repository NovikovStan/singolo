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

  let sliderBtn = document.querySelectorAll(".slider-nav i");
  let sliderPages = document.querySelectorAll(".slider-page");
  sliderBtn.forEach(el =>
    el.addEventListener("click", event => {
      sliderPages.forEach(elem => elem.classList.toggle("slider-page-active"));
    })
  );

  let iphoneBtn = document.querySelectorAll(".iphone-button");
  iphoneBtn.forEach(el =>
    el.addEventListener("click", event => {
      event.target
        .closest(".iphone")
        .querySelector(".screen")
        .classList.toggle("bg-black");
    })
  );

  let portfolioNav = document.querySelectorAll(".portfolio-nav-btn");
  portfolioNav.forEach(el =>
    el.addEventListener("click", event => {
      portfolioNav.forEach(el => el.classList.remove("portfolio-nav-active"));
      event.target.classList.add("portfolio-nav-active");
      let portfolioImage = document.querySelector(".picture");
      let portfolioImageArea = document.querySelector(".pictures");
      portfolioImageArea.appendChild(portfolioImage.cloneNode());
      portfolioImage.remove();
    })
  );

  let portfolioImages = document.querySelectorAll(".picture");
  portfolioImages.forEach(el =>
    el.addEventListener("click", event => {
      portfolioImages.forEach(el => el.classList.remove("outlined"));
      event.target.classList.add("outlined");
    })
  );

  let form = document.forms.contact;
  let nameFormField = form.name;
  let emailFormField = form.email;
  let subjectFormField = form.subject;
  let detailsFormField = form.details;
  let submitBtn = form.submit;
  let modal = document.querySelector(".modal");
  let message = modal.querySelector(".message");
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
      !/[A-Za-z\-]+\s*[A-Za-z\-]*/.test(nameFormField.value.trim())
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
      let messageHeading = document.createElement("p");
      messageHeading.textContent = "Письмо отправлено";
      message.appendChild(messageHeading);

      let subjectMsg = document.createElement("p");
      if (!subjectFormField.value) {
        subjectMsg.textContent = "Без темы";
      } else subjectMsg.textContent = "Тема: " + subjectFormField.value;
      message.appendChild(subjectMsg);

      let detailsMsg = document.createElement("p");
      if (!detailsFormField.value) {
        detailsMsg.textContent = "Без описания";
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
