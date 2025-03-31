# **📂 Proyecto GBDESK**

## **🛠️ Forma de trabajo**

Este proyecto utiliza una arquitectura modular, organizada en capas que separan las responsabilidades de cada componente.

📁 **Estructura del Proyecto:**
- 📄 **config/**: Archivos de configuración (base de datos, seguridad, etc.).
- 🖥️ **controllers/**: Controladores que gestionan las solicitudes y respuestas de la aplicación.
- 🗄️ **database/**: Modelos y procedimientos para interactuar con la base de datos.
- 🌐 **routes/**: Rutas que definen las URLs y cómo se manejan las solicitudes.
- 🔧 **services/**: Lógica de negocio centralizada, con servicios que encapsulan funcionalidades clave.
- 🚀 **app.js**: Archivo principal para configurar y arrancar la aplicación.

✅ **Modularidad:** Cada componente es independiente, lo que facilita la extensión y mantenimiento.

📈 **Escalabilidad:** El sistema es fácil de escalar añadiendo nuevos módulos sin complicaciones.

🧩 **Organización Clara:** La separación de responsabilidades mejora la comprensión y colaboración entre equipos.

📏 Estándares de Codificación

Para mantener la coherencia y la legibilidad del código, seguimos estos estándares:

🔤 Convención de Nombres

Variables: Usamos notación húngara en las variables que vienen de base de datos.

    let sNombre = "Juan";  // Variable de tipo string
    let iEdad = 25;        // Variable de tipo entero
    let arrUsuarios = [];    // Variable de tipo array

Funciones: Usamos camelCase y deben comenzar con un verbo.

    function obtenerUsuario() { ... }
    function calcularPromedio() { ... }

Clases: Utilizamos PascalCase.

    class Usuario { ... }


## **⚙️ Requisitos del sistema**
- 🟩 Node v21.7.3
- 📦 NPM 10.9.1

## **🚀 ¿Cómo iniciar el proyecto?**
### **Paso 1 - 📥 Descarga el repositorio**

Clonar el repositorio:
```bash
git clone https://github.com/usuario/repositorio
```

Acceder a la carpeta del proyecto:
```bash
cd GebesaAPI
```

---
### **Paso 2 - ⚙️ Configurar tu proyecto**

📄 Copiar el archivo `.env.example` a `.env`:
```bash
copy .env.example .env
```

✏️ Editar el archivo `.env` y configurar las variables necesarias:
```env
# Connection to database
DB_SERVER=localhost
DB_DATABASE=GebesaDesks
DB_USER=*****
DB_PASSWORD=******
DB_PORT=1433

# Generate a strong encryption key
# You can use: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
JWT_TOKEN_SECRET=ClaveSuperSecretas
JWT_TOKEN_EXPIRATION=5m

# Generate a strong encryption key
# You can use: node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
JWT_REFRESH_TOKEN_SECRET=ClaveSuperSecreta
JWT_REFRESH_TOKEN_EXPIRATION=1h

SALT=10

# This is a private Firebase API push notification key.
fbcm="C:\\crts\\gdc.json" 

tokenpath="C:/token" <-


SERVER_PORT=3000

```

📌 Generar una clave secreta:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

📌 Generar json con credenciales de firebase 

- Paso 1: entrar a tu cuenta de google console https://console.firebase.google.com/
- Paso 2: crear un proyecto o elegir uno que tengas, elegimos agregar firebase a nuestra app tendra un simbolo como este (</>)
- Paso 3: una vez configurado entramos a la configuración del proyecto y nos saldran unas pestañas
    - General
    - Cloud Messaging <- `Elegimos esta pestaña`
    - Integraciones
    - Cuentas de servicio
    - Privacidad de los datos
    - Usuarios y permisos
- Paso 4: al fondo de la página nos saldra configuración web, y damos click en `Generate key pair`, nos deberia de descargar un archivo como el de abajo
```bash

al final se te debe de entregar un archivo json como este 
{
  "type": "service_account",
  "project_id": "gebesa-desk-controller",
  "private_key_id": "c231e1c9d44df77fd53fc30bc0f5bc7c242afbe9",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqh...\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase@firebase.com",
  "client_id": "id",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
Esto es muy importante para las notificaciones
```
- Paso 5: copiar y mandarlos a una carpeta con privilegios para que pueda acceder el proyecto ejemplo: "C:\\crts\\gdc.json" y esta ruta poner en el .env
- Paso 6: con estos pasos deberias de poder generar tus notificaciones para tu aplicación

💾 Instalar dependencias:
```bash
npm install
```

🚀 Ejecutar el proyecto:
```bash
npm start
```

---
## **📄 Documentación de Endpoints de la API**

### 🔑 **JWT**:
Se utiliza token generado por el estandar JWT

- **`POST /login`** - Inicia sesión
- **`POST /logout`** - Cierra sesión
- **`POST /refreshToken`** - Renueva el token de acceso
- **`POST /register`** - Registra un nuevo usuario

### 👤 **/session/user**
- **`POST /updateinfo`** - Actualiza la información del usuario
- **`POST /delete`** - Elimina el usuario
- **`POST /setgoal`** - Establece una meta para el usuario

### 🖥️ **/session/desk**
- **`POST /movement`** - Guarda movimientos en el escritorio
- **`POST /connection`** - Crea una conexión con el escritorio

### 🔄 **/session/routine**
- **`POST /routine`** - Procesa una rutina
- **`GET /routine`** - Recupera información de la rutina
- **`POST /prepared/start`** - Inicia la rutina
- **`POST /prepared/stop`** - Detiene la rutina

### 📊 **/session/report**
- **`POST /report`** - Genera un informe sobre el progreso de calorías

---
### 🔒 **Notas**
- Asegúrate de que las credenciales estén configuradas correctamente para evitar problemas de autenticación.
- Las rutas `POST` requieren un cuerpo de solicitud con los datos apropiados para la funcionalidad correspondiente.

# api-adjust-height-t
