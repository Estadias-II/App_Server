-- backend/scripts/create_superadmin.sql
INSERT INTO Usuarios (
    nombres, 
    apellidos, 
    fecha_nacimiento, 
    correo, 
    pais, 
    ciudad, 
    codigo_postal, 
    usuario, 
    contraseña, 
    rol,
    created_at,
    updated_at
) 
VALUES (
    'Super', 
    'Administrador', 
    '2000-01-01', 
    'superadmin@kazokugames.com', 
    'mx', 
    'Ciudad de México', 
    '00000', 
    'superadmin', 
    '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi',
    'superadmin',
    NOW(),
    NOW()
) 
ON DUPLICATE KEY UPDATE 
    updated_at = NOW();