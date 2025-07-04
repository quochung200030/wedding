// Tắt / bật nhạc
const music = document.getElementById('bg-music');
const toggleBtn = document.getElementById('music-toggle');
let isPlaying = false;
music.pause();
toggleBtn.textContent = '🔇 Bật nhạc';

toggleBtn.addEventListener('click', () => {
  if (isPlaying) {
    music.pause();
    toggleBtn.textContent = '🔇 Bật nhạc';
  } else {
    music.play();
    toggleBtn.textContent = '🔊 Tắt nhạc';
  }
  isPlaying = !isPlaying;
});

// Loader ẩn khi load xong trang
window.addEventListener("load", () => {
  document.getElementById("loader").style.display = "none";
  createFallingFlowers();
});

// Tạo hiệu ứng hoa rơi
function createFallingFlowers() {
  const flowerColors = ['#FFC0CB', '#FF69B4', '#FFA07A', '#FFB6C1'];

  for (let i = 0; i < 20; i++) {
    const flower = document.createElement('div');
    flower.innerHTML = '🌸';
    flower.style.position = 'fixed';
    flower.style.top = '-50px';
    flower.style.left = Math.random() * window.innerWidth + 'px';
    flower.style.fontSize = (Math.random() * 20 + 20) + 'px';
    flower.style.opacity = Math.random();
    flower.style.animation = `fall ${5 + Math.random() * 5}s linear infinite`;
    flower.style.zIndex = 999;
    document.body.appendChild(flower);
  }
}
// COUNTDOWN
const countdownEl = document.getElementById('countdown');

// Ngày cưới: 24/01/2026, 17:30
const weddingDate = new Date("2026-01-24T17:30:00");

function updateCountdown() {
  const now = new Date();
  const diff = weddingDate - now;

  if (diff <= 0) {
    countdownEl.innerHTML = "🎉 Hôn lễ đã diễn ra!";
    clearInterval(timer);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const seconds = Math.floor(diff / 1000) % 60;

  countdownEl.innerHTML = `⏳ Còn ${days} ngày ${hours} giờ ${minutes} phút ${seconds} giây`;
}

updateCountdown(); // gọi 1 lần đầu
const timer = setInterval(updateCountdown, 1000); // gọi mỗi giây

async function loadWishesFromCSV() {
  const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRG_77ZsZ1LmkMqv1Dda9ICZe7_ImAll66BvjenW_p0zbfuosw-2J9gL1A3wmHvAgTZWD1DGhjnNSEP/pub?gid=172870827&single=true&output=csv";

  try {
    const res = await fetch(csvUrl);
    const text = await res.text();
    const rows = text.split('\n').slice(1); // bỏ dòng tiêu đề

    const board = document.getElementById("wish-board");
    if (!board) return;
    board.innerHTML = "";

    rows.forEach(line => {
      const parts = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/); // tách theo dấu phẩy ngoài dấu nháy
      if (!parts || parts.length < 3) return;

      const name = parts[1]?.replace(/^\"|\"$/g, '').trim() || "Ẩn danh";
      const message = parts[2]?.replace(/^\"|\"$/g, '').trim() || "";

      const div = document.createElement("div");
      div.style.margin = "1rem auto";
      div.style.padding = "1rem";
      div.style.border = "1px dashed #ccc";
      div.style.borderRadius = "8px";
      div.style.maxWidth = "600px";
      div.style.backgroundColor = "#fffdf8";
      div.innerHTML = `<strong>${name}</strong>: ${message}`;
      board.appendChild(div);
    });
  } catch (err) {
    console.error("Lỗi tải lời chúc:", err);
    const board = document.getElementById("wish-board");
    if (board) board.innerText = "Không thể tải lời chúc. Vui lòng thử lại sau.";
  }
}

window.addEventListener("load", loadWishesFromCSV);
