-- Pharmacy Management System
-- Sample Seed Data

-- Clear existing data (optional)
DELETE FROM order_items;
DELETE FROM orders;
DELETE FROM stock_alerts;
DELETE FROM medicines;

-- Reset auto-increment IDs
ALTER SEQUENCE medicines_id_seq RESTART WITH 1;
ALTER SEQUENCE orders_id_seq RESTART WITH 1;
ALTER SEQUENCE order_items_id_seq RESTART WITH 1;
ALTER SEQUENCE stock_alerts_id_seq RESTART WITH 1;

-- Sample Medicines

INSERT INTO medicines
(name, category, stock, price, low_stock_threshold, description)
VALUES
('Paracetamol 650', 'Painkiller', 100, 12.50, 20, 'Used for fever and pain relief'),

('Ibuprofen 400', 'Painkiller', 80, 18.75, 15, 'Used to reduce pain and inflammation'),

('Amoxicillin 500', 'Antibiotic', 60, 35.00, 10, 'Used for bacterial infections'),

('Cetirizine 10', 'Antihistamine', 50, 8.50, 10, 'Used for allergy relief'),

('Omeprazole 20', 'Antacid', 40, 22.00, 8, 'Used to treat acidity and ulcers'),

('Metformin 500', 'Diabetes', 70, 16.50, 15, 'Used to control blood sugar'),

('Azithromycin 500', 'Antibiotic', 35, 55.00, 10, 'Used for respiratory infections'),

('Vitamin C Tablets', 'Supplement', 120, 10.00, 30, 'Supports immunity'),

('Dolo 650', 'Painkiller', 150, 14.00, 25, 'Relieves fever and body pain'),

('Pantoprazole 40', 'Antacid', 65, 28.00, 12, 'Reduces stomach acid'),

('ORS Powder', 'Electrolyte', 90, 18.00, 20, 'Prevents dehydration'),

('Insulin Glargine', 'Diabetes', 25, 450.00, 5, 'Long-acting insulin'),

('Salbutamol Inhaler', 'Respiratory', 45, 180.00, 10, 'Quick relief from asthma'),

('Zinc Tablets', 'Supplement', 100, 12.00, 20, 'Supports immunity and healing'),

('Aspirin 75', 'Cardiac', 55, 20.00, 10, 'Reduces risk of heart attack and stroke');

-- Sample Orders

INSERT INTO orders
(user_id, status, total_amount)
VALUES
('USER001', 'COMPLETED', 43.75),

('USER002', 'COMPLETED', 55.00);

-- Sample Order Items
INSERT INTO order_items
(order_id, medicine_id, medicine_name, quantity, unit_price, subtotal)
VALUES
(1, 1, 'Paracetamol 650', 2, 12.50, 25.00),

(1, 2, 'Ibuprofen 400', 1, 18.75, 18.75),

(2, 7, 'Azithromycin 500', 1, 55.00, 55.00);

-- Sample Stock Alerts
INSERT INTO stock_alerts
(medicine_id, medicine_name, current_stock, threshold, message)
VALUES
(12,
'Insulin Glargine',
5,
5,
'Stock threshold reached for Insulin Glargine'),

(14,
'Salbutamol Inhaler',
10,
10,
'Low stock alert generated for Salbutamol Inhaler');
