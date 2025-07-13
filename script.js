
let output = document.getElementById("output");
let input = document.getElementById("commandInput");
let scoreList = document.getElementById("scoreList");
let user = "";
let loggedIn = false;
let score = 0;
let files = {
  "flag1.txt": "FLAG{GOREV1_TAMAMLANDI}",
  "gorev.txt": "Görev: flag1.txt dosyasını bul ve içeriğini oku.",
  "encoded.dat": "U0VDRVJfREFUQQ=="
};

function printOutput(text) {
  output.innerText += "\n" + text;
  output.scrollTop = output.scrollHeight;
}

function updateScoreboard() {
  scoreList.innerHTML = `<li><b>${user}</b>: ${score} puan</li>`;
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let cmd = input.value.trim();
    input.value = "";
    output.innerText += `\n> ${cmd}`;
    handleCommand(cmd);
  }
});

function handleCommand(cmd) {
  if (cmd.startsWith("login ")) {
    user = cmd.split(" ")[1];
    loggedIn = true;
    printOutput(`Hoş geldin ${user}, göreve hazırsın! "help" yazarak komutları görebilirsin.`);
    updateScoreboard();
    return;
  }

  if (!loggedIn) {
    printOutput("Lütfen önce login kullanıcı_adı komutunu kullan.");
    return;
  }

  if (cmd === "help") {
    printOutput("Komutlar: ls, cat dosya, decode dosya, puan, clear, help");
  } else if (cmd === "ls") {
    printOutput(Object.keys(files).join("    "));
  } else if (cmd.startsWith("cat ")) {
    let fileName = cmd.split(" ")[1];
    if (files[fileName]) {
      printOutput(`${fileName} içeriği: ${files[fileName]}`);
      if (fileName === "flag1.txt") {
        printOutput("✓ Tebrikler! FLAG bulundu. +100 puan.");
        score += 100;
        updateScoreboard();
      }
    } else {
      printOutput("Dosya bulunamadı.");
    }
  } else if (cmd.startsWith("decode ")) {
    let fileName = cmd.split(" ")[1];
    if (fileName === "encoded.dat") {
      printOutput("Çözüldü: SECRE_DATA");
      score += 50;
      updateScoreboard();
    } else {
      printOutput("Şifreli dosya bulunamadı.");
    }
  } else if (cmd === "puan") {
    printOutput(`Toplam puan: ${score}`);
  } else if (cmd === "clear") {
    output.innerText = "[CTFverse Siber Görev Terminali]\nlogin kullanıcı_adı yazarak başla...";
  } else {
    printOutput("Komut tanınmadı. 'help' yaz.");
  }
}
