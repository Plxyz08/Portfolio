import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/react"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Sebastián Muñoz | Full-Stack Developer",
  description:
    "Portfolio de Sebastián Muñoz, desarrollador Full-Stack con experiencia en diseño web y desarrollo de software.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        {/* Script para eliminar atributos bis_skin_checked */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
            (function() {
              if (typeof window !== 'undefined') {
                const observer = new MutationObserver((mutations) => {
                  mutations.forEach((mutation) => {
                    if (mutation.type === 'attributes' && mutation.attributeName.includes('bis_')) {
                      const element = mutation.target;
                      element.removeAttribute(mutation.attributeName);
                    }
                  });
                });
                
                // Iniciar observación cuando el DOM esté listo
                document.addEventListener('DOMContentLoaded', () => {
                  observer.observe(document.body, {
                    attributes: true,
                    subtree: true,
                    attributeFilter: ['bis_skin_checked', 'bis_register', '__processed_a']
                  });
                  
                  // Limpiar atributos existentes
                  document.querySelectorAll('[bis_skin_checked], [bis_register], [__processed_a]').forEach(el => {
                    Array.from(el.attributes).forEach(attr => {
                      if (attr.name.includes('bis_') || attr.name.includes('__processed_')) {
                        el.removeAttribute(attr.name);
                      }
                    });
                  });
                });
              }
            })();
          `,
          }}
        />
        <link rel="icon" href="/Icono.ico" type="image/x-icon" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <Analytics  />
      </body>
    </html>
  )
}

