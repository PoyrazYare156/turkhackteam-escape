const terminal = document.getElementById("terminal");
const input = document.getElementById("commandInput");
const scoreList = document.getElementById("scoreList");
let loggedIn = false;
let username = "";
let score = 0;

function addLine(text) {
    terminal.textContent += "\n" + text;
    terminal.scrollTop = terminal.scrollHeight;
}

function updateScoreboard() {
    scoreList.innerHTML = `<li><b>${username}</b>: ${score} puan</li>`;
}

input.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        const command = input.value.trim();
        input.value = "";
        addLine("> " + command);

        if (!loggedIn) {
            if (command.startsWith("login ")) {
                username = command.split(" ")[1];
                loggedIn = true;
                addLine("Hoş geldin, " + username + "!");
                addLine("Görev: şifreli dosyayı bul ve çöz!");
                score = 0;
                updateScoreboard();
            } else {
                addLine("Lütfen önce login kullanıcı_adı komutunu kullan.");
            }
            return;
        }

        // Komutlar
        if (command === "ls") {
            addLine("dosya1.txt  flag1.txt  sifreli_veri.dat");
        } else if (command === "cat flag1.txt") {
            addLine("flag{ilk_gorev_basarili}");
            score += 10;
            updateScoreboard();
        } else if (command === "cat sifreli_veri.dat") {
            addLine("U29sdSBzaWZyZSBkb3N5YQ==  // ipucu: base64");
        } else if (command === "decode U29sdSBzaWZyZSBkb3N5YQ==") {
            addLine("Çözüm: solu sifre dosya");
            score += 10;
            updateScoreboard();
        } else if (command === "rm -rf sifreli_veri.dat") {
            addLine("Dosya silindi.");
            score += 5;
            updateScoreboard();
        } else if (command === "exit") {
            addLine("Sistemden çıkılıyor...");
            loggedIn = false;
            username = "";
        } else {
            addLine("Komut tanınmadı.");
        }
    }
});
