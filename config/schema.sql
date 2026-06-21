-- Схема базы данных для высоконагруженного сервисного центра
-- Платформа: PostgreSQL

-- Таблица комплектующих
CREATE TABLE components (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50), -- cpu, gpu, motherboard, ram, etc.
    brand VARCHAR(50),
    model VARCHAR(100),
    price DECIMAL(10, 2),
    stock_quantity INTEGER DEFAULT 0,
    specifications JSONB, -- Здесь храним сокеты, частоты, размеры
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заказов на сборку
CREATE TABLE pc_builds (
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    total_price DECIMAL(10, 2),
    status VARCHAR(20) DEFAULT 'pending', -- pending, assembling, ready, delivered
    configuration JSONB, -- Список ID компонентов
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица заявок на ремонт
CREATE TABLE repair_tickets (
    id SERIAL PRIMARY KEY,
    client_name VARCHAR(100),
    device_model VARCHAR(100),
    issue_description TEXT,
    status VARCHAR(30), -- diagnostic, waiting_parts, in_progress, ready
    estimated_cost DECIMAL(10, 2),
    master_id INTEGER,
    photos TEXT[], -- Ссылки на фото процесса
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
