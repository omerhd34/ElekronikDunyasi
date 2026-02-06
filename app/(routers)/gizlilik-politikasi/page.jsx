import React from 'react';

const GizlilikPolitikasiPage = () => {
 return (
  <div className="bg-gray-50 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
   <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8 border border-gray-100">

    {/* Başlık Alanı */}
    <div className="mb-8 border-b pb-4">
     <h1 className="text-3xl font-bold text-gray-900">Gizlilik Politikası</h1>
     <p className="mt-2 text-sm text-gray-500">Son Güncelleme: {new Date().toLocaleDateString('tr-TR')}</p>
    </div>

    <div className="space-y-6 text-gray-700 leading-relaxed">

     {/* Giriş */}
     <section>
      <p>
       <strong>Elektronik Dünyası</strong> olarak, müşterilerimizin kişisel verilerinin güvenliğine büyük önem veriyoruz. Bu Gizlilik Politikası, web sitemiz üzerinden elektronik cihaz alışverişi yaparken topladığımız kişisel verilerin neler olduğunu, nasıl kullanıldığını ve haklarınızı açıklamaktadır.
      </p>
     </section>

     {/* Toplanan Veriler */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Hangi Verileri Topluyoruz?</h2>
      <p className="mb-2">Hizmetlerimizi sağlayabilmek adına aşağıdaki verileri toplayabiliriz:</p>
      <ul className="list-disc pl-5 space-y-2">
       <li><strong>Kimlik Bilgileri:</strong> Ad, soyad, T.C. kimlik numarası (fatura kesimi için zorunlu hallerde).</li>
       <li><strong>İletişim Bilgileri:</strong> Adres, telefon numarası, e-posta adresi.</li>
       <li><strong>Müşteri İşlem Bilgileri:</strong> Satın aldığınız ürünler (cep telefonu, bilgisayar vb.), sipariş geçmişi ve fatura bilgileri.</li>
       <li><strong>İşlem Güvenliği Bilgileri:</strong> IP adresi, şifre ve parola bilgileri, çerez kayıtları.</li>
      </ul>
     </section>

     {/* Verilerin Kullanım Amacı */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Verilerinizi Hangi Amaçla Kullanıyoruz?</h2>
      <p>Topladığımız kişisel veriler şu amaçlarla işlenmektedir:</p>
      <ul className="list-disc pl-5 space-y-2 mt-2">
       <li>Siparişlerinizin onaylanması, hazırlanması ve adresinize teslim edilmesi.</li>
       <li>Elektronik ürünlerinizle ilgili garanti ve teknik servis süreçlerinin yürütülmesi.</li>
       <li>Yasal yükümlülüklerin (fatura kesimi vb.) yerine getirilmesi.</li>
       <li>Müşteri destek taleplerinizin yanıtlanması.</li>
      </ul>
     </section>

     {/* Veri Paylaşımı */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Verileriniz Kimlerle Paylaşılıyor?</h2>
      <p>
       Kişisel verileriniz, yalnızca hizmetin ifası için gerekli olduğu ölçüde;
       siparişinizi teslim eden <strong>kargo firmaları</strong>, ödemenizi işleyen <strong>ödeme hizmet sağlayıcıları</strong> (bankalar/iyzico vb.) ve kanunen yetkili kamu kurumlarıyla paylaşılmaktadır. Verileriniz asla izniniz dışında üçüncü şahıslara pazarlama amacıyla satılmaz.
      </p>
     </section>

     {/* KVKK Hakları */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">KVKK Kapsamındaki Haklarınız</h2>
      <p className="mb-2">6698 Sayılı Kişisel Verilerin Korunması Kanunu (KVKK) uyarınca;</p>
      <ul className="list-disc pl-5 space-y-1">
       <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
       <li>İşlenen verilerinizin düzeltilmesini veya silinmesini talep etme,</li>
       <li>Verilerinizin kanuna aykırı işlenmesi sebebiyle zarara uğramanız halinde zararın giderilmesini talep etme hakkına sahipsiniz.</li>
      </ul>
     </section>

     {/* Güvenlik */}
     <section>
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Veri Güvenliği</h2>
      <p>
       Kredi kartı bilgileriniz sistemlerimizde saklanmamaktadır. Ödeme işlemleri 256-bit SSL sertifikası ile şifrelenerek doğrudan banka veya ödeme kuruluşu altyapısı üzerinden gerçekleştirilir.
      </p>
     </section>

     {/* İletişim */}
     <section className="mt-8 pt-6 border-t border-gray-200">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">Bize Ulaşın</h2>
      <p className="mb-2">
       Gizlilik politikamız veya kişisel verilerinizle ilgili talepleriniz için bize aşağıdaki kanallardan ulaşabilirsiniz:
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

export default GizlilikPolitikasiPage;