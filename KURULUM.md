# 📋 StarLobby - Hızlı Kurulum Rehberi

## Proje Yapısı

```
StarLobby/
├── src/
│   ├── components/              # React bileşenleri
│   │   ├── App.jsx             # Ana uygulama
│   │   ├── Login.jsx           # Giriş ekranı
│   │   ├── Register.jsx        # Kayıt ekranı
│   │   ├── Dashboard.jsx       # Ana panel
│   │   ├── TeamCreation.jsx    # Takım oluşturma
│   │   └── JoinTeam.jsx        # Takıma katılma
│   ├── styles/
│   │   └── main.css            # Tüm CSS stilleri (Light/Dark Mode)
│   ├── utils/
│   │   └── helpers.js          # Yardımcı fonksiyonlar
│   ├── firebase.js             # Firebase yapılandırması
│   └── main.jsx                # React entry point
├── index.html                  # HTML entry point
├── vite.config.js              # Vite yapılandırması
├── package.json                # Bağımlılıklar
├── .gitignore                  # Git görmez dosyalar
├── .env.example                # Environment örneği
└── README.md                   # Detaylı dokümantasyon
```

## 🎯 Ana Özellikler Neler?

1. **Kimlik Doğrulaması** - Email/password ile güvenli kayıt ve giriş
2. **Takım Yönetimi** - Yeni takım oluşturma, takıma katılma
3. **Real-time Sync** - Firestore ile anında veri güncellemeleri
4. **Responsive Design** - Mobil, tablet ve masaüstü desteği
5. **Light/Dark Mode** - Tema değiştirebilir arayüz
6. **Google Ads Alanları** - Sol, sağ ve alt alanlarda reklam alanları
7. **Profesyonel CSS** - Sade ama güzel tasarım

## 🚀 Hızlı Başlangıç

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlatın
```bash
npm run dev
```

### 3. Tarayıcıda Açın
```
http://localhost:5173
```

## 🔧 Yapılandırma

### Firebase Ayarları
`src/firebase.js` içindeki yapılandırma zaten ayarlanmıştır ve çalışmaya hazırdır.

Kendi Firebase projesini kullanmak için:
1. [Firebase Console](https://console.firebase.google.com) açın
2. Web app ekleyin
3. Config değerlerini kopyalayın
4. `src/firebase.js` içine yapıştırın

### CSS Tema
`src/styles/main.css` içinde CSS değişkenleri tanımlıdır:
- Primary Color: `--primary-color`
- Background: `--bg-color`
- Text Color: `--text-color`
- Gece Modu: `body.dark-mode` class'ı

## 📱 Mobil Optimizasyonu

- Responsive grid layout (1 sütun mobilde, 3 sütun masaüstüde)
- Touch-friendly butonlar ve formlar
- Mobil menü için toggle button
- Tablet optimizasyonu
- Google Ads alanları mobilde gizlenir

## 🌐 Google Ads Entegrasyonu

Üç reklam alanı bulunmaktadır:

```html
<!-- Sol Alan (Vertical) -->
<div class="ad-container ad-left">
  <!-- Google Ad Code Here -->
</div>

<!-- Sağ Alan (Vertical) -->
<div class="ad-container ad-right">
  <!-- Google Ad Code Here -->
</div>

<!-- Alt Alan (Mobile) -->
<div class="ad-container mobile-ad">
  <!-- Google Ad Code Here -->
</div>
```

## 📦 Üretim İçin Derleme

```bash
npm run build
```

Derlenmiş dosyalar `dist/` klasöründe olacaktır.

## 🚀 Deployment

### Vercel
```bash
npm install -g vercel
vercel
```

### Firebase Hosting
```bash
npm install -g firebase-tools
firebase init
firebase deploy
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🎨 CSS Sınıfları

### Butonlar
- `.btn` - Temel buton
- `.btn-primary` - Mavi buton
- `.btn-secondary` - Gri buton
- `.btn-success` - Yeşil buton
- `.btn-block` - Tam genişlik

### Kartlar
- `.card` - Standart kart
- `.team-card` - Takım kartı (gradient)

### Mesajlar
- `.error-message` - Kırmızı hata mesajı
- `.success-message` - Yeşil başarı mesajı

### Responsive
- `.hidden` - Gizle
- `.text-muted` - Soluk metin
- `.text-center` - Merkez hizala
- `.mt-1, .mt-2, .mt-3, .mt-4` - Üst margin
- `.mb-1, .mb-2, .mb-3, .mb-4` - Alt margin

## 🔐 Güvenlik İpuçları

1. Firebase API key halka açıktır - bu normal
2. Production'da `.env` dosyalarını `.gitignore` da tutun
3. Firestore kurallarını ayarlayın (`.env.example` bkz)
4. Regular security audits yapın

## 📚 Kaynaklar

- [React](https://react.dev)
- [Firebase](https://firebase.google.com)
- [Vite](https://vitejs.dev)
- [CSS Variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)

## 💡 İpuçları

- Tema tercihleri localStorage'de saklanır
- Teams gerçek zamanlı Firestore'dan yüklenir
- Mobilde Google Ads alanları otomatik gizlenir
- Tüm formlar validation ile korunmuştur

## 🐛 Hata Giderme

### "Module not found"
```bash
rm -rf node_modules package-lock.json
npm install
```

### Port zaten kullanımda
```bash
npm run dev -- --port 3000
```

### Firebase bağlantı sorunu
`firebase.js`'deki config'i kontrol edin

---

**İhtiyacınız olursa:** Dosyaları düzenleyin ve faydalanın! 🚀
