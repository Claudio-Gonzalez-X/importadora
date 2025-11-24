# Importadora GonSeg - E-commerce Web Application

Este proyecto consiste en una aplicación web de comercio electrónico desarrollada para la gestión de productos, ventas y usuarios de "Importadora GonSeg". La plataforma permite la interacción de tres roles diferenciados: Administradores, Importadores y Clientes finales.

## 🛠 Argumentación Técnica (Stack Tecnológico)

Para el desarrollo de esta solución se seleccionó una arquitectura **SPA (Single Page Application)** basada en **JavaScript**, priorizando la experiencia de usuario y la escalabilidad.

### 1. Frontend: React.js (v19)
Se eligió **React** como biblioteca principal debido a su arquitectura basada en componentes, lo que facilita la reutilización de código y el mantenimiento.
- **Gestión de Estado:** Se implementó `Context API` (`AuthContext` y `CartContext`) para manejar el estado global de la sesión del usuario y el carrito de compras sin necesidad de librerías externas pesadas (Redux), optimizando el rendimiento.
- **Enrutamiento:** Uso de `react-router-dom` para una navegación fluida sin recargas de página, mejorando la UX.

### 2. Diseño y Responsividad: Tailwind CSS
Para cumplir con los requerimientos de **adaptabilidad a dispositivos móviles (Mobile First)**, se utilizó **Tailwind CSS**.
- **Justificación:** A diferencia de CSS puro o Bootstrap, Tailwind permite construir interfaces personalizadas rápidamente mediante clases utilitarias.
- **Implementación Responsiva:** Se utilizaron breakpoints (`sm:`, `md:`, `lg:`) en componentes críticos como el `Navbar` (que cambia de menú horizontal a menú hamburguesa) y la grilla de productos (`grid-cols-1` a `grid-cols-4`), asegurando que la aplicación sea totalmente funcional en celulares, tablets y escritorios.

### 3. Backend & Base de Datos: Supabase
Se optó por **Supabase** como solución BaaS (Backend as a Service).
- **Base de Datos:** PostgreSQL para la persistencia de datos relacional (productos, usuarios).
- **Autenticación:** Gestión segura de usuarios y roles (`admin`, `importador`, `usuario`) mediante `Supabase Auth`.

---

## 🚀 Instalación y Despliegue

Sigue estos pasos para ejecutar el proyecto en local:


1. **Clonar el repositorio:**
    
    git clone <URL_DEL_REPOSITORIO>
    cd migracion-react


2. **Instalar dependencias:**

    npm install

    Nota: Las dependencias principales se encuentran detalladas en el package.json.


3. **Variables de entorno:**

    Crea un archivo .env en la raíz y agrega tus credenciales de Supabase:

    REACT_APP_SUPABASE_URL=tu_url_aqui
    REACT_APP_SUPABASE_ANON_KEY=tu_key_aqui


4. **Ejecutar el servidor de desarollo:**
    npm start