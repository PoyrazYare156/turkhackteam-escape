let terminal = document.getElementById("terminal");
let input = document.getElementById("input");
let scoreboard = document.getElementById("scores");
let username = "";
let score = 0;
let step = 0;

let players = {};

let filesByStep = [
  {
    "flag1.txt": "flag{html_sistemi}",
    "sifre1.dat": "VGVybWluYWwgYmFzaGFyaSBlZGlr" // base64
  },
  {
    "flag2.txt": "flag{komut_motoru}",
    "sifreli.txt": "Q29tdXQgdGVzZXJpIG5hcyB6YW1hbg=="
  },
  {
    "flag3.txt": "flag{ctf_simulasyon_finali}",
    "delete_me.js": "Zararlı kod: virüs.js"
  }
];

function currentFiles() {
  return filesByStep[step] || {};
}

function write(msg) {
  terminal.innerText += msg + "\n";
  terminal.scrollTop = terminal.scrollHeight;
}

function decodeBase64(s) {
  try {
    return atob(s);
  } catch {
    return "Hatalı base64!";
  }
}

function updateScoreboard() {
  let sorted = Object.entries(players).sort((a, b) => b[1] - a[1]);
  scoreboard.innerText = sorted.map(e => e[0] + ": " + e[1]).join("\n");
}

function processCommand(cmd) {
  const args = cmd.split(" ");
  const full = currentFiles();

  if (cmd.startsWith("login ")) {
    username = args[1];
    write("Hoş geldin, " + username);
    if (!players[username]) players[username] = 0;
    score = players[username];
    updateScoreboard();
  } else if (cmd === "ls") {
    write(Object.keys(full).join("    "));
  } else if (cmd.startsWith("cat ")) {
    let f = args[1];
    if (full[f]) write(full[f]);
    else write("❌ Dosya yok.");
  } else if (cmd.startsWith("decode ")) {
    let f = args[1];
    if (full[f]) {
      write("🔓 " + decodeBase64(full[f]));
      score += 10;
    } else write("❌ Dosya yok.");
  } else if (cmd.startsWith("rm ")) {
    let f = args[1];
    if (full[f]) {
      delete full[f];
      score += 10;
      write("🗑️ " + f + " silindi.");
    } else write("❌ Silinemedi.");
  } else if (cmd === "puan") {
    write(`🎯 Skorun: ${score}`);
  } else if (cmd === "exit") {
    write("📴 Oturum kapatıldı.");
    username = "";
    score = 0;
  } else if (cmd === "help") {
    write("login <k.adı>, ls, cat <dosya>, decode <dosya>, rm <dosya>, puan, exit");
  } else {
    write("❗ Komut tanınmadı.");
  }

  if (username) {
    players[username] = score;
    updateScoreboard();
    write(`📌 ${username} [${score} puan]`);
  }
}

function nextStep() {
  if (step < filesByStep.length - 1) {
    step++;
    write("➡️ Yeni görev yüklendi.");
  } else {
    write("📁 Tüm görevler tamamlandı.");
  }
}

function prevStep() {
  if (step > 0) {
    step--;
    write("↩️ Önceki göreve dönüldü.");
  } else {
    write("🛑 Başlangıçtayız.");
  }
}

input.addEventListener("keydown", function(e) {
  if (e.key === "Enter") {
    const cmd = input.value.trim();
    if (cmd) {
      write("> " + cmd);
      processCommand(cmd);
      input.value = "";
    }
  }
});

write("[THT TERMINAL v4.0] Komutlar için 'help' yazın. Puan sıralaması üstte gösterilir.\n");
