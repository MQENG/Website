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

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const companyName = document.getElementById("company-name").value;
  const contactName = document.getElementById("contact-name").value;
  const contactEmail = document.getElementById("contact-email").value;
  const contactPhone = document.getElementById("contact-phone").value;
  const companyWebsite = document.getElementById("company-website").value;
  const sponsorshipAmount = document.getElementById("sponsorship-amount").value;
  const additionalInfo = document.getElementById("additional-info").value;
  const merchandise = document.querySelector('input[name="merchandise"]:checked').value;
  const banners = document.querySelector('input[name="banners"]:checked').value;
  const companyLogoInput = document.getElementById("company-logo");

  let domain = "";
  try {
    if (companyWebsite) {
      const urlObj = new URL(companyWebsite);
      domain = urlObj.hostname;
    }
  } catch (error) {
    domain = companyWebsite;
  }

  const embed = {
    title: `${companyName} | ${domain}`,
    thumbnail: {
      url: companyLogoInput.files[0] ? `attachment://${companyLogoInput.files[0].name}` : ""
    },
    fields: [
      {
        name: "Contact Person",
        value: contactName,
        inline: true
      },
      {
        name: "Contact Email",
        value: contactEmail,
        inline: true
      },
      {
        name: "Contact Phone",
        value: contactPhone || "N/A",
        inline: true
      },
      {
        name: "Company Website",
        value: companyWebsite || "N/A",
        inline: true
      },
      {
        name: "Sponsorship Amount Offered",
        value: `$${sponsorshipAmount}`,
        inline: true
      },
      {
        name: "Promotional Items",
        value: `Merchandise: ${merchandise}\nBanners: ${banners}`,
        inline: false
      },
      {
        name: "Additional Information",
        value: additionalInfo || "None",
        inline: false
      }
    ],
    color: 3447003
  };

  const payload = new FormData();
  const jsonPayload = JSON.stringify({
    embeds: [embed]
  });
  payload.append("payload_json", jsonPayload);
  if (companyLogoInput.files[0]) {
    payload.append("file", companyLogoInput.files[0]);
  }

  const webhookURL = "https://discord.com/api/webhooks/1348887888506388522/GZiC6MIvFsvIJ-U9BDhrchWeCApB4zxFObtg_vlNSSUpuox1cKwb_CMNK9FYDYphP10Q";

  try {
    const response = await fetch(webhookURL, {
      method: "POST",
      body: payload
    });

    if (response.ok) {
      alert("Sponsorship inquiry submitted successfully!");
      e.target.reset();
    } else {
      alert("There was an error submitting your inquiry. Please try again later.");
    }
  } catch (error) {
    console.error("Error posting to Discord webhook:", error);
    alert("There was an error submitting your inquiry. Please try again later.");
  }
});
