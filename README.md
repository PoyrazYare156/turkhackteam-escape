# 🔐 Security Header Scanner

🛡️ Web sitelerinin HTTP güvenlik başlıklarını tarayan açık kaynaklı bir araç.

## 🚀 Özellikler

- HTTP Security Headers taraması
- Güvenlik puanı hesaplama (0–100)
- Risk seviyesi belirleme (Low / Medium / High)
- Eksik başlıklar için öneriler
- CSP zayıflık kontrolü (`unsafe-inline`, `*`, `nonce` vs.)
- PDF ve JSON rapor dışa aktarımı
- Toplu tarama (Bulk Scan) özelliği
- CSV çıktısı alma
- Tarama geçmişi (localStorage ile)

## 🌐 Canlı Yayın

GitHub Pages üzerinden yayınlamak için:

1. Bu repo'yu forkla veya indir
2. Dosyaları `main` branch'e yükle:
    - `index.html`
    - `style.css`
    - `app.js`
3. GitHub repo ayarlarından **Pages > Source: main branch > /root** olarak ayarla
4. Sayfan şu şekilde yayınlanacak:

```
https://kullaniciadiniz.github.io/security-header-scanner/
```

## 📷 Ekran Görüntüsü

![Preview](screenshot.png)

## 🛠️ Geliştiriciler İçin

Backend API geliştirmek istersen, `backend/` klasörü içinde:

- FastAPI ile çalışan bir servis var
- `/api/scan?url=https://site.com` endpoint’i ile JSON çıktısı döner
- Docker desteklidir

## 🤝 Katkıda Bulun

Pull request’ler ve geri bildirimler her zaman memnuniyetle karşılanır!

MIT Lisansı © 2025