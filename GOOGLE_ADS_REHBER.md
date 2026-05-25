# 📢 GOOGLE ADS ENTEGRASYONU - AÇIKLAMALI REHBER

## Google AdSense Nedir?
Google'ın site sahipleri için parasını reklam gösterimi karşılığında kazandıran sistemi. Ziyaretçilerine reklam göster, para kazan! 💰

## 1. HAZIRLIK AŞAMASI

### A. Vercel'de Sitenizi Deploy Et
```
VERCEL_DEPLOYMENT.md dosyasını oku ve adımları izle
```

### B. Google AdSense Başvuru Yap
1. https://adsense.google.com aç
2. "Başlayın" (Start Now) tıkla
3. Vercel URL'inizi girin
4. Google onayını bekle (24-48 saat)

> 🎯 **İpucu**: Sitenin LIVE olması gerekir. Localhost'dan başvuru kabul edilmez!

---

## 2. REKLAM ALANLARINI ANLA

Sitenizde 3 reklam alanı var:

### Sol Alan (ad-left)
- **Size**: 728x90px (landscape)
- **Display**: Dikey yazı (vertical-rl)
- **Konum**: Takım bilgisinin solunda

### Sağ Alan (ad-right)
- **Size**: 728x90px (landscape)
- **Display**: Dikey yazı (vertical-rl)
- **Konum**: Takım bilgisinin sağında

### Alt Alan (ad-bottom)
- **Size**: 970x90px veya 728x90px
- **Display**: Normal (yatay)
- **Konum**: Sayfanın en altında

---

## 3. Google AdSense KODU ALMA

### Adım 1: AdSense Hesabında
1. https://adsense.google.com git
2. **"Reklamlar"** → **"Reklam birimleri"** tıkla
3. **"Yeni reklam birimi oluştur"** tıkla

### Adım 2: Reklam Özelliklerini Ayarla

**Sol Reklam:**
- Ad Unit Name: `StarLobby Left Ad`
- Ad Type: `Responsive`
- Save → Kod al

**Sağ Reklam:**
- Ad Unit Name: `StarLobby Right Ad`
- Ad Type: `Responsive`
- Save → Kod al

**Alt Reklam:**
- Ad Unit Name: `StarLobby Bottom Ad`
- Ad Type: `Responsive`
- Save → Kod al

### Adım 3: Kodları Kopyala
Her reklam için `ca-pub-XXXX` (Publisher ID) ve `data-ad-slot="XXXXXXXX"` al

---

## 4. KODU SITEDE YERLEŞTIR

### Dashboard.jsx Açıklaması

Reklam alanlarında şu struktur var:

```javascript
<div id="ad-left" className="ad-container ad-left">
  <div className="ad-placeholder">Google Ads - Sol Alan</div>
</div>
```

Google Ads kodunuzu buradaki `ad-placeholder` div'inin yerine yerleştirin.

### SOL REKLAM (ad-left) - GÜNCELLENECEK

**Şu kodları bul:**
```javascript
<div id="ad-left" className="ad-container ad-left">
  <div className="ad-placeholder">Google Ads - Sol Alan</div>
</div>
```

**Bunu ile değiştir:**
```javascript
<div id="ad-left" className="ad-container ad-left">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX"></script>
  <ins className="adsbygoogle"
       style={{display:'block', writingMode: 'vertical-rl'}}
       data-ad-client="ca-pub-XXXX"
       data-ad-slot="XXXXXXXX"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
    {`(adsbygoogle = window.adsbygoogle || []).push({});`}
  </script>
</div>
```

### SAĞ REKLAM (ad-right) - GÜNCELLENECEK

**Şu kodları bul:**
```javascript
<div id="ad-right" className="ad-container ad-right">
  <div className="ad-placeholder">Google Ads - Sağ Alan</div>
</div>
```

**Bunu ile değiştir:**
```javascript
<div id="ad-right" className="ad-container ad-right">
  <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX"></script>
  <ins className="adsbygoogle"
       style={{display:'block', writingMode: 'vertical-rl'}}
       data-ad-client="ca-pub-XXXX"
       data-ad-slot="XXXXXXXX"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
    {`(adsbygoogle = window.adsbygoogle || []).push({});`}
  </script>
</div>
```

### ALT REKLAM (ad-bottom) - GÜNCELLENECEK

