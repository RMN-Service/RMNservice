/**
 * Order Controller - Обработка заказов и ремонтов
 * Интеграция с внешними сервисами (Telegram, CRM)
 */

class OrderController {
    constructor(db, telegramService) {
        this.db = db;
        this.telegramService = telegramService;
    }

    /**
     * Создание новой заявки на ремонт
     */
    async createRepairTicket(req, res) {
        const { clientName, device, issue } = req.body;

        try {
            // 1. Сохраняем в БД
            const ticket = await this.db.query(
                'INSERT INTO repair_tickets (client_name, device_model, issue_description, status) VALUES ($1, $2, $3, $4) RETURNING *',
                [clientName, device, issue, 'new']
            );

            // 2. Уведомляем мастеров в Telegram
            await this.telegramService.sendMessage(
                `🆕 Новая заявка на ремонт!\n📱 Устройство: ${device}\n🛠 Проблема: ${issue}\n👤 Клиент: ${clientName}`
            );

            return res.status(201).json(ticket);
        } catch (error) {
            console.error('Ошибка при создании заявки:', error);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    /**
     * Обновление статуса (вызывается мастером)
     */
    async updateStatus(req, res) {
        const { ticketId, status, comment } = req.body;
        
        // Логика смены статуса и уведомления клиента через SMS/Email/Telegram
        // ...
    }
}

module.exports = OrderController;
