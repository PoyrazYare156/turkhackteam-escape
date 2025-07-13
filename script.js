const input = document.getElementById("commandInput");
const output = document.getElementById("output");
const userList = document.getElementById("userList");

let currentUser = "";
let score = {};
let stage = 0;

const files = ["dosya1.txt", "flag1.txt", "sifreli_veri.dat"];

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const command = input.value.trim();
    input.value = "";
    processCommand(command);
  }
});

function print(text) {
  output.innerText += "\n" + text;
  output.scrollTop = output.scrollHeight;
}

function updateScore() {
  userList.innerHTML = "";
  for (let user in score) {
    userList.innerHTML += `<li>• ${user}: ${score[user]} puan</li>`;
  }
}

function processCommand(command) {
  print("> " + command);

  if (command.startsWith("login ")) {
    currentUser = command.split(" ")[1];
    score[currentUser] = 0;
    print(`Hoş geldin, ${currentUser}!\nGörev: şifreli dosyayı bul ve çöz!`);
    updateScore();
  } else if (!currentUser) {
    print("Lütfen önce login kullanıcı_adı komutunu kullan.");
  } else if (command === "ls") {
    print(files.join("    "));
  } else if (command.startsWith("cd ")) {
    print("📁 Dizin değiştirildi: " + command.split(" ")[1]);
  } else if (command.startsWith("cat ")) {
    const fileName = command.split(" ")[1];
    if (files.includes(fileName)) {
      print(`${fileName} içeriği: ${fileName === "flag1.txt" ? "FLAG{THT_CYBER}" : "Lorem ipsum..."}`);
    } else {
      print("Böyle bir dosya yok.");
    }
  } else if (command.startsWith("sil ")) {
    const fileName = command.split(" ")[1];
    if (files.includes(fileName)) {
      print(`${fileName} başarıyla silindi!`);
      files.splice(files.indexOf(fileName), 1);
      score[currentUser] += 100;
      updateScore();
    } else {
      print("Silinecek dosya bulunamadı.");
    }
  } else if (command === "clear") {
    output.innerText = "";
  } else {
    print("Komut tanınmadı.");
  }
}
