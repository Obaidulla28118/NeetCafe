document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById('search');
  const suggestions = document.getElementById('suggestions');

  const chapters = {
    physics: [
      { name: "» Chapters -- Coming soon", url: "index.html" },
      { name: "» We are working on it", url: "index.html" },
      { name: "» Start preparing Biology", url: "index.html" },
      // Add more Physics chapters
    ],
    chemistry: [
      { name: "» Chapters -- Coming soon", url: "index.html" },
      { name: "» We are working on it", url: "index.html" },
      { name: "» Start preparing Biology", url: "index.html" },
      // Add more Chemistry chapters
    ],
    biology: [
      { name: "» Biomolecules", url: "/quiz/Biology/each chp qType/biomole-qType.html" },
      { name: "» Body Fluid & Circulation", url: "/quiz/Biology/each chp qType/bodyFluid-qType.html" },
      { name: "» Excretory product & their elimination", url: "/quiz/Biology/each chp qType/excretion-qType.html" },
      
      // Add more Biology chapters
    ]
  };

  const nav = document.querySelector(".nav"),
    searchIcon = document.querySelector("#searchIcon"),
    navOpenBtn = document.querySelector(".navOpenBtn"),
    navCloseBtn = document.querySelector(".navCloseBtn");

  searchIcon.addEventListener("click", () => {
    nav.classList.toggle("openSearch");
    nav.classList.remove("openNav");
    if (nav.classList.contains("openSearch")) {
      return searchIcon.classList.replace("uil-search", "uil-times");
    }
    searchIcon.classList.replace("uil-times", "uil-search");
  });

  navOpenBtn.addEventListener("click", () => {
    nav.classList.add("openNav");
    nav.classList.remove("openSearch");
    searchIcon.classList.replace("uil-times", "uil-search");
  });

  navCloseBtn.addEventListener("click", () => {
    nav.classList.remove("openNav");
  });

  const subjectCards = document.querySelectorAll('.subject-card');

  subjectCards.forEach(card => {
    card.addEventListener('click', () => {
      const subject = card.getAttribute('data-subject');
      const subjectChapters = chapters[subject];
      showPopup(subjectChapters);
    });
  });

  function showPopup(subjectChapters) {
    const popup = document.createElement('div');
    popup.classList.add('popup');
    popup.innerHTML = `
      <div class="popup-content">
        <span class="close-button">&times;</span>
        <ul>
          ${subjectChapters.map(chapter => `<li class="popup-item"><strong>${chapter.name}</strong></li>`).join('')}
        </ul>
      </div>
    `;
    document.body.appendChild(popup);

    const closeButton = popup.querySelector('.close-button');
    closeButton.addEventListener('click', () => closePopup(popup));

    const chapterListItems = popup.querySelectorAll('.popup-item');
    chapterListItems.forEach((li, index) => {
      li.addEventListener('click', () => {
        location.href = subjectChapters[index].url;
      });
    });

    function handleOutsideClick(event) {
      if (!popup.contains(event.target)) {
        closePopup(popup);
      }
    }
    setTimeout(() => {
      window.addEventListener("click", handleOutsideClick, true);
    }, 0);

    function closePopup(popup) {
      document.body.removeChild(popup);
      window.removeEventListener("click", handleOutsideClick, true);
    }
  }

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    if (query === '') {
      suggestions.innerHTML = '';
      return;
    }
    
    const suggestionsList = [];

    Object.values(chapters).flat().forEach(chapter => {
      if (chapter.name.toLowerCase().includes(query)) {
        suggestionsList.push(chapter);
      }
    });

    displaySuggestions(suggestionsList);
  });

  function displaySuggestions(suggestionsList) {
    suggestions.innerHTML = suggestionsList.map(chapter => `
      <li class="suggestion-item" data-url="${chapter.url}">
        ${chapter.name}
      </li>
    `).join('');

    const suggestionItems = suggestions.querySelectorAll('.suggestion-item');
    suggestionItems.forEach(item => {
      item.addEventListener('click', function() {
        location.href = this.getAttribute('data-url');
      });
    });
  }

  document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
});
