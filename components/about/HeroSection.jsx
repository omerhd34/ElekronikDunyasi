import { Button } from "@/components/ui/button"
import { Badge, Headphones, Laptop, Smartphone, Watch } from "lucide-react"

const HeroSection = () => {
 return (
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
 )
}

export default HeroSection