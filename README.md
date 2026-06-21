# Service Center Platform v1.0 (Enterprise Edition)

Проект разработан как высокотехнологичное решение для сервисного центра с бюджетом $50,000.

## 🏗 Архитектура
- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion, Zustand.
- **Backend**: NestJS (Node.js), PostgreSQL, TypeORM.
- **Интеграции**: Telegram Bot API, Custom Compatibility Engine.

## 🚀 Ключевые модули
1.  **Smart Configurator**: Алгоритм проверки совместимости (Socket, RAM Type, TDP, Form Factor).
2.  **Repair Tracking**: Система отслеживания статуса ремонта в реальном времени для клиентов.
3.  **Telegram Bridge**: Автоматические уведомления мастеров и клиентов.
4.  **Enterprise DB Schema**: Масштабируемая структура данных для сети филиалов.

## 📂 Структура проекта
- `/client`: Исходный код фронтенда (React компоненты, Store).
- `/server`: Логика бэкенда, контроллеры и сервисы.
- `/libs`: Общие библиотеки (движок совместимости).
- `/config`: Конфигурации БД и системные настройки.

## 🛠 Установка и запуск
1. Настройте `.env` на основе `config/schema.sql`.
2. Запустите бэкенд: `cd server && npm install && npm run start`.
3. Запустите фронтенд: `cd client && npm install && npm run dev`.

---
*Разработано Kodik AI для профессионального использования.*
