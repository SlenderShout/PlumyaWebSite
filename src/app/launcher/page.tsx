import type { Metadata } from "next";
import Link from "next/link";
import { ArrowDownToLine, Blocks, Monitor, ShieldCheck, SlidersHorizontal } from "lucide-react";
import { getLauncherRelease } from "./release";
import "./launcher.css";

export const metadata: Metadata = {
  title: "Plumya Launcher | Windows için indir",
  description: "Plumya Launcher, Minecraft 26.2 ve Plumya Client için Windows kurulum paketi.",
};

export default async function LauncherPage() {
  const release = await getLauncherRelease();
  return (
    <div className="launcher-page">
      <section className="launcher-hero" aria-labelledby="launcher-title">
        <div className="launcher-hero-content">
          <p className="launcher-eyebrow"><Monitor size={17} aria-hidden="true" /> Windows x64</p>
          <h1 id="launcher-title">Plumya<br /><span>Launcher</span></h1>
          <p className="launcher-intro">
            Minecraft 26.2 ve Plumya Client tek kurulumda. Kur, ayarlarını yap ve Plumya’ya gir.
          </p>
          <div className="launcher-actions">
            {release ? (
              <a className="launcher-download" href={release.download}>
                <ArrowDownToLine size={20} aria-hidden="true" /> Windows için indir
              </a>
            ) : (
              <button className="launcher-download" type="button" disabled>
                <ArrowDownToLine size={20} aria-hidden="true" /> Windows için indir
              </button>
            )}
            <a className="launcher-notes-link" href="#surum-notlari">Sürüm notları</a>
          </div>
          <p className="launcher-availability">
            {release
              ? <><ShieldCheck size={17} aria-hidden="true" /> Sürüm {release.version} · {(release.file.size / 1048576).toLocaleString("tr-TR", { maximumFractionDigits: 1 })} MB · İmzalı paket</>
              : "Doğrulanmış kurulum paketi şu anda indirilemiyor."}
          </p>
        </div>
        <div className="launcher-art" aria-hidden="true" />
      </section>

      <section aria-label="Launcher özellikleri" className="launcher-features">
        <article><Blocks aria-hidden="true" /><h2>Tek kurulum</h2><p>Minecraft 26.2, Java 25 ve Plumya Fabric Client birlikte kurulur.</p></article>
        <article><SlidersHorizontal aria-hidden="true" /><h2>Kendi oyun düzenin</h2><p>HUD yerleşimini, shader ve performans ayarlarını oyun içinden düzenle.</p></article>
        <article><ShieldCheck aria-hidden="true" /><h2>İmzalı güncellemeler</h2><p>Launcher, indirdiği güncellemeyi kurulumdan önce doğrular.</p></article>
      </section>

      <section className="launcher-release" id="surum-notlari" aria-labelledby="release-title">
        <div>
          <h2 id="release-title">Sürüm notları</h2>
          <p>{release ? "Kararlı Windows sürümü" : "Kararlı Windows paketi yayınlandığında burada görünür."}</p>
        </div>
        {release && <div><strong>Sürüm {release.version}</strong>{release.notes && <p className="launcher-release-notes">{release.notes}</p>}</div>}
        <Link href="/support">Kurulum desteği</Link>
      </section>
    </div>
  );
}
