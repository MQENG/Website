function toggleNav() {
    const navLinks = document.getElementById("navLinks");
    if (navLinks.style.display === "flex") {
      navLinks.style.display = "none";
    } else {
      navLinks.style.display = "flex";
    }
  }
  
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
  
  const form = document.querySelector("form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      console.log("Form submission:", { name, email, message });
      alert("Thank you for reaching out! We'll get back to you soon.");
      form.reset();
    });
  }
  