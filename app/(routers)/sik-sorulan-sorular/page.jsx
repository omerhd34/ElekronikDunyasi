import {
 Accordion,
 AccordionContent,
 AccordionItem,
 AccordionTrigger,
} from "@/components/ui/accordion";

const SikSorulanSorularPage = () => {

 const faqs = [
  {
   id: "item-1",
   question: "Kargo süreçleri nasıl işliyor?",
   answer: "Siparişleriniz, ödeme onayının ardından 1-3 iş günü içerisinde anlaşmalı kargo firmalarımıza (Yurtiçi Kargo / Aras Kargo) teslim edilir. Kargoya verildiğinde tarafınıza SMS ve e-posta yoluyla takip numarası iletilir."
  },
  {
   id: "item-2",
   question: "Ödeme ve fatura işlemleri nelerdir?",
   answer: "Ödemelerinizi kredi kartı (tek çekim veya taksitli) ve havale/EFT yöntemleriyle yapabilirsiniz. Faturanız, siparişinizle birlikte e-fatura/e-arşiv olarak kayıtlı e-posta adresinize gönderilir."
  },
  {
   id: "item-3",
   question: "Ürünlerin garanti süresi ne kadar?",
   answer: "Sattığımız tüm elektronik cihazlar (cep telefonu, bilgisayar vb.) en az 2 yıl (24 ay) distribütör veya ithalatçı garantilidir. Garanti belgesi ve faturanız, garanti işlemleri için yeterlidir."
  },
  {
   id: "item-4",
   question: "İade işlemi nasıl yapılır? Ürün iade edebilir miyim?",
   answer: "6502 sayılı Tüketicinin Korunması Kanunu gereği, ürünü teslim aldığınız tarihten itibaren 14 gün içinde cayma hakkınızı kullanabilirsiniz. İade için ürünün ambalajının açılmamış, SIM kart takılmamış ve tekrar satılabilir özelliğini yitirmemiş olması gerekmektedir."
  },
  {
   id: "item-5",
   question: "Müşteri hizmetlerine nasıl ulaşabilirim?",
   answer: "Bize hafta içi 09:00 - 18:00 saatleri arasında 0546 219 72 21 numaralı telefondan veya iletişim formumuz üzerinden ulaşabilirsiniz."
  },
  {
   id: "item-6",
   question: "Aldığım ürün paketten eksik veya hasarlı çıktı, ne yapmalıyım?",
   answer: "Kargo görevlisi yanınızdayken paketi kontrol etmeniz çok önemlidir. Eğer pakette ezik, yırtık veya hasar varsa kargo görevlisine 'Hasar Tespit Tutanağı' tutturarak ürünü teslim almayınız. Tutanak tutulmayan hasarlı ürünlerde iade süreci zorlaşabilmektedir."
  },
  {
   id: "item-7",
   question: "Sipariş ettiğim üründen farklı bir ürün geldi, ne yapmalıyım?",
   answer: "Yaşanan karışıklık için özür dileriz. Yanlış gelen ürünü orijinal kutusuyla birlikte ücretsiz olarak bize geri gönderebilirsiniz. Ürün depomuza ulaştığında doğru ürün en kısa sürede adresinize kargolanacaktır."
  },
  {
   id: "item-8",
   question: "Yurt dışına sipariş verebilir miyim? Siparişimi nasıl takip edebilirim?",
   answer: "Şu an için yalnızca Türkiye sınırları içerisine gönderim yapmaktayız. Siparişinizi 'Hesabım > Siparişlerim' sayfasından veya size gönderilen kargo takip numarası ile takip edebilirsiniz."
  },
  {
   id: "item-9",
   question: "Ürün stokta yoksa ne yapabilirim?",
   answer: "İlgilendiğiniz ürünün stokları tükendiyse, ürün sayfasında bulunan 'Gelince Haber Ver' butonuna tıklayabilirsiniz. Stoklarımız güncellendiğinde e-posta ile otomatik olarak bilgilendirilirsiniz."
  },
  {
   id: "item-10",
   question: "Hesabımı nasıl oluşturabilirim?",
   answer: "Ana sayfanın sağ üst köşesinde bulunan 'Üye Ol' butonuna tıklayarak ad, soyad, e-posta ve şifre bilgilerinizi girerek saniyeler içinde hesabınızı oluşturabilirsiniz."
  },
  {
   id: "item-11",
   question: "Şifremi unuttum, ne yapmalıyım?",
   answer: "Üye girişi sayfasında bulunan 'Şifremi Unuttum' linkine tıklayarak kayıtlı e-posta adresinizi girebilirsiniz. Şifre sıfırlama bağlantısı e-posta adresinize gönderilecektir."
  }
 ];

 return (
  <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
   <div className="max-w-3xl mx-auto">

    {/* Başlık Bölümü */}
    <div className="text-center mb-10">
     <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
      Sıkça Sorulan Sorular
     </h1>
     <p className="mt-4 text-lg text-gray-600">
      Elektronik Dünyası alışverişlerinizle ilgili merak ettiğiniz tüm detaylar.
     </p>
    </div>

    {/* Shadcn Accordion Bileşeni */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
     <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq) => (
       <AccordionItem key={faq.id} value={faq.id}>
        <AccordionTrigger className="text-left font-medium text-gray-900 hover:text-blue-600 hover:no-underline py-4">
         {faq.question}
        </AccordionTrigger>
        <AccordionContent className="text-gray-600 leading-relaxed pb-4 pt-1">
         {faq.answer}
        </AccordionContent>
       </AccordionItem>
      ))}
     </Accordion>
    </div>

    {/* Alt İletişim Notu */}
    <div className="mt-8 text-center bg-blue-50 rounded-lg p-6 border border-blue-100">
     <p className="text-blue-800 font-medium">
      Aradığınız cevabı bulamadınız mı?
     </p>
     <p className="mt-2 text-blue-600">
      Hafta içi 09:00 - 18:00 arası
      <a href="tel:05462197221" className="font-bold hover:underline ml-1">
       0546 219 72 21
      </a>
      {' '}numaralı hattan bize ulaşabilirsiniz.
     </p>
    </div>

   </div>
  </div>
 );
};

export default SikSorulanSorularPage;