const CONTACTS = {
  telegram: "https://t.me/Janika_Milos",
  whatsapp: "https://wa.me/79643609330",
  instagram: "",
  phone: "+7 (964) 360-93-30",
  moscowAddress: "Садовническая, дом 5",
  spbAddress: "Каменноостровский проспект, 10, лит. Б",
};
const CONTACT_LABELS = { telegram: "Telegram", whatsapp: "WhatsApp", instagram: "Instagram" };

const bookingDialog = document.querySelector("#bookingDialog");
const consultationDialog = document.querySelector("#consultationDialog");
const contactDialog = document.querySelector("#contactDialog");
const equipmentDialog = document.querySelector("#equipmentDialog");
const brandsDialog = document.querySelector("#brandsDialog");
const contactDialogTitle = document.querySelector("#contactDialogTitle");
const contactDialogCopy = document.querySelector("#contactDialogCopy");

document.querySelectorAll(".js-book").forEach((button) => {
  button.addEventListener("click", () => bookingDialog.showModal());
});

document.querySelector(".js-booking-close").addEventListener("click", () => bookingDialog.close());

document.querySelectorAll(".js-consult").forEach((button) => {
  button.addEventListener("click", () => consultationDialog.showModal());
});

document.querySelectorAll(".js-consultation-close").forEach((button) => {
  button.addEventListener("click", () => consultationDialog.close());
});

document.querySelectorAll(".js-contact-close").forEach((button) => {
  button.addEventListener("click", () => contactDialog.close());
});

document.querySelectorAll(".js-equipment").forEach((button) => {
  button.addEventListener("click", () => equipmentDialog.showModal());
});

document.querySelectorAll(".js-equipment-close").forEach((button) => {
  button.addEventListener("click", () => equipmentDialog.close());
});

document.querySelectorAll(".js-brands").forEach((button) => {
  button.addEventListener("click", () => brandsDialog.showModal());
});

document.querySelectorAll(".js-brands-close").forEach((button) => {
  button.addEventListener("click", () => brandsDialog.close());
});

[bookingDialog, consultationDialog, contactDialog, equipmentDialog, brandsDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

const openContact = (contact, label = "Контакт") => {
  const url = CONTACTS[contact];
  if (url && /^https:\/\//i.test(url)) {
    window.open(url, "_blank", "noopener,noreferrer");
    return;
  }
  contactDialogTitle.textContent = `${label} пока не подключён`;
  contactDialogCopy.textContent = `Ссылка для связи через ${label} пока не указана.`;
  contactDialog.showModal();
};

document.querySelectorAll(".js-contact").forEach((button) => {
  button.addEventListener("click", () => {
    openContact(button.dataset.contact, CONTACT_LABELS[button.dataset.contact]);
  });
});

document.querySelectorAll(".js-consult-channel").forEach((button) => {
  button.addEventListener("click", () => {
    consultationDialog.close();
    openContact(button.dataset.contact, button.dataset.contactLabel);
  });
});

if (CONTACTS.phone) document.querySelector("#phoneDisplay").textContent = CONTACTS.phone;
if (CONTACTS.moscowAddress) document.querySelector("#moscowAddress").textContent = CONTACTS.moscowAddress;
if (CONTACTS.spbAddress) document.querySelector("#spbAddress").textContent = CONTACTS.spbAddress;

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

document.querySelectorAll(".reveal-words").forEach((element) => {
  const nodes = [...element.childNodes];
  let wordIndex = 0;
  element.replaceChildren();

  nodes.forEach((node) => {
    if (node.nodeName === "BR") {
      element.append(document.createElement("br"));
      return;
    }

    node.textContent.split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) {
        element.append(document.createTextNode(part));
        return;
      }

      const word = document.createElement("span");
      word.className = "word";
      word.style.setProperty("--word-index", wordIndex);
      word.textContent = part;
      element.append(word);
      wordIndex += 1;
    });
  });
});

const revealElements = document.querySelectorAll("[data-reveal], .reveal-words");

if (reducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => element.classList.add("is-visible"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8%", threshold: 0.12 },
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}
