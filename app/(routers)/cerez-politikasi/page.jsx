import React from 'react';

const CerezPolitikasiPage = () => {
 return (
  <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
   <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-100">

    {/* Başlık Alanı */}
    <div className="mb-8 border-b pb-4">
     <h1 className="text-3xl font-bold text-gray-900">Çerez Politikası</h1>
     <p className="mt-2 text-sm text-gray-500">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
    </div>

    <div className="space-y-6 text-gray-700 leading-relaxed">

     {/* Giriş */}
     <section>
      <p>
       <strong>Elektronik Dünyası</strong> olarak, web sitemizi ziyaret ettiğinizde deneyiminizi geliştirmek, site trafiğini analiz etmek ve hizmetlerimizi kişiselleştirmek amacıyla çerezler (cookies) kullanmaktayız. Bu Çerez Politikası, web sitemizi ziyaret ettiğinizde ne tür çerezler kullandığımızı ve bunları nasıl kontrol edebileceğinizi açıklar.
      </p>
     </section>

     {/* Çerez Nedir? */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Çerez (Cookie) Nedir?</h2>
      <p>
       Çerezler, bir web sitesini ziyaret ettiğinizde bilgisayarınıza, tabletinize veya mobil cihazınıza kaydedilen küçük metin dosyalarıdır. Bu dosyalar, web sitesinin cihazınızı tanımasına ve tercihlerinizi (örneğin dil seçimi, alışveriş sepeti içeriği vb.) hatırlamasına olanak tanır.
      </p>
     </section>

     {/* Hangi Çerezleri Kullanıyoruz? */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Hangi Tür Çerezleri Kullanıyoruz?</h2>
      <ul className="list-disc pl-5 space-y-2">
       <li>
        <strong>Zorunlu Çerezler:</strong> Web sitesinin düzgün çalışması için gereklidir. Örneğin, elektronik cihazları sepetinize eklemenizi ve güvenli ödeme yapmanızı sağlayan çerezler bu kategoridedir.
       </li>
       <li>
        <strong>Performans ve Analiz Çerezleri:</strong> Ziyaretçilerin sitemizi nasıl kullandığını analiz etmemize yardımcı olur (örneğin, en çok hangi telefon veya bilgisayar modellerinin incelendiği). Bu veriler anonim olarak toplanır.
       </li>
       <li>
        <strong>İşlevsel Çerezler:</strong> Site tercihlerini (örneğin kullanıcı adı veya bölge seçimi) hatırlayarak daha kişiselleştirilmiş bir deneyim sunar.
       </li>
       <li>
        <strong>Hedefleme ve Reklam Çerezleri:</strong> İlgi alanlarınıza uygun elektronik ürün reklamları göstermek için kullanılır.
       </li>
      </ul>
     </section>

     {/* Çerez Yönetimi */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Çerezleri Nasıl Yönetebilirsiniz?</h2>
      <p>
       Tarayıcı ayarlarınızı değiştirerek çerez tercihlerini yönetebilirsiniz. Ancak, çerezleri devre dışı bırakmanız durumunda web sitemizin bazı özellikleri (örneğin sepet işlemleri) düzgün çalışmayabilir. Tarayıcınızın &quot;Ayarlar&quot; veya &quot;Gizlilik&quot; bölümünden çerezleri silebilir veya engelleyebilirsiniz.
      </p>
     </section>

     {/* İletişim Bilgileri */}
     <section className="mt-8 pt-6 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">İletişim</h2>
      <p className="mb-2">
       Çerez politikamızla ilgili her türlü soru ve görüşünüz için bize aşağıdaki bilgilerden ulaşabilirsiniz:
      </p>
      <div className="bg-gray-100 p-4 rounded-lg text-sm">
       <p><strong>Firma Adı:</strong> Elektronik Dünyası</p>
       <p><strong>Adres:</strong> Mehmet Akif, Recep Ayan Cd. 23B, 34406, Çekmeköy/İstanbul</p>
       <p><strong>Telefon:</strong> 0546 219 72 21</p>
      </div>
     </section>

    </div>
   </div>
  </div>
 );
};

export default CerezPolitikasiPage;