window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  const mainContent = document.querySelector(".main-content");
  const loadingText = document.getElementById("loading-text");

  let dots = 0;
  const dotInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    loadingText.textContent = "Loading" + ".".repeat(dots);
  }, 500);

  setTimeout(() => {
    clearInterval(dotInterval);
    loading.style.display = "none";
    mainContent.style.display = "block";
    startTyping();
    hitungPengunjung();
  }, 3000);

  const roles = [
    "Welcome Sobat Coding",
    "Di Website",
    "Aiss Hosting",
    "Ini Dia Portofolio",
    "Dengan Tentang",
    "Codingan Bot",
    "Website",
    "Dan Banyak Lagi"
  ];
  const nameElement = document.getElementById("dynamic-name");
  let roleIndex = 0, charIndex = 0, typingForward = true;

  function startTyping() {
    setInterval(() => {
      const currentText = roles[roleIndex];
      if (typingForward) {
        charIndex++;
        if (charIndex > currentText.length) typingForward = false;
      } else {
        charIndex--;
        if (charIndex === 0) {
          typingForward = true;
          roleIndex = (roleIndex + 1) % roles.length;
        }
      }
      nameElement.textContent = currentText.substring(0, charIndex) + "|";
    }, 100);
  }

  async function hitungPengunjung() {
    try {
      const pengunjungRef = db.collection("pengunjung").doc("total");
      const doc = await pengunjungRef.get();
      let count = doc.exists ? doc.data().count || 0 : 0;
      count++;
      await pengunjungRef.set({ count });
      document.getElementById("visitor-count").textContent = `👀 Total Pengunjung: ${count}`;
    } catch (e) {
      document.getElementById("visitor-count").textContent = `👀 Total Pengunjung: Gagal`;
      console.error("Error:", e);
    }
  }
});