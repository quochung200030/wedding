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
const weddingDate = new Date("2026-01-24T11:00:00");

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

// Lời chúc slide + fade in/out
async function loadWishesFromCSV() {
  const csvUrl = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRG_77ZsZ1LmkMqv1Dda9ICZe7_ImAll66BvjenW_p0zbfuosw-2J9gL1A3wmHvAgTZWD1DGhjnNSEP/pub?gid=172870827&single=true&output=csv";

  try {
    const res = await fetch(csvUrl);
    const text = await res.text();
    const rows = text.split('\n').slice(1);

    const wishes = [];
    rows.forEach(line => {
      const parts = line.split(/,(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/);
      if (!parts || parts.length < 3) return;
      const name = parts[1]?.replace(/^\"|\"$/g, '').trim() || "Ẩn danh";
      const message = parts[2]?.replace(/^\"|\"$/g, '').trim() || "";
      wishes.push({ name, message });
    });

    const board = document.getElementById("wish-board");
    if (!board) return;
    let current = 0;

    function showWish(idx, fadeType = "in") {
      board.classList.remove("fade-in-wish", "fade-out-wish");
      void board.offsetWidth; // force reflow for animation restart
      if (fadeType === "in") {
        board.innerHTML = `
          <div style="margin: 1rem auto; padding: 1rem; border: 1px dashed #ccc; border-radius: 8px; max-width: 600px; background-color: #fffdf8; min-height: 60px;">
            <strong>${wishes[idx].name}</strong>: ${wishes[idx].message}
          </div>
        `;
        board.classList.add("fade-in-wish");
      } else {
        board.classList.add("fade-out-wish");
      }
    }

    if (wishes.length > 0) {
      showWish(current, "in");
      setInterval(() => {
        showWish(current, "out");
        setTimeout(() => {
          current = (current + 1) % wishes.length;
          showWish(current, "in");
        }, 400); // thời gian fade out (ms)
      }, 5000); // đổi slide mỗi 5 giây
    } else {
      board.innerText = "Chưa có lời chúc nào.";
    }
  } catch (err) {
    console.error("Lỗi tải lời chúc:", err);
    const board = document.getElementById("wish-board");
    if (board) board.innerText = "Không thể tải lời chúc. Vui lòng thử lại sau.";
  }
}

window.addEventListener("load", loadWishesFromCSV);

// Fade in section khi xuất hiện trong viewport
document.querySelectorAll('section').forEach(section => {
  section.classList.add('fade-section');
});

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
    } else {
      entry.target.classList.remove('active');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});
const menuToggle = document.getElementById('menu-toggle');
const navUl = document.querySelector('nav ul');

if(menuToggle && navUl) {
  menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
  });
}

