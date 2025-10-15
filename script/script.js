let currentPage = "home";
let currentDonationAmount = 100;
let mobileMenuOpen = false;

function showPage(pageId) {
  // Hide all page
  const page = document.querySelectorAll(".page-content");
  page.forEach((page) => page.classList.remove("active"));

  // Show selected page
  const targetPage = document.getElementById(pageId + "-page");
  if (targetPage) {
    targetPage.classList.add("active");
    currentPage = pageId;

    // Update URL hash
    window.history.pushState({ page: pageId }, "", "#" + pageId);
  }

  // Close mobile menu if open
  if (mobileMenuOpen) {
    toggleMobileMenu();
  }

  // Scroll to top
  window.scrollTo(0, 0);
}

function toggleMobileMenu() {
  const menu = document.getElementById("mobile-menu");
  mobileMenuOpen = !mobileMenuOpen;
  menu.classList.toggle("hidden", !mobileMenuOpen);
}

function selectAmount(amount) {
  currentDonationAmount = amount;

  // Update button text
  const btn = document.getElementById("donateBtn");
  if (btn) btn.textContent = `Donate ${amount} Now`;

  // Update visual selection
  const options = document.querySelectorAll(".donation-option");
  options.forEach((option) => {
    option.classList.remove("active", "border-blue-500");
    option.classList.add("border-gray-200");
  });

  const selectedOption = document.querySelector(
    `[onclick="selectAmount(${amount})"]`
  );
  if (selectedOption) {
    selectedOption.classList.add("active", "border-blue-500");
    selectedOption.classList.remove("border-gray-200");
  }

  // Clear custom amount
  const customInput = document.getElementById("customAmount");
  if (customInput) customInput.value = "";
}

function selectCustomAmount() {
  const customInput = document.getElementById("customAmount");
  const amount = parseInt(customInput.value);

  if (amount && amount > 0) {
    selectAmount(amount);
  }
}

function processDonation() {
  // In a real implementation, this would redirect to a secure payment processor
  alert(
    `Thank you for your generous donation of ${currentDonationAmount}! You will be redirected to our secure payment processor.`
  );

  // Simulate redirect to payment processor
  // window.location.href = 'https://secure-payment-processor.com/donate?amount=' + currentDonationAmount;
}

// Handle browser back/forward buttons
window.addEventListener("popstate", function (event) {
  if (event.state && event.state.page) {
    showPage(event.state.page);
  }
});

// Handle page load with hash
window.addEventListener("load", function () {
  const hash = window.location.hash.substring(1);
  if (hash && document.getElementById(hash + "-page")) {
    showPage(hash);
  }
});

