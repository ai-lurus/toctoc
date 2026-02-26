import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <nav className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="text-xl font-bold text-primary">TocToc</span>
          <Link
            href="/admin"
            className="text-sm text-text-secondary hover:text-text-primary transition-colors"
          >
            Admin
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-bold text-text-primary mb-6 leading-tight">
          Servicios del hogar
          <br />
          <span className="text-primary">cuando los necesitas</span>
        </h1>
        <p className="text-xl text-text-secondary mb-10 max-w-2xl mx-auto">
          Conectamos a personas con profesionales verificados para plomería,
          electricidad, limpieza, carpintería y más. Rápido, seguro y con
          garantía.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-text-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-text-secondary transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
            </svg>
            App Store
          </a>
          <a
            href="#"
            className="inline-flex items-center gap-2 bg-text-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-text-secondary transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 20.5v-17c0-.83.94-1.3 1.6-.8l14 8.5c.6.36.6 1.24 0 1.6l-14 8.5c-.66.5-1.6.03-1.6-.8z" />
            </svg>
            Google Play
          </a>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-surface border-y border-border py-20">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-text-primary mb-12">
            ¿Cómo funciona?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Elige el servicio",
                desc: "Selecciona qué necesitas: plomería, electricidad, limpieza, y más categorías disponibles.",
              },
              {
                step: "2",
                title: "Conectamos al profesional",
                desc: "Nuestros proveedores verificados reciben tu solicitud y el más cercano la acepta.",
              },
              {
                step: "3",
                title: "Listo y garantizado",
                desc: "Paga de forma segura dentro de la app y califica al profesional al terminar.",
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-12 h-12 rounded-full bg-primary-light text-primary font-bold text-xl flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-text-primary mb-2">
                  {item.title}
                </h3>
                <p className="text-text-secondary">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center text-text-primary mb-12">
          Servicios disponibles
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: "🔧", name: "Plomería" },
            { icon: "⚡", name: "Electricidad" },
            { icon: "🧹", name: "Limpieza" },
            { icon: "🪚", name: "Carpintería" },
            { icon: "🎨", name: "Pintura" },
            { icon: "❄️", name: "Aire acondicionado" },
            { icon: "🔒", name: "Cerrajería" },
            { icon: "🌿", name: "Jardinería" },
          ].map((cat) => (
            <div
              key={cat.name}
              className="bg-surface border border-border rounded-lg p-4 text-center hover:border-primary hover:shadow-sm transition-all"
            >
              <span className="text-3xl">{cat.icon}</span>
              <p className="mt-2 text-sm font-medium text-text-primary">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-text-primary text-white py-10">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <p className="text-2xl font-bold mb-2">TocToc</p>
          <p className="text-text-tertiary text-sm">
            © {new Date().getFullYear()} TocToc. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
