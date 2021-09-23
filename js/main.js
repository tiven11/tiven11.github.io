/* hide all sections except active */
(() => {
  const sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    if (!section.classList.contains("active")) {
      section.classList.add("hide");
    }
  });
})();

/*----------------------------navigation bar effect----------------------------*/
(() => {

  // get nav-bar
  const navBar = document.querySelector(".nav-bar");
  // get tabs
  const tabs = navBar.querySelectorAll(".tab");
  // assign effect to tabs once page is loaded
  window.addEventListener("load", () => {
    tabs.forEach((tab) => {
      tab.classList.add("hover-dark");
    });
  });

  window.addEventListener("scroll", () => {
    navBar.classList.toggle("small", window.scrollY > 300);
    // change tabs hover effect
    if (window.scrollY > 0) {
      tabs.forEach((tab) => {
        tab.classList.remove("hover-dark");
        tab.classList.add("hover-light");
      });
    } else {
      tabs.forEach((tab) => {
        tab.classList.remove("hover-light");
        tab.classList.add("hover-dark");
      });
    }
  });

})();

/*----------------------------section tabs----------------------------*/
(() => {

  const hamburgerBtn = document.querySelector(".hamburger-btn"),
  navBarResponsive = document.querySelector(".nav-bar-responsive"),
  closeNavBar = navBarResponsive.querySelector(".close-btn");
  hamburgerBtn.addEventListener("click", showNavMenu);
  closeNavBar.addEventListener("click", hideNavMenu);

  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("tab")) {
      if (event.target.hash !== "") {
        // prevent default anchor click behavior
        event.preventDefault();
        const hash = event.target.hash;
        // deactivate existing active 'section'
        document.querySelector(".section.active").classList.add("hide");
        document.querySelector(".section.active").classList.remove("active");
        // activate new 'section'
        document.querySelector(hash).classList.add("active");
        document.querySelector(hash).classList.remove("hide");
        // add hash (#) to url
        window.location.hash = hash;

        // if navigation bar for small screens is open
        if (navBarResponsive.classList.contains("open")) {
          // deactivate existing active tab
          navBarResponsive.querySelector(".tab.active").classList.add("outer-shadow", "hover-in-shadow");
          navBarResponsive.querySelector(".tab.active").classList.remove("inner-shadow", "active");
          // activate new tab
          event.target.classList.add("active", "inner-shadow");
          event.target.classList.remove("hover-in-shadow", "outer-shadow");
          hideNavMenu();
        }
      }
    }
  });

  function showNavMenu() {
    navBarResponsive.classList.add("open");
    bodyScrollingToggle();
  }
  function hideNavMenu() {
    navBarResponsive.classList.remove("open");
    bodyScrollingToggle();
  }

})();

/*----------------cancel outer shadow when focus input------------------------*/
(() => {

  const contactusForm = document.querySelector(".contactus-form"),
  inputGroups = contactusForm.querySelectorAll(".input-group");

  document.addEventListener("click", (event) => {
    inputGroups.forEach((input) => {
      if (input !== event.target) {
        input.classList.add("outer-shadow");
      }
    })
    if (event.target.classList.contains("input-control")) {
      event.target.parentElement.classList.remove("outer-shadow");
    }
  });

})();

/*------------------------our story tabs------------------------*/
(() => {

  const ourstorySection = document.querySelector(".ourstory-section"),
  tabsContainer = document.querySelector(".ourstory-tabs");

  tabsContainer.addEventListener("click", (event) => {
    if (event.target.classList.contains("tab-item") && 
    !event.target.classList.contains("active")) {
      const target = event.target.getAttribute("data-target");
      // deactivate existing active tab-item
      tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
      // activate new tab-item
      event.target.classList.add("outer-shadow", "active");
      // deactivate existing active tab-content
      ourstorySection.querySelector(".tab-content.active").classList.remove("active");
      // activate new tab-content
      ourstorySection.querySelector(target).classList.add("active");
    }
  });

})();

function bodyScrollingToggle() {
  document.body.classList.toggle("hidden-scrolling");
}

/*------------------------your story popup------------------------*/
(() => {

  const storyItemsContainer = document.querySelector(".story-items"),
  storyItems = document.querySelectorAll(".story-item"),
  popup = document.querySelector(".yourstory-popup"),
  closeBtn = popup.querySelector(".close-pp");
  let itemIndex, img;

  storyItemsContainer.addEventListener("click", (event) => {
    if (event.target.closest(".story-item-inner")) {
      const storyItem = event.target.closest(".story-item-inner").parentElement;
      // get the storyItem index
      itemIndex = Array.from(storyItem.parentElement.children).indexOf(storyItem);
      img = storyItems[itemIndex].querySelector(".img img").getAttribute("src");
      popUpTogle();
      popupDetails();
    }
  });

  closeBtn.addEventListener("click", () => {
    popUpTogle();
  });

  function popUpTogle() {
    popup.classList.toggle("open");
    bodyScrollingToggle();
  }

  function popupDetails() {
    // if story within story-item not exists
    if(!storyItems[itemIndex].querySelector(".story")) {
      alert("Sorry! There is no story avaiblable yet.");
      popUpTogle();
      return;
    }
    // get image from story-item
    const img = storyItems[itemIndex].querySelector(".img img").getAttribute("src");
    // set img into popup
    popup.querySelector(".pp-img img").src = img;
    // get story and name from story-item
    const name = storyItems[itemIndex].querySelector(".name").innerHTML,
    story = storyItems[itemIndex].querySelector(".story").innerHTML;
    // set story and name into popup
    popup.querySelector(".pp-name").innerHTML = name;
    popup.querySelector(".pp-story").innerHTML = story;
  }

})();