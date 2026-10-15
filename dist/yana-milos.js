const CONTACTS = {
  telegram: "",
  whatsapp: "",
  instagram: "",
  phone: "+7 (964) 360-93-30",
  moscowAddress: "",
  spbAddress: "",
};

const bookingDialog = document.querySelector("#bookingDialog");
const contactDialog = document.querySelector("#contactDialog");

document.querySelectorAll(".js-book").forEach((button) => {
  button.addEventListener("click", () => bookingDialog.showModal());
});

document.querySelector(".js-booking-close").addEventListener("click", () => bookingDialog.close());

document.querySelectorAll(".js-contact-close").forEach((button) => {
  button.addEventListener("click", () => contactDialog.close());
});

[bookingDialog, contactDialog].forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
});

document.querySelectorAll(".js-contact").forEach((button) => {
  button.addEventListener("click", () => {
    const url = CONTACTS[button.dataset.contact];
    if (url && /^https:\/\//i.test(url)) {
      window.open(url, "_blank", "noopener,noreferrer");
      return;
    }
    contactDialog.showModal();
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
