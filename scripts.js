document.addEventListener('DOMContentLoaded', () => {
  // ----- Activation dynamique du lien de nav -----
  const navItems = document.querySelectorAll('.nav-links a');
  const currentPage = window.location.pathname.split("/").pop();

  navItems.forEach(link => {
    if (link.getAttribute("href") === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // ----- Filtres de projets -----
  const filterButtons = document.querySelectorAll('.filtres button');
  const projets = document.querySelectorAll('.projet');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      const category = button.getAttribute('data-filter');

      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      projets.forEach(projet => {
        if (category === 'all' || projet.classList.contains(category)) {
          projet.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
          projet.style.opacity = 1;
          projet.style.transform = 'translateY(0)';
          projet.style.display = 'block';
        } else {
          projet.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
          projet.style.opacity = 0;
          projet.style.transform = 'translateY(20px)';
          setTimeout(() => {
            projet.style.display = 'none';
          }, 400);
        }
      });
    });
  });

  // ----- Activation de la flèche "Retour en haut" -----
  const scrollToTopButton = document.querySelector('.scroll-to-top');

  window.addEventListener('scroll', () => {
    // Affiche ou masque la flèche
    if (window.scrollY > 200) {
      scrollToTopButton.classList.add('show');
    } else {
      scrollToTopButton.classList.remove('show');
    }

    // Changement de couleur selon la section claire
    const whiteSections = document.querySelectorAll('.section-blanche, .contact-section, .light-background');
    let isOverWhiteBackground = false;

    whiteSections.forEach(section => {
      const rect = section.getBoundingClientRect();
      const centerY = window.innerHeight - 50; // Position estimée de la flèche

      if (rect.top < centerY && rect.bottom > centerY) {
        isOverWhiteBackground = true;
      }
    });

    if (isOverWhiteBackground) {
      scrollToTopButton.classList.add('black');
    } else {
      scrollToTopButton.classList.remove('black');
    }
  });

  scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  // ----- Changement du style de la navbar selon le fond -----
  const navbar = document.querySelector('nav.navbar');
  const introSection = document.querySelector('.intro-home');

  window.addEventListener('scroll', () => {
    if (!navbar || !introSection) return;

    const introTop = introSection.getBoundingClientRect().top;

    if (introTop <= 0) {
      navbar.classList.add('navbar-light');
    } else {
      navbar.classList.remove('navbar-light');
    }
  });

  // ----- Changement dynamique des mots avec transition fluide -----
  const word1 = document.getElementById('word1');
  const word2 = document.getElementById('word2');
  const word3 = document.getElementById('word3');

  const words1 = ['fabulous', 'colorful', 'vibrant', 'creative'];
  const words2 = ['passion', 'enthusiasm', 'creativity', 'energy'];
  const words3 = ['my clients', 'you!', 'design lovers', 'creative minds'];

  let index1 = 0, index2 = 0, index3 = 0;

  function changeWords() {
    word1.classList.add('fade-out');
    word2.classList.add('fade-out');
    word3.classList.add('fade-out');

    setTimeout(() => {
      word1.textContent = words1[index1];
      word2.textContent = words2[index2];
      word3.textContent = words3[index3];

      word1.classList.remove('fade-out');
      word2.classList.remove('fade-out');
      word3.classList.remove('fade-out');

      word1.classList.add('fade-in');
      word2.classList.add('fade-in');
      word3.classList.add('fade-in');

      setTimeout(() => {
        word1.classList.remove('fade-in');
        word2.classList.remove('fade-in');
        word3.classList.remove('fade-in');
      }, 500);
    }, 500);

    index1 = (index1 + 1) % words1.length;
    index2 = (index2 + 1) % words2.length;
    index3 = (index3 + 1) % words3.length;
  }

  setInterval(changeWords, 4000);
  changeWords();

  // ----- Activation dynamique du lien de nav selon le scroll -----
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");
  const accueilLink = document.querySelector('a[href="#accueil"]');
  const quiJeSuisLink = document.querySelector('a[href="#qui-je-suis"]');

  accueilLink.classList.add("active");

  window.addEventListener("scroll", () => {
    let currentSection = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        currentSection = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });

    if (currentSection === "qui-je-suis") {
      quiJeSuisLink.classList.add("active");
      accueilLink.classList.remove("active");
    } else {
      accueilLink.classList.add("active");
      quiJeSuisLink.classList.remove("active");
    }
  });
});
