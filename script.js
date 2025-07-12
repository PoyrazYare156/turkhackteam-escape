const terminal = document.getElementById('terminal');
const input = document.getElementById('command');
const scoreList = document.getElementById('scores');

let user = '';
let state = 0;
let score = 0;
let scoreboard = {};

function updateScoreboard() {
  scoreList.innerHTML = '';
  const sorted = Object.entries(scoreboard).sort((a, b) => b[1] - a[1]);
  sorted.forEach(([name, pts]) => {
    const li = document.createElement('li');
    li.textContent = `${name}: ${pts} puan`;
    scoreList.appendChild(li);
  });
}

function append(text) {
  terminal.innerHTML += text + '\n\n>';
  window.scrollTo(0, document.body.scrollHeight);
}

function process(cmd) {
  cmd = cmd.trim();

  if (user === '') {
    if (cmd.startsWith("login ")) {
      user = cmd.split(" ")[1];
      scoreboard[user] = 0;
      append("✅ Giriş yapıldı: " + user + "\nKomut: connect web.server");
      updateScoreboard();
    } else {
      append("Lütfen giriş yap: login kullanıcı_adı");
    }
    return;
  }

  if (cmd === "yardım") {
    append("Komutlar:
connect web.server
ls
cat hint.txt
7z x secure.zip
cat flag.txt
exit");
    return;
  }

  if (state === 0 && cmd === "connect web.server") {
    state++;
    score += 5;
    append("🌐 Web sunucusuna bağlanıldı. Komut: ls");
  } else if (state === 1 && cmd === "ls") {
    state++;
    score += 5;
    append("📂 Dosyalar bulundu:
- hint.txt
- secure.zip");
  } else if (state === 2 && cmd === "cat hint.txt") {
    state++;
    score += 10;
    append("🧠 İpucu: Parola sistemdeki kullanıcı adının tersidir.");
  } else if (state === 3 && cmd === `7z x secure.zip -p${user.split('').reverse().join('')}`) {
    state++;
    score += 15;
    append("🔓 Şifreli dosya başarıyla açıldı. Komut: cat flag.txt");
  } else if (state === 4 && cmd === "cat flag.txt") {
    state++;
    score += 10;
    append("🎉 FLAG: THT{encrypted_zip_successfully_extracted}. Komut: exit");
  } else if (state === 5 && cmd === "exit") {
    score += 5;
    scoreboard[user] = score;
    updateScoreboard();
    append("🏁 Görev tamamlandı. Toplam puan: " + score);
    input.disabled = true;
  } else {
    append("⛔ Geçersiz veya sırasız komut. 'yardım' yaz.");
  }
}

input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const command = input.value;
    terminal.innerHTML += "> " + command + "\n";
    input.value = '';
    process(command);
  }
});
