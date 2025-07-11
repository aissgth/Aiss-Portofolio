window.addEventListener("load", () => {
  const loading = document.getElementById("loading-screen");
  const mainContent = document.querySelector(".main-content");
  const loadingText = document.getElementById("loading-text");

  // Loading dots animation
  let dots = 0;
  const dotInterval = setInterval(() => {
    dots = (dots + 1) % 4;
    loadingText.textContent = "Loading" + ".".repeat(dots);
  }, 500);

  // Setelah loading selesai
  setTimeout(() => {
    clearInterval(dotInterval);
    loading.style.display = "none";
    mainContent.style.display = "block";
    startTyping();
    hitungPengunjung();
  }, 3000);

  // Typing Effect
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
  let roleIndex = 0;
  let charIndex = 0;
  let typingForward = true;

  function startTyping() {
    setInterval(() => {
      const currentText = roles[roleIndex];
      if (typingForward) {
        charIndex++;
        if (charIndex === currentText.length + 1) typingForward = false;
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

  // Hitung Pengunjung Firestore
  async function hitungPengunjung() {
    const pengunjungRef = db.collection("pengunjung").doc("total");
    try {
      const doc = await pengunjungRef.get();
      if (doc.exists) {
        const count = doc.data().count + 1;
        await pengunjungRef.set({ count });
        document.getElementById("visitor-count").textContent = `👀 Total Pengunjung: ${count}`;
      } else {
        await pengunjungRef.set({ count: 1 });
        document.getElementById("visitor-count").textContent = `👀 Total Pengunjung: 1`;
      }
    } catch (err) {
      console.error("Gagal hitung pengunjung:", err);
    }
  }
});