// Handle contact form submission
document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form data
      const formData = new FormData(contactForm);
      const data = {};
      for (let [key, value] of formData.entries()) {
        data[key] = value;
      }

      // Simulate form submission
      alert(
        "Thank you for your message! We will get back to you within 24 hours."
      );
      contactForm.reset();
    });
  }

  const header = document.getElementById("header");
  header.innerHTML = `
    <nav class="bg-white shadow-lg fixed w-full top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-16">
          <div class="flex items-center">
            <i class="fas fa-flag-usa text-blue-600 text-2xl mr-3"></i>
            <span class="font-bold text-xl text-gray-800"
              >Heroes Support Fund</span
            >
          </div>

          <!-- Desktop Navigation -->
          <div class="nav-desktop flex items-center space-x-8">
            <a
              href="/"
              class="text-gray-700 hover:text-blue-600 transition"
              >Home</a
            >
            <a
              href="/page/about.html"
              class="text-gray-700 hover:text-blue-600 transition"
              >About</a
            >
            <a
              href="/page/impact.html"
              class="text-gray-700 hover:text-blue-600 transition"
              >Our Impact</a
            >
            <a
              href="/page/stories.html"
              class="text-gray-700 hover:text-blue-600 transition"
              >Stories</a
            >
            <a
              href="/page/transparency.html"
              class="text-gray-700 hover:text-blue-600 transition"
              >Transparency</a
            >
            <a
              href="/page/donate.html"
              class="text-gray-700 hover:text-blue-600 transition"
              >
                <button
                    class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                    Donate Now
                </button>
            </a>
            
          </div>

          <!-- Mobile menu button -->
          <div class="block nav-mobile">
            <button onclick="toggleMobileMenu()" class="text-black">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="none" stroke="#2725c1" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path d="M5 5L19 19M5 19L19 5"><animate fill="freeze" attributeName="d" dur="0.4s" values="M5 5L19 19M5 19L19 5;M5 5L19 5M5 19L19 19"/></path><path d="M12 12H12" opacity="0"><animate fill="freeze" attributeName="d" begin="0.2s" dur="0.4s" values="M12 12H12;M5 12H19"/><set fill="freeze" attributeName="opacity" begin="0.2s" to="1"/></path></g></svg>
            </button>
          </div>
        </div>

        <!-- Mobile Navigation -->
        <div id="mobile-menu" class="hidden pb-4">
          <a
            href="/"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >Home</a
          >
          <a
            href="/page/about.html"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >About</a
          >
          <a
            href="/page/impact.html"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >Our Impact</a
          >
          <a
            href="/page/stories.html"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >Stories</a
          >
          <a
            href="/page/transparency.html"
            class="block px-4 py-2 text-gray-700 hover:bg-gray-100"
            >Transparency</a
          >
          <button
            onclick="window.location.href='/page/donate.html'"
            class="w-full text-left px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            Donate Now
          </button>
        </div>
      </div>
    </nav>
  `;

  const footer = document.getElementById("footer");
  footer.innerHTML = `
   <div class="max-w-6xl mx-auto px-4">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center mb-4">
              <i class="fas fa-flag-usa text-blue-400 text-2xl mr-3"></i>
              <span class="font-bold text-xl">Heroes Support Fund</span>
            </div>
            <p class="text-gray-300 mb-4">
              Supporting US military personnel and their families with dignity,
              respect, and immediate assistance when they need it most.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-white"
                ><i class="fab fa-facebook-f"></i
              ></a>
              <a href="#" class="text-gray-300 hover:text-white"
                ><i class="fab fa-twitter"></i
              ></a>
              <a href="#" class="text-gray-300 hover:text-white"
                ><i class="fab fa-instagram"></i
              ></a>
              <a href="#" class="text-gray-300 hover:text-white"
                ><i class="fab fa-linkedin-in"></i
              ></a>
            </div>
          </div>

          <div>
            <h3 class="font-bold text-lg mb-4">Quick Links</h3>
            <ul class="space-y-2 text-gray-300">
              <li>
                <a href="#" onclick="showPage('about')" class="hover:text-white"
                  >About Us</a
                >
              </li>
              <li>
                <a
                  href="#"
                  onclick="showPage('impact')"
                  class="hover:text-white"
                  >Our Impact</a
                >
              </li>
              <li>
                <a
                  href="#"
                  onclick="showPage('stories')"
                  class="hover:text-white"
                  >Success Stories</a
                >
              </li>
              <li>
                <a
                  href="#"
                  onclick="showPage('transparency')"
                  class="hover:text-white"
                  >Financial Transparency</a
                >
              </li>
              <li>
                <a
                  href="#"
                  onclick="showPage('contact')"
                  class="hover:text-white"
                  >Contact Us</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-lg mb-4">Legal</h3>
            <ul class="space-y-2 text-gray-300">
              <li>
                <a
                  href="#"
                  onclick="showPage('privacy')"
                  class="hover:text-white"
                  >Privacy Policy</a
                >
              </li>
              <li>
                <a href="#" onclick="showPage('terms')" class="hover:text-white"
                  >Terms of Service</a
                >
              </li>
              <li>
                <a
                  href="#"
                  onclick="showPage('nonprofit')"
                  class="hover:text-white"
                  >501(c)(3) Documentation</a
                >
              </li>
            </ul>
          </div>

          <div>
            <h3 class="font-bold text-lg mb-4">Contact</h3>
            <ul class="space-y-2 text-gray-300">
              <li>
                <i class="fas fa-envelope mr-2"></i
                >support@heroessupportfund.org
              </li>
              <li><i class="fas fa-phone mr-2"></i>1-800-555-HERO (4376)</li>
              <li>
                <i class="fas fa-map-marker-alt mr-2"></i>123 Veterans Way<br />Washington,
                DC 20001
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-700 pt-8">
          <div class="flex flex-col md:flex-row justify-between items-center">
            <p class="text-gray-400 mb-4 md:mb-0">
              &copy; 2024 Heroes Support Fund. All rights reserved.
            </p>
            <p class="text-gray-400 text-sm text-center md:text-right">
              <em
                >Heroes Support Fund is a private organization. It is not a part
                of the Department of Defense or any of its components and has no
                governmental status.</em
              >
            </p>
          </div>
        </div>
      </div>
  `;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add loading states and animations
window.addEventListener("load", function () {
  document.body.classList.add("loaded");
});

// Donation amount keyboard navigation
document.addEventListener("keydown", function (e) {
  if (currentPage === "donate") {
    const amounts = [25, 50, 100, 250];
    const currentIndex = amounts.indexOf(currentDonationAmount);

    if (e.key === "ArrowLeft" && currentIndex > 0) {
      selectAmount(amounts[currentIndex - 1]);
    } else if (e.key === "ArrowRight" && currentIndex < amounts.length - 1) {
      selectAmount(amounts[currentIndex + 1]);
    }
  }
});
