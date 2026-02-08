import { Globe, HeartHandshake, ShieldCheck, Zap } from 'lucide-react'
import React from 'react'

const Values = () => {
 return (
  <section className="py-24">
   <div className="container mx-auto px-4">
    <div className="text-center mb-16">
     <h2 className="text-3xl font-bold tracking-tight mb-4">Değerlerimiz</h2>
     <p className="text-muted-foreground max-w-2xl mx-auto">
      Bizi biz yapan ve ticaretimize yön veren temel prensiplerimiz.
     </p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
     {[
      { title: "Güvenilirlik", desc: "Şeffaf fiyat politikası ve orijinal ürün garantisi.", icon: ShieldCheck },
      { title: "Müşteri Odaklılık", desc: "Satışın son değil, dostluğun başlangıcı olduğuna inanırız.", icon: HeartHandshake },
      { title: "Yenilikçilik", desc: "En son trendleri ve teknolojileri anında stoklarımıza katarız.", icon: Zap },
      { title: "Sürdürülebilirlik", desc: "E-atık yönetimi ve çevre dostu paketlemeye önem veririz.", icon: Globe },
     ].map((item, idx) => (
      <div key={idx} className="flex flex-col items-center text-center p-6 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors">
       <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 text-primary">
        <item.icon className="w-8 h-8" />
       </div>
       <h3 className="text-xl font-bold mb-3">{item.title}</h3>
       <p className="text-muted-foreground">{item.desc}</p>
      </div>
     ))}
    </div>
   </div>
  </section>
 )
}

export default Values