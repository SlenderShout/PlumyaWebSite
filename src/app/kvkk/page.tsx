import { ShieldCheck, FileText, Lock, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function KVKKPage() {
  return (
    <div className="min-h-screen py-16 px-4 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-20 right-1/3 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-20 left-1/4 w-96 h-96 bg-fuchsia-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-400/30 text-purple-200 text-xs font-semibold mb-4 backdrop-blur-md">
            <ShieldCheck size={14} className="text-emerald-400" />
            <span>Yasal Bilgilendirme ve Güvence</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-black text-white mb-4 tracking-tight">
            KVKK & <span className="gradient-title">Kullanıcı Sözleşmesi</span>
          </h1>
          <p className="text-purple-200/70 text-sm md:text-base max-w-xl mx-auto">
            Plumya platformu ve sunucusunda kişisel verilerinizin korunması ve kullanım koşulları hakkında yasal aydınlatma metni.
          </p>
        </div>

        {/* Content Box */}
        <div className="glass-panel rounded-3xl p-8 md:p-12 border border-purple-500/25 space-y-8 text-xs md:text-sm text-purple-200/80 leading-relaxed">
          
          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-purple-400" />
              1. KVKK Aydınlatma Metni
            </h2>
            <p>
              6698 sayılı Kişisel Verilerin Korunması Kanunu (&ldquo;KVKK&rdquo;) uyarınca, <strong>Plumya Network</strong> olarak, veri sorumlusu sıfatıyla tarafımıza iletmiş olduğunuz kişisel verilerinizin güvenliğine azami hassasiyet göstermekteyiz.
            </p>
            <p>
              Sitemize kayıt olurken ve sunucumuzda oynarken aşağıdaki kişisel verileriniz işlenmektedir:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-purple-200/90">
              <li><strong>Kimlik & Profil Bilgileri:</strong> Minecraft kullanıcı adınız.</li>
              <li><strong>İletişim Bilgileri:</strong> Kayıt sırasında belirttiğiniz e-posta adresiniz.</li>
              <li><strong>İşlem ve Bağlantı Güvenliği:</strong> IP adresiniz, giriş ve oturum kayıtlarınız.</li>
              <li><strong>Destek Kayıtları:</strong> Açmış olduğunuz destek talepleri ve yetkili yazışmaları.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3 pt-6 border-t border-purple-500/15">
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <Lock size={18} className="text-purple-400" />
              2. Kişisel Verilerin İşlenme Amacı ve Aktarımı
            </h2>
            <p>
              Toplanan kişisel verileriniz; kullanıcı hesabınızın oluşturulması ve güvenliğinin sağlanması, oyun içi bakiye ve yetkilerinizin yönetilmesi, hile ve kural ihlallerinin önlenmesi ve tarafınıza destek hizmeti sunulması amaçlarıyla sınırlı olarak işlenmektedir.
            </p>
            <p>
              Kişisel verileriniz, yasal zorunluluklar ve adli makamların resmi talepleri haricinde hiçbir üçüncü kişi, kurum ya da reklam şirketi ile ticari amaçla paylaşılmaz ve satılmaz.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3 pt-6 border-t border-purple-500/15">
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <ShieldCheck size={18} className="text-purple-400" />
              3. Kullanıcı Sözleşmesi ve Sunucu Kuralları
            </h2>
            <p>
              Plumya sunucusuna ve internet sitesine kayıt olan her kullanıcı aşağıdaki şartları peşinen kabul etmiş sayılır:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-purple-200/90">
              <li>Hesap şifresinin güvenliğini sağlamak tamamen kullanıcının kendi sorumluluğundadır.</li>
              <li>Sunucuda hile (cheat), yetkisiz yazılım (macro/autoclicker), açık istismarı (bug abuse) ve diğer oyuncuları rahatsız edici hakaret, küfür, dolandırıcılık kesinlikle yasaktır ve sınırsız uzaklaştırma sebebidir.</li>
              <li>Kredi mağazasından yapılan satın alımlar dijital oyun içi ürünler olup, hesaba aktarıldıktan sonra keyfi iade yapılamaz. Yaşanan sistemsel problemlerde destek ekibimiz telafi sağlamaktadır.</li>
              <li>Yönetim ekibi, sunucu düzenini ve adaletini sağlamak amacıyla kuralları ve oyun mekaniklerini güncelleme hakkını saklı tutar.</li>
            </ul>
          </section>

          {/* Section 4 */}
          <section className="space-y-3 pt-6 border-t border-purple-500/15">
            <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
              <FileText size={18} className="text-purple-400" />
              4. İlgili Kişi Olarak Haklarınız
            </h2>
            <p>
              KVKK&apos;nın 11. maddesi uyarınca; verilerinizin işlenip işlenmediğini öğrenme, yanlış işlenmişse düzeltilmesini talep etme veya hesabınızın silinmesini talep etme hakkına sahipsiniz. Bu taleplerinizi sitemizdeki <Link href="/support" className="text-fuchsia-400 underline hover:text-fuchsia-300">Destek Talepleri</Link> bölümünden iletebilirsiniz.
            </p>
          </section>

          {/* Bottom info */}
          <div className="pt-6 border-t border-purple-500/15 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[11px] text-purple-300/60">
              Son Güncelleme: Kasım 2026 • Plumya Network
            </p>
            <Link
              href="/"
              className="gradient-btn px-5 py-2 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/30"
            >
              <ArrowLeft size={13} /> Ana Sayfaya Dön
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
