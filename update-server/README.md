# Plumya güncelleme yayını

Güncelleme hostu `https://updates.plumya.net/releases/` altındaki imzalı dosyaları herkese açık HTTPS üzerinden sunar. Yayın yapan sunucu hesabına dizin yazma yetkisi verin. Web servisi aynı dizini salt okunur bağlar.

1. `updates.plumya.net` DNS kaydını güncelleme hostuna yönlendirin. 80 ve 443 boşsa bu dizinden `docker compose up -d` çalıştırın. Hostta Caddy çalışıyorsa mevcut Caddy yapılandırmasına bu site bloğunu ekleyin ve `root` yolunu hosttaki yayın dizinine ayarlayın.
2. Launcher derleme ayarlarında `PLUMYA_UPDATE_BASE_URL=https://updates.plumya.net/releases/` ve `PLUMYA_RELEASE_PUBLIC_KEY_B64` tanımlayın. Aynı açık anahtarı web sitesinin çalışma ortamında ve yayın yapan hesapta tanımlayın.
3. Launcher reposundaki imzalama adımlarıyla Windows kurulum paketi ve Client JAR için ayrı imzalı çıktı dizinleri oluşturun. İki dizini de yetkili yayın hesabıyla güncelleme hostuna aktarın.
4. Yayın hostunda Node.js ile aşağıdaki komutları çalıştırın. Son argüman olan sürüm notları dosyası isteğe bağlıdır. CI kullanılırsa aynı komutları imzalı çıktılar erişilebilir olduktan sonra çalıştırın.

```sh
node publish.mjs launcher stable /path/to/signed-launcher /srv/plumya-updates release-notes.txt
node publish.mjs client stable /path/to/signed-client /srv/plumya-updates
```

Yayın komutu Ed25519 imzasını, kanal ve dosya adını, dosya boyutunu ve SHA-256 özetini doğrular. Yalnız doğrulanan çıktı etkinleştirilir. Bir kanalın manifesti ve paketi aynı dizin bağlantısı üzerinden değiştirilir. Aynı kanala ardışık yayın yapın. Bir istemcinin manifest ve paket istekleri arasına yayın girerse istemci uyuşmayan paketi reddeder ve sonraki denemede yeni sürümü alır. Önceki dizinler `.versions` altında saklanır ve periyodik olarak yalnız etkin bağlantılara ait olmayan dizinler temizlenebilir.

İlk yayında manifest ve paket adreslerini HTTPS üzerinden doğrulayın. Ardından Windows’ta açık anahtar ve yayın adresi gömülü önceki bir Launcher sürümünü kullanarak indirme ve kurulumu deneyin. Kaynak repo ve imzalama anahtarı erişimleri yayın dağıtımından bağımsızdır.
