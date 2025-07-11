// Pastikan ini dijalankan setelah Firebase dan Firestore sudah di-load

window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  const mainContent = document.querySelector(".main-content");
  const loadingText = document.getElementById("loading-text");
  const nameElement = document.getElementById("dynamic-name");
  const visitorCount = document.getElementById("visitor-count");

  let dots = 0;
  const dotInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    loadingText.textContent = "Loading" + ".".repeat(dots);
  }, 400);

  // List teks animasi di header
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
      const pengunjungRef = firebase.firestore().collection("pengunjung").doc("total");
      const doc = await pengunjungRef.get();
      let count = doc.exists ? (doc.data().count || 0) : 0;
      count++;
      await pengunjungRef.set({ count });
      visitorCount.textContent = `👀 Total Pengunjung: ${count}`;
    } catch (e) {
      visitorCount.textContent = `👀 Total Pengunjung: Gagal`;
      console.error("Gagal mengambil data:", e);
    }
  }

  // Setelah loading selesai
  setTimeout(() => {
    clearInterval(dotInterval);
    loading.style.display = "none";
    mainContent.style.display = "block";
    startTyping();
    hitungPengunjung();
  }, 3000);
});
