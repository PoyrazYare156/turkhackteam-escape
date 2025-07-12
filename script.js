const terminal = document.getElementById("terminal");
const input = document.getElementById("cmdInput");

const responses = {
    "clear /var/log": "[✓] Loglar temizlendi",
    "shred -u session.log": "[✓] session.log başarıyla yok edildi",
    "proxy_chain -jump tor,swiss,russia": "[✓] IP adresiniz başarıyla maskelendi",
    "exit": "[✓] Sistemden çıkılıyor...\nBağlantı sonlandırıldı. PY protokolü tamamlandı.",
};

input.addEventListener("keydown", function(e) {
    if (e.key === "Enter") {
        const cmd = input.value.trim();
        terminal.innerHTML += "\n> " + cmd;
        if (responses[cmd]) {
            terminal.innerHTML += "\n" + responses[cmd];
        } else {
            terminal.innerHTML += "\nKomut tanınmadı.";
        }
        input.value = "";
        window.scrollTo(0, document.body.scrollHeight);
    }
});