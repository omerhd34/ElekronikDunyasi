export default function IletisimHero() {
  return (
    <section className="relative overflow-hidden bg-emerald-950 text-white">
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_bottom_left,var(--tw-gradient-stops))] from-emerald-400 via-emerald-950 to-emerald-950" />
      <div className="container relative z-10 px-4 py-14 md:py-20 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-5xl">
          Bize Ulaşın
        </h1>
        <p className="mx-auto mt-3 max-w-lg text-emerald-200/80 text-base md:text-lg">
          Sorularınız, önerileriniz veya siparişleriniz hakkında bizimle
          iletişime geçin.
        </p>
      </div>
    </section>
  );
}
