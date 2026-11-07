"use client";

import { useApp } from "@/contexts/AppContext";
import { useState } from "react";
import {
  MessageSquare,
  Plus,
  X,
  ChevronDown,
  ChevronUp,
  Send,
  LogIn,
  LifeBuoy,
  Clock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";

export default function SupportPage() {
  const {
    currentUser,
    tickets,
    addTicket,
    addTicketReply,
    updateTicketStatus,
  } = useApp();
  const [showForm, setShowForm] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [expandedTicket, setExpandedTicket] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-16">
        <div className="glass-panel rounded-3xl p-8 md:p-10 text-center max-w-md w-full shadow-2xl border border-purple-500/30">
          <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-300 mx-auto mb-4">
            <LogIn size={26} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Giriş Yapmalısınız
          </h2>
          <p className="text-xs text-purple-300/70 mb-6 leading-relaxed">
            Destek talebi oluşturmak veya yetkili yanıtlarını takip etmek için lütfen hesabınıza giriş yapın.
          </p>
          <Link
            href="/login"
            className="gradient-btn inline-block text-white font-bold text-sm rounded-xl px-8 py-3 shadow-lg shadow-purple-600/30"
          >
            Giriş Yap
          </Link>
        </div>
      </div>
    );
  }

  const isAdmin = currentUser.role === "admin";
  const userTickets = isAdmin
    ? tickets
    : tickets.filter((t) => t.userId === currentUser.id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !message.trim()) return;
    addTicket({ subject: subject.trim(), message: message.trim() });
    setSubject("");
    setMessage("");
    setShowForm(false);
  };

  const handleReply = (ticketId: string) => {
    if (!replyText.trim()) return;
    addTicketReply(ticketId, replyText.trim());
    setReplyText("");
  };

  const statusBadge = (status: string) => {
    const styles: Record<string, string> = {
      open: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30",
      answered: "bg-amber-500/15 text-amber-300 border-amber-500/30",
      closed: "bg-red-500/15 text-red-300 border-red-500/30",
    };
    const labels: Record<string, string> = {
      open: "Açık",
      answered: "Yetkili Yanıtladı",
      closed: "Kapatıldı",
    };
    return (
      <span
        className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${
          styles[status] || styles.open
        }`}
      >
        {labels[status] || status}
      </span>
    );
  };

  return (
    <div className="min-h-screen py-14 px-4 relative overflow-hidden">
      {/* Background ambient orbs */}
      <div className="absolute top-20 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-purple-500/20">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-fuchsia-600 flex items-center justify-center text-white shadow-md shadow-purple-500/30">
                <LifeBuoy size={20} />
              </div>
              <h1 className="text-2xl md:text-4xl font-black text-white tracking-tight">
                Destek <span className="gradient-title">Talepleri</span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-purple-200/70">
              {isAdmin
                ? "Yönetici görünümü: Sunucudaki tüm talepleri inceleyip yanıtlayabilirsiniz."
                : "Bir sorun mu yaşıyorsunuz? Ekibimiz en kısa sürede size geri dönüş sağlayacaktır."}
            </p>
          </div>

          <button
            onClick={() => setShowForm(!showForm)}
            className="gradient-btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-md shadow-purple-600/30 cursor-pointer shrink-0"
          >
            {showForm ? <X size={15} /> : <Plus size={15} />}
            <span>{showForm ? "İptal Et" : "Yeni Talep Oluştur"}</span>
          </button>
        </div>

        {/* New Ticket Form Modal / Card */}
        {showForm && (
          <div className="glass-panel rounded-3xl p-6 md:p-8 mb-8 border border-purple-400/30 shadow-2xl animate-in fade-in duration-200">
            <h2 className="text-lg font-bold text-white mb-1">
              Yeni Destek Talebi Aç
            </h2>
            <p className="text-xs text-purple-300/60 mb-5">
              Lütfen sorununuzu detaylı bir şekilde açıklayın.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                  Konu Başlığı
                </label>
                <input
                  type="text"
                  placeholder="Örn: Kredi yükleme hatası veya oyuncu bildirimi"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/25 focus:border-purple-400 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-purple-300/30"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-purple-200 mb-1.5">
                  Mesajınız
                </label>
                <textarea
                  rows={4}
                  placeholder="Yaşadığınız durumu ayrıntılı olarak yazınız..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/25 focus:border-purple-400 text-white text-sm focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-purple-300/30 resize-none"
                  required
                />
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-purple-300 hover:text-white bg-white/[0.04] transition-colors"
                >
                  Vazgeç
                </button>
                <button
                  type="submit"
                  className="gradient-btn px-6 py-2 rounded-xl text-xs font-bold text-white shadow-md shadow-purple-600/30 cursor-pointer"
                >
                  Talebi Gönder
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Ticket List */}
        {userTickets.length === 0 ? (
          <div className="glass-panel rounded-3xl p-12 text-center border border-purple-500/20">
            <MessageSquare size={36} className="text-purple-400/40 mx-auto mb-3" />
            <h3 className="text-base font-bold text-white mb-1">
              Henüz destek talebiniz bulunmuyor
            </h3>
            <p className="text-xs text-purple-300/60 mb-5">
              Herhangi bir sorunda &ldquo;Yeni Talep Oluştur&rdquo; butonuna tıklayarak bilet açabilirsiniz.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {userTickets.map((ticket) => (
              <div
                key={ticket.id}
                className="glass-panel rounded-2xl border border-purple-500/20 overflow-hidden transition-all"
              >
                {/* Header row */}
                <div
                  onClick={() =>
                    setExpandedTicket(
                      expandedTicket === ticket.id ? null : ticket.id
                    )
                  }
                  className="p-5 flex items-center justify-between gap-4 cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                      <h3 className="text-base font-bold text-white truncate">
                        {ticket.subject}
                      </h3>
                      {statusBadge(ticket.status)}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-purple-300/50">
                      <span>{ticket.username}</span>
                      <span>•</span>
                      <span>
                        {new Date(ticket.createdAt).toLocaleDateString("tr-TR", {
                          day: "numeric",
                          month: "long",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <span>•</span>
                      <span>{ticket.replies.length} Yanıt</span>
                    </div>
                  </div>

                  <div className="text-purple-400 p-1">
                    {expandedTicket === ticket.id ? (
                      <ChevronUp size={20} />
                    ) : (
                      <ChevronDown size={20} />
                    )}
                  </div>
                </div>

                {/* Expanded details */}
                {expandedTicket === ticket.id && (
                  <div className="p-5 pt-0 border-t border-purple-500/15 space-y-4">
                    {/* Original Message */}
                    <div className="p-4 rounded-xl bg-black/40 border border-purple-500/20 mt-4">
                      <div className="flex items-center justify-between mb-2 text-xs">
                        <span className="font-bold text-purple-200">
                          {ticket.username} (İlk Mesaj)
                        </span>
                        <span className="text-purple-300/50">
                          {new Date(ticket.createdAt).toLocaleString("tr-TR")}
                        </span>
                      </div>
                      <p className="text-xs md:text-sm text-purple-100/90 leading-relaxed whitespace-pre-line">
                        {ticket.message}
                      </p>
                    </div>

                    {/* Replies */}
                    {ticket.replies.length > 0 && (
                      <div className="space-y-3 pt-2">
                        {ticket.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className={`p-4 rounded-xl border text-xs md:text-sm leading-relaxed ${
                              reply.isAdmin
                                ? "bg-purple-950/40 border-purple-400/40 shadow-sm"
                                : "bg-black/30 border-purple-500/20"
                            }`}
                          >
                            <div className="flex items-center justify-between mb-1.5 text-xs">
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-white">
                                  {reply.username}
                                </span>
                                {reply.isAdmin && (
                                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/30">
                                    Yetkili
                                  </span>
                                )}
                              </div>
                              <span className="text-purple-300/50">
                                {new Date(reply.date || reply.createdAt || Date.now()).toLocaleString("tr-TR")}
                              </span>
                            </div>
                            <p className="text-purple-100/90 whitespace-pre-line">
                              {reply.message}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Admin Status Controls */}
                    {isAdmin && (
                      <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-purple-500/15">
                        <span className="text-xs font-semibold text-purple-300 mr-2">
                          Talep Durumunu Değiştir:
                        </span>
                        {(["open", "answered", "closed"] as const).map((st) => (
                          <button
                            key={st}
                            onClick={() => updateTicketStatus(ticket.id, st)}
                            className={`text-xs px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                              ticket.status === st
                                ? "bg-purple-600 text-white shadow-md shadow-purple-600/30"
                                : "bg-white/[0.04] text-purple-300/70 hover:text-white"
                            }`}
                          >
                            {st === "open"
                              ? "Açık"
                              : st === "answered"
                              ? "Yanıtlandı"
                              : "Kapat"}
                          </button>
                        ))}
                      </div>
                    )}

                    {/* Reply Box */}
                    {ticket.status !== "closed" && (
                      <div className="pt-3">
                        <div className="flex gap-2.5">
                          <input
                            type="text"
                            placeholder="Cevabınızı buraya yazın..."
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") handleReply(ticket.id);
                            }}
                            className="flex-1 px-4 py-2.5 rounded-xl bg-black/40 border border-purple-500/25 focus:border-purple-400 text-white text-xs focus:outline-none focus:ring-1 focus:ring-purple-400 transition-all placeholder:text-purple-300/30"
                          />
                          <button
                            onClick={() => handleReply(ticket.id)}
                            className="gradient-btn px-4 py-2.5 rounded-xl text-white font-bold text-xs flex items-center gap-1.5 shadow-md shadow-purple-600/30 cursor-pointer shrink-0"
                          >
                            <Send size={13} />
                            Yanıtla
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
