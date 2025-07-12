THT CTF TERMINAL v17 - Kullanım Rehberi

📁 Dosya Yapısı:
- index.html  → Terminal arayüzü
- script.js   → Terminal komut kontrolü ve görev yönetimi
- readme.txt  → Bu kullanım kılavuzu

🎯 AMAÇ:
Kullanıcının bir şifreli dosyayı (ZIP) ipucu yardımıyla açmasını sağlamak.
Komutlar gerçek terminal yapısına benzetilmiştir.

🔑 GÖREV AKIŞI:
1. login kullanıcı_adı
   → Terminale giriş yapılır. (örnek: login poyrazyare)

2. connect web.server
   → Hedef sisteme bağlanılır.

3. ls
   → Sunucudaki dosyalar listelenir (hint.txt ve secure.zip görünür)

4. cat hint.txt
   → Şifre için ipucu verilir: “Parola kullanıcı adının tersidir”

5. 7z x secure.zip -p{ters_kullanıcı_adı}
   → ZIP dosyasını parola ile açar. (örnek: 7z x secure.zip -perazyaryop)

6. cat flag.txt
   → FLAG dosyası görüntülenir: THT{encrypted_zip_successfully_extracted}

7. exit
   → Görev tamamlanır ve toplam puan yazdırılır.

💡 Not:
- Tüm komutlar sıralı çalışır. Önceki adım yapılmazsa sonraki geçerli sayılmaz.
- Komut sıralamasını görmek için 'yardım' yazabilirsin.
