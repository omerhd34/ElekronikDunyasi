import { ArrowRight, Clock, Headphones, ShieldCheck, Star, Truck, Users } from "lucide-react"
import { Button } from "../ui/button"

const WhyWe = () => {
 return (
  <section className="relative overflow-hidden py-24 lg:py-32 bg-slate-950 text-white">
   <div className="container mx-auto px-4 relative z-10">
    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

     {/* --- SOL TARAF: İçerik ve Özellikler --- */}
     <div className="lg:w-1/2 space-y-8">
      <div>
       <h2 className="text-sm font-semibold text-blue-400 tracking-wider uppercase mb-2">Farkımız</h2>
       <h2 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-white">
        Neden Bizi <br />
        <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-cyan-400">
         Seçmelisiniz?
        </span>
       </h2>
       <p className="text-slate-400 text-lg leading-relaxed max-w-xl">
        Binlerce teknoloji mağazası arasından sıyrılmamızı sağlayan farklarımız var.
        Sadece en yeni cihazları satmıyoruz; satış öncesi ve sonrası kusursuz bir deneyim sunuyoruz.
       </p>
      </div>
      <div className="space-y-4">
       {[
        {
         title: "Aynı Gün Kargo",
         desc: "Saat 16:00'a kadar verilen siparişler gün içinde kargoya verilir, bekleme derdi biter.",
         icon: Truck,
         color: "text-blue-400"
        },
        {
         title: "7/24 Uzman Desteği",
         desc: "Robotlarla değil, gerçek teknoloji uzmanlarıyla konuşun. Sorunlarınıza anında çözüm.",
         icon: Headphones,
         color: "text-purple-400"
        },
        {
         title: "%100 Distribütör Garantisi",
         desc: "Tüm ürünlerimiz kapalı kutu, faturalı ve 2 yıl resmi Türkiye garantilidir.",
         icon: ShieldCheck,
         color: "text-green-400"
        },
       ].map((feat, i) => (
        <div key={i} className="group flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300">
         <div className={`p-3 rounded-lg bg-slate-900 border border-white/10 ${feat.color} group-hover:scale-110 transition-transform`}>
          <feat.icon className="w-6 h-6" />
         </div>
         <div>
          <h4 className="font-bold text-lg text-slate-100 mb-1">{feat.title}</h4>
          <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
         </div>
        </div>
       ))}
      </div>
     </div>

     {/* --- SAĞ TARAF: Dinamik İstatistik Grid (Bento Layout) --- */}
     <div className="lg:w-1/2 w-full">
      <div className="grid grid-cols-2 gap-4 relative">

       {/* Kart 1: Mutlu Müşteri (Büyük Kart) */}
       <div className="col-span-2 bg-linear-to-br from-slate-900 to-slate-800 border border-white/10 p-8 rounded-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
         <Users size={100} />
        </div>
        <div className="relative z-10">
         <div className="text-5xl font-bold text-white mb-2 tracking-tight">50.000+</div>
         <div className="text-blue-200 font-medium text-lg">Mutlu Müşteri</div>
         <p className="text-slate-400 text-sm mt-2 max-w-[80%]">
          Türkiye&apos;nin dört bir yanına teknoloji ulaştırıyor, güven inşa ediyoruz.
         </p>
        </div>
       </div>

       {/* Kart 2: Deneyim (Kare Kart) */}
       <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col justify-center items-center text-center hover:bg-slate-800/50 transition-colors">
        <div className="w-12 h-12 bg-blue-500/20 text-blue-400 rounded-full flex items-center justify-center mb-3">
         <Clock className="w-6 h-6" />
        </div>
        <div className="text-3xl font-bold text-white mb-1">10+</div>
        <div className="text-slate-400 text-sm">Yıllık Tecrübe</div>
       </div>

       {/* Kart 3: Müşteri Memnuniyeti (Kare Kart) */}
       <div className="bg-slate-900/50 backdrop-blur-sm border border-white/10 p-6 rounded-2xl flex flex-col justify-center items-center text-center hover:bg-slate-800/50 transition-colors">
        <div className="w-12 h-12 bg-yellow-500/20 text-yellow-400 rounded-full flex items-center justify-center mb-3">
         <Star className="w-6 h-6 fill-current" />
        </div>
        <div className="text-3xl font-bold text-white mb-1">4.9/5</div>
        <div className="text-slate-400 text-sm">Mağaza Puanı</div>
       </div>

       {/* Kart 4: CTA (Geniş Buton Alanı) */}
       <div className="col-span-2 mt-2">
        <Button size="lg" className="w-full h-14 text-lg font-medium bg-linear-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg shadow-blue-500/20 border-0">
         Mağazamızı Ziyaret Edin <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
       </div>

      </div>
     </div>

    </div>
   </div>
  </section>
 )
}

export default WhyWe