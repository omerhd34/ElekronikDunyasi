import React from 'react';

const KullanimKosullariPage = () => {
 return (
  <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
   <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-100">

    {/* Başlık Alanı */}
    <div className="mb-8 border-b pb-4">
     <h1 className="text-3xl font-bold text-gray-900">Kullanım Koşulları</h1>
     <p className="mt-2 text-sm text-gray-500">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
    </div>

    <div className="space-y-6 text-gray-700 leading-relaxed">

     {/* Giriş */}
     <section>
      <p>
       Lütfen web sitemizi kullanmadan önce bu <strong>Kullanım Koşulları</strong> sözleşmesini dikkatlice okuyunuz. <strong>Elektronik Dünyası</strong> web sitesine erişerek veya alışveriş yaparak, aşağıda belirtilen şartları kabul etmiş sayılırsınız. Eğer bu şartları kabul etmiyorsanız, lütfen siteyi kullanmayı durdurunuz.
      </p>
     </section>

     {/* Genel Hükümler */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">1. Genel Hükümler</h2>
      <p>
       Bu web sitesi, <strong>Elektronik Dünyası</strong> tarafından yönetilmektedir. Site üzerinde sunulan tüm elektronik ürünler (cep telefonları, bilgisayarlar, aksesuarlar vb.) ve hizmetler firmamızın mülkiyetindedir. Şirket, site içeriğini, ürün fiyatlarını ve kullanım koşullarını önceden haber vermeksizin değiştirme hakkını saklı tutar.
      </p>
     </section>

     {/* Üyelik ve Hesap Güvenliği */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">2. Üyelik ve Hesap Güvenliği</h2>
      <ul className="list-disc pl-5 space-y-2">
       <li>Siteye üye olurken verdiğiniz bilgilerin (ad, soyad, adres vb.) doğru ve güncel olduğunu taahhüt edersiniz.</li>
       <li>Üyelik şifrenizin güvenliğinden tamamen kullanıcı sorumludur. Şifrenizin üçüncü kişilerle paylaşılması durumunda doğabilecek zararlardan firmamız sorumlu tutulamaz.</li>
       <li>Sitemizi kullanırken yasalara aykırı, tehditkar veya başkalarının haklarını ihlal edici faaliyetlerde bulunamazsınız.</li>
      </ul>
     </section>

     {/* Sipariş, Teslimat ve İade */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">3. Sipariş, Teslimat ve İade</h2>
      <p className="mb-2">Elektronik ürünlerin satışı ve teslimatı ile ilgili hususlar şunlardır:</p>
      <ul className="list-disc pl-5 space-y-2">
       <li><strong>Stok Durumu:</strong> Listelenen ürünlerin stok durumu anlık olarak değişebilir. Tedarik edilemeyen ürünler için müşteri bilgilendirilir ve ödeme iadesi yapılır.</li>
       <li><strong>Kargo:</strong> Siparişleriniz anlaşmalı kargo şirketleri aracılığıyla adresinize teslim edilir. Kargo teslimatı sırasında pakette hasar (ezik, kırık, ıslaklık) olup olmadığını kontrol etmeniz ve hasar varsa tutanak tutturmanız gerekmektedir.</li>
       <li><strong>İade ve Cayma Hakkı:</strong> Tüketici, ürünü teslim aldığı tarihten itibaren 14 gün içinde cayma hakkını kullanabilir. Ancak, SIM kart takılmış telefonlar, kurulumu yapılmış yazılımlar veya hijyen bandı açılmış kulaklıklar gibi belirli ürünlerde cayma hakkı geçerli olmayabilir.</li>
      </ul>
     </section>

     {/* Fikri Mülkiyet */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">4. Fikri Mülkiyet Hakları</h2>
      <p>
       Sitemizde yer alan tüm tasarımlar, logolar, ürün görselleri ve yazılımlar <strong>Elektronik Dünyası</strong>&apos;na veya lisans verenlerine aittir. İzinsiz kopyalanması, çoğaltılması veya başka bir mecrada yayınlanması yasaktır.
      </p>
     </section>

     {/* Sorumluluk Reddi */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">5. Sorumluluk Reddi</h2>
      <p>
       Firmamız, web sitesinin kesintisiz veya hatasız çalışacağını garanti etmez. Teknik arızalar, siber saldırılar veya internet altyapısından kaynaklanan kesintilerden dolayı oluşabilecek veri kayıplarından şirketimiz sorumlu değildir.
      </p>
     </section>

     {/* Uyuşmazlık Çözümü */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">6. Uyuşmazlıkların Çözümü</h2>
      <p>
       Bu sözleşmeden doğabilecek her türlü ihtilafın çözümünde İstanbul (Anadolu) Mahkemeleri ve İcra Daireleri yetkilidir. Ayrıca tüketiciler, şikayetleri için Tüketici Hakem Heyetlerine başvurabilirler.
      </p>
     </section>

     {/* İletişim */}
     <section className="mt-8 pt-6 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">İletişim</h2>
      <p className="mb-2">
       Kullanım koşulları ile ilgili sorularınız için bizimle iletişime geçebilirsiniz:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg text-sm">
       <p><strong>Firma Adı:</strong> Elektronik Dünyası</p>
       <p><strong>Adres:</strong> Mehmet Akif, Recep Ayan Cd. 23B, 34406 Çekmeköy/İstanbul</p>
       <p><strong>Telefon:</strong> 0546 219 72 21</p>
      </div>
     </section>

    </div>
   </div>
  </div>
 );
};

export default KullanimKosullariPage;