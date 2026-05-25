# 🚀 BAŞLA - StarLobby Kurulum ve Çalıştırma

## İlk Adım: ZIP Dosyasını Açın

1. `StarLobby.zip` dosyasını sağ tıkla
2. "Tümünü Çıkart" (Extract All) seç
3. `StarLobby` klasörünü bir yere kaydet

## İkinci Adım: Terminal Aç

Proje klasörü içinde:
- Windows: `Shift + Sağ Tıkla` → "PowerShell Penceresini Aç"
- Mac/Linux: `Terminal`

Komut:
```bash
cd StarLobby
```

## Üçüncü Adım: Bağımlılıkları Yükle

```bash
npm install
```

(İlk kez 2-3 dakika sürebilir)

## Dördüncü Adım: Uygulamayı Çalıştır

```bash
npm run dev
```

**Tarayıcı otomatik açılacak!** 🎉

## 📝 Yapacak İşler

### Giriş Yapmak
1. "Kayıt Ol" butonuna tıkla
2. Email ve parola gir
3. "Kayıt Ol" butonuna tıkla
4. Giriş yap!

### Takım Oluşturmak
1. "Yeni Takım Oluştur" formunu doldur
2. Takım adı gir
3. "Oluştur" butonuna tıkla (kod otomatik oluşacak)
4. Küpalar ve açıklama ekle
5. "Takımı Oluştur"a tıkla

### Takıma Katılmak
1. "Takıma Katıl" kısmına takım kodunu gir
2. "Ara" butonuna tıkla
3. Takım görünürse "Katıl"a tıkla

### Tema Değiştirmek
Sağ üsttte 🌙 (gece) veya ☀️ (gündüz) butonuna tıkla!

## 🎨 Özelleştirme

### Renkleri Değiştirebilir misin?
Evet! `src/styles/main.css` dosyasını aç ve renkleri değiştir:

```css
:root {
  --primary-color: #3b82f6;  /* Mavi - Değiştir! */
  --success-color: #10b981;  /* Yeşil - Değiştir! */
}
```

### Firebase Ayarları
Kendi Firebase projeni kullanmak için:
1. https://console.firebase.google.com git
2. Yeni proje oluştur
3. Web uygulaması ekle
4. `src/firebase.js` dosyasını güncelle

## 🐛 Sorun mu Var?

### "npm: komut bulunamadı"
- Node.js yüklenmiş mi? https://nodejs.org
- Kurulduktan sonra terminali yeniden aç

### "EADDRINUSE" hatası
5173 portu kullanımda. Komutu dene:
```bash
npm run dev -- --port 3000
```

### "Cannot find module"
Terminalde:
```bash
rm -rf node_modules
npm install
```

## 📦 Üretim İçin Derleme

Hazır mı deploy etmeye?

```bash
npm run build
```

Bu komut `dist/` klasörüne hazır dosyalar koyar.

### Nereye Deploy Edebilirim?

- **Vercel**: Ücretsiz, çok kolay, React için perfect
- **Firebase Hosting**: Firebase kullanıyorsan ideal
- **Netlify**: Ücretsiz, basit drag-drop deploy

## 📋 Kontrol Listesi

Başlangıçta kontrol et:
- [ ] Node.js yüklü mü? (`node --version`)
- [ ] npm yüklü mü? (`npm --version`)
- [ ] StarLobby klasöründe misin?
- [ ] `npm install` tamamlandı mı?
- [ ] `npm run dev` çalışıyor mu?

## 🎯 Sonraki Adımlar

1. Uygulamayı test et
2. Takım oluştur ve katıl
3. Tema değiştir
4. CSS'i özelleştir
5. Kendi Firebase config'ini ekle
6. Deploy et!

## 💬 İhtiyac Duyarsan

- **Kodda hata?** Tarayıcı console'unu aç (F12) - orada hata mesajı olacak
- **Firebase sorusu?** https://firebase.google.com/docs
- **React sorusu?** https://react.dev

## 🎉 Hepsi Bu!

Başarılar! Siteni geliştir, Firebase kurallarını ayarla, ve deploy et!

---

**Not**: İlk kez `npm install` 2-3 dakika alabilir - sabırlı ol! ☕