**Şu kodları bul:**
```javascript
<div id="ad-bottom" className="bottom-ad">
  <div className="ad-container">
    <div className="ad-placeholder">Google Ads - Alt Alan</div>
  </div>
</div>
```

**Bunu ile değiştir:**
```javascript
<div id="ad-bottom" className="bottom-ad">
  <div className="ad-container">
    <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXX"></script>
    <ins className="adsbygoogle"
         style={{display:'block'}}
         data-ad-client="ca-pub-XXXX"
         data-ad-slot="XXXXXXXX"
         data-ad-format="auto"
         data-full-width-responsive="true"></ins>
    <script>
      {`(adsbygoogle = window.adsbygoogle || []).push({});`}
    </script>
  </div>
</div>
```

---

## 5. VERCEL'DE DEPLOY ET

```bash
git add .
git commit -m "Google Ads eklendi"
git push origin main
```

Vercel otomatik deploy edecek. Güncellenmiş URL'inizde reklamlar görmeli.

---

## 6. REKLAMLARIN GÖRÜP GÖRÜNMEDIĞINI KONTROL ET

### Local Testing (Localhost)
Localhost'da Google Ads gösterilmez. Normal bu!

### Production (Vercel)
1. Vercel URL'inize gidin
2. Sayfayı refresh edin
3. Reklam alanlarında yazı görmüyor musunuz?

**Hata Giderme:**
- Browser console'u aç (F12)
- Hata var mı bak
- AdSense kodu doğru mu kontrol et
- Google onayını bekle (24-48 saat)

---

## 7. PARA KAZANMA

### Para Ne Zaman Başlar?
1. Google AdSense onayladıktan sonra
2. Reklam kodları sitede aktif olduktan sonra
3. Minimum 100 visitors gerek (Google'ın kuralı)

### Kazanım Nasıl Çalışır?
- **CPM** (Cost Per Mille): Her 1000 görüntüleme = $1-5
- **CPC** (Cost Per Click): Her tıklama = $0.1-2
- **Google'ın kesintisi**: %32 (Sen %68 alırsın)

---

## 8. ANALYTICS İZLE

### Google AdSense Dashboard
- https://adsense.google.com
- **"Rapor"** bölümünde earnings görmek
- CPM, tıklama sayısı, geçerli tıklamalar vb.

### Google Analytics
- Site ziyaretçi sayısı
- Hangi sayfalar popüler
- Hangi reklam alanı daha çok tıklanıyor

---

## 9. MOBIL OPTİMİZASYON

Siteniz zaten **responsive**! Ama Google Ads da responsive yapılmış:

```css
@media (max-width: 768px) {
  .ad-left, .ad-right {
    display: none; /* Tarayıcıda gizle, alt ad kalsın */
  }
}
```

- **Masaüstü**: 3 reklam
- **Tablet**: Alt reklam
- **Mobil**: Alt reklam

---

## 10. KURALLARI ANLA (ÖNEMLİ!)

### Google AdSense Kuralları (İhlal = Hesap Kapatma!)

❌ **Yapma:**
- Kendi reklamına tıkla
- Ziyaretçileri tıklamaya zorla
- Aşırı reklam (sayfanın 50%'sinden fazla)
- Yanlış kategori belirtme

✅ **Yap:**
- Doğal trafik al (hiledeki değil)
- Reklam yerleşimini doğal tutun
- Kaliteli içerik yap
- Reklamları doğru kategorize et

---

## 11. BANA ÖNERİLER

### Trafiği Arttır
1. Social media'da paylaş (Discord, Instagram, TikTok)
2. Brawl Stars Community'lere katıl
3. YouTuber'lara tanıtım yap
4. SEO optimize et

### İçerik Geliştir
- Takım rehberleri ekle
- Oyuncu istatistikleri göster
- Turnuva özelliği ekle

### Para Arttır
- AdSense yanı sıra Affiliate marketing ekle
- Bağış butonu (Donate) ekle
- Premium features (Patreon)

---

## ÖZET ADIMLAR

```
1. Vercel'de deploy et
2. 24-48 saat bekle (Google onayı)
3. AdSense hesabında reklam units oluştur
4. Kodları Dashboard.jsx'e yapıştır
5. Git push et
6. Vercel otomatik deploy edecek
7. Reklamları görüntüleyin
8. Para kazanmaya başlayın! 💰
```

---

**Sorular? Discord'da yaz!** 🎮
