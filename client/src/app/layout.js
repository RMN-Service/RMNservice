import './globals.css'

export const metadata = {
  title: 'RMN Service | Ремонт компьютеров премиум-класса',
  description: 'Профессиональный ремонт и обслуживание IT-инфраструктуры',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  )
}
