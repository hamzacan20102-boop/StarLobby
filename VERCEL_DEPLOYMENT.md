# 🚀 VERCEL'E DEPLOY ETME REHBERİ

## Adım 1: Vercel Hesabı Oluştur
1. https://vercel.com git
2. "Sign Up" tıkla
3. GitHub hesabınızla kaydol (En kolay yol)

## Adım 2: Projeyi GitHub'a Yükle
```bash
git init
git add .
git commit -m "StarLobby - Brawl Stars Takım Kurma Uygulaması"
git branch -M main
git remote add origin https://github.com/KULLANICI_ADIN/StarLobby.git
git push -u origin main
```

> Not: GitHub hesabında yeni repo oluştur: `New Repository` > `StarLobby` > `Create`

## Adım 3: Vercel'de Deploy Et
1. Vercel Dashboard'a git
2. "Add New Project" tıkla
3. GitHub'dan `StarLobby` repo'sunu seç
4. "Deploy" tıkla ✨

**Vercel otomatik deploy edecek! URL'i alacaksın!**

## Adım 4: Firebase Ayarları (ÖNEMLİ!)
Vercel'de environment variable'ları konfigür et:

### Settings → Environment Variables:
```
VITE_API_KEY = AIzaSyBSTGKt6zghsyCmGrYdyrBXybzdXquzipA
VITE_AUTH_DOMAIN = starlobby-ac0fe.firebaseapp.com
VITE_PROJECT_ID = starlobby-ac0fe
VITE_STORAGE_BUCKET = starlobby-ac0fe.firebasestorage.app
VITE_MESSAGING_SENDER_ID = 147261773052
VITE_APP_ID = 1:147261773052:web:94a0bc19bca34065c0b379
VITE_MEASUREMENT_ID = G-8XZDP8QNGK
```

### Kodda Kullan (firebase.js):
```javascript
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
};
```

## Adım 5: Google Ads Entegrasyonu

### Google AdSense Kaydı:
1. https://adsense.google.com git
2. "Başlayın" tıkla
3. Vercel URL'inizi girin
4. Google onayı bekle (24-48 saat)

### Ad Kodlarını Yerleştir:

**Sol Reklam (ad-left):**
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX"></script>
<ins class="adsbygoogle"
     style="display:block; writing-mode: vertical-rl;"
     data-ad-client="ca-pub-XXXX"
     data-ad-slot="XXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

**Sağ Reklam (ad-right):**
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX"></script>
<ins class="adsbygoogle"
     style="display:block; writing-mode: vertical-rl;"
     data-ad-client="ca-pub-XXXX"
     data-ad-slot="XXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

**Alt Reklam (ad-bottom):**
```html
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXX"
     data-ad-slot="XXXXXXXX"
     data-ad-format="auto"
     data-full-width-responsive="true"></ins>
<script>
     (adsbygoogle = window.adsbygoogle || []).push({});
</script>
```

> `ca-pub-XXXX` ve `XXXXXXXX` yerine AdSense hesabından kendi kodlarını koy!

## Adım 6: Responsive Ads (Mobil İçin)
CSS zaten optimize! Ama AdSense kodu da responsive olmalı:

```css
/* main.css */
@media (max-width: 768px) {
  .ad-container {
    min-height: auto;
  }
}
```

## Adım 7: Yayın (Production)
```bash
git add .
git commit -m "Google Ads eklendi"
git push origin main
```

Vercel otomatik re-deploy edecek! ✅

## 🎯 Önemli Notlar

### Firebase Güvenliği
`firebaseRules.md` dosyasını oluştur ve Firestore kurallarını ayarla:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /teams/{document=**} {
      allow read, write: if request.auth != null;
    }
    match /users/{document=**} {
      allow read, write: if request.auth.uid == resource.data.uid;
    }
  }
}
```

### Analytics
Google Analytics zaten entegre! Dashboard'da göreceksin.

## 📊 Vercel Özelikleri

- **Auto Deploy**: GitHub push'u → Vercel otomatik deploy
- **Preview URLs**: Her PR için preview link
- **Analytics**: Site performansını izle
- **Domains**: Özel domain bağla (starlobby.com)

## 🔧 Sorun Giderme

### "Module not found" hatası
```bash
npm install
git add package-lock.json
git push
```

### Firebase 403 hatası
Environment variables'ları kontrol et → Settings → Environment Variables

### Ads görmüyor
1. Google AdSense onayını bekle
2. Ad blocking extension'ı disable et
3. Kodu doğru yere yapıştırdığını kontrol et

## 📈 Sonrası

- Google Analytics'i kullan
- AdSense earnings takip et
- Vercel Analytics Dashboard'u kontrol et
- Firebase Firestore veri yönetimi

---

**Tamamdı! Vercel'de live! 🎉**

Vercel URL'ni paylaş ve adını değiştir istersen: Settings → Domains
