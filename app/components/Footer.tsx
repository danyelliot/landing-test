import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="mx-auto max-w-7xl overflow-hidden px-6 py-20 sm:py-24 lg:px-8">
        <nav className="-mb-6 columns-2 sm:flex sm:justify-center sm:space-x-12" aria-label="Footer">
          {/* Updated navigation links */}
          <div className="pb-6">
            <Link href="/" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Inicio
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Sobre HackeMate
            </Link>
          </div>
          <div className="pb-6">
            <Link href="/publications" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Publicaciones {/* Updated link text */}
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Certificaciones
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Eventos
            </Link>
          </div>
          <div className="pb-6">
            <Link href="#" className="text-sm leading-6 text-muted-foreground hover:text-foreground">
              Términos
            </Link>
          </div>
        </nav>
        <p className="mt-10 text-center text-sm leading-5 text-muted-foreground">
          © 2025 HackeMate. Desarrollado por Gianpaul Custodio. Todos los derechos reservados.{" "}
          {/* Updated copyright text */}
        </p>
      </div>
    </footer>
  )
}
