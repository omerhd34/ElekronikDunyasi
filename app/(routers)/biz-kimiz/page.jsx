import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Truck, Headphones, ShieldCheck, Star, Users, Clock, Eye, Target, Globe, HeartHandshake, Zap, Laptop, Smartphone, Tablet, Watch } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const BizKimizPage = () => {
 return (
  <div className="min-h-screen bg-background font-sans text-foreground">

   {/* --- HERO SECTION --- */}
   <section className="relative overflow-hidden py-20 lg:py-32 bg-slate-50 dark:bg-slate-950">
    <div className="container mx-auto px-4 text-center z-10 relative">
     <Badge variant="secondary" className="mb-4 px-4 py-1 text-primary bg-primary/10 border-primary/20 hover:bg-primary/20">
      Teknolojinin Kalbi Burada Atıyor
     </Badge>
     <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
      Geleceği <br className="hidden sm:block" />
      <span className="bg-linear-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
       Evinize Taşıyoruz
      </span>
     </h1>
     <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl mb-8">
      En yeni akıllı telefonlardan yüksek performanslı bilgisayarlara kadar,
      dünya standartlarındaki teknolojiyi güvenilir hizmet anlayışıyla buluşturuyoruz.
     </p>
     <div className="flex justify-center gap-4">
      <Button size="lg" className="h-12 px-8 rounded-full shadow-lg shadow-primary/20">
       Ürünleri Keşfet
      </Button>
      <Button size="lg" variant="outline" className="h-12 px-8 rounded-full">
       İletişime Geç
      </Button>
     </div>
    </div>

    {/* Arkaplan İkonları */}
    <div className="absolute top-10 left-10 opacity-5 animate-pulse text-blue-600"><Laptop size={64} /></div>
    <div className="absolute top-10 right-10 opacity-5 animate-pulse text-blue-600"><Watch size={64} /></div>
    <div className="absolute bottom-10 right-10 opacity-5 animate-pulse text-cyan-600"><Smartphone size={64} /></div>
    <div className="absolute bottom-10 left-10 opacity-5 animate-pulse text-cyan-600"><Headphones size={64} /></div>
   </section>

   {/* --- HİKAYEMİZ --- */}
   <section className="py-24">
    <div className="container mx-auto px-4">
     <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      <div className="relative group">
       <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
       <div className="relative rounded-2xl bg-card border aspect-video flex items-center justify-center overflow-hidden shadow-xl">
        <Image
         fill
         src="/electronik-dunyasi.png"
         alt="Elektronik Dünyası Mağazası"
         className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
       </div>
      </div>

      <div className="space-y-6">
       <h2 className="text-3xl font-bold tracking-tight lg:text-4xl relative inline-block">
        Hikayemiz
        <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
       </h2>
       <p className="text-lg text-muted-foreground leading-relaxed">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis at quia vero debitis expedita facere dolorum maxime rerum nemo hic. Pariatur architecto, quasi ipsum nemo amet iusto suscipit sapiente a!
       </p>
       <p className="text-lg text-muted-foreground leading-relaxed">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto laborum reiciendis praesentium eos dignissimos nulla officiis doloremque maiores quaerat nihil recusandae expedita illo, ex maxime totam odit ab, ducimus perspiciatis aliquam sint error. Repellendus cupiditate voluptas quis harum et assumenda.
       </p>
      </div>
     </div>
    </div>
   </section>

   <Separator className="container mx-auto" />

   {/* --- MİSYON & VİZYON --- */}
   <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
    <div className="container mx-auto px-4">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* Misyon Kartı */}
      <Card className="border-l-4 border-l-blue-600 shadow-md hover:shadow-xl transition-all duration-300">
       <CardHeader>
        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600">
         <Target className="w-6 h-6" />
        </div>
        <CardTitle className="text-2xl">Misyonumuz</CardTitle>
       </CardHeader>
       <CardContent>
        <p className="text-muted-foreground text-lg">
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae fugiat, consequatur magnam rerum nam modi id eius excepturi vero dolor est et nihil exercitationem quia saepe accusantium necessitatibus quaerat doloribus temporibus? Hic vel deleniti quod maxime unde doloremque vitae, eaque ipsa odit totam omnis impedit temporibus dolore molestias corporis? Magni?
        </p>
       </CardContent>
      </Card>

      {/* Vizyon Kartı */}
      <Card className="border-l-4 border-l-cyan-500 shadow-md hover:shadow-xl transition-all duration-300">
       <CardHeader>
        <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mb-4 text-cyan-600">
         <Eye className="w-6 h-6" />
        </div>
        <CardTitle className="text-2xl">Vizyonumuz</CardTitle>
       </CardHeader>
       <CardContent>
        <p className="text-muted-foreground text-lg">
         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae fugiat, consequatur magnam rerum nam modi id eius excepturi vero dolor est et nihil exercitationem quia saepe accusantium necessitatibus quaerat doloribus temporibus? Hic vel deleniti quod maxime unde doloremque vitae, eaque ipsa odit totam omnis impedit temporibus dolore molestias corporis? Magni?
        </p>
       </CardContent>
      </Card>

     </div>
    </div>
   </section>

   {/* --- DEĞERLERİMİZ --- */}
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

   {/* --- NEDEN BİZ? --- */}
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
  </div>
 );
};

export default BizKimizPage;