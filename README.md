# Weather App (React + Vite)

Aplicación web para consultar el clima, creada con React, Vite y Tailwind CSS. Incluye vista del clima actual, pronóstico por horas y días, búsqueda de ciudades, lista de favoritos y un asistente opcional basado en Gemini.

## Link 
https://clim-ia-app.netlify.app/

## Características

- Clima actual, pronóstico horario (24h) y pronóstico diario (5 días).
- Búsqueda de ciudades con autocompletado.
- Guardado de ubicaciones favoritas.
- Efectos visuales (por ejemplo lluvia) y UI responsiva con Tailwind.
- Asistente opcional (Gemini) para recomendaciones rápidas según el clima.

## Tecnologías

- React
- Vite
- Tailwind CSS
- Axios
- Open-Meteo (API pública para datos meteorológicos)

## Estructura principal del proyecto

- `src/main.jsx` – Entrada de la aplicación
- `src/App.jsx` – Componente raíz
- `src/components/layout/MainLayout.jsx` – Layout principal
- `src/components/search/SearchBar.jsx` – Barra de búsqueda
- `src/components/weather/CurrentWeather.jsx` – Vista clima actual
- `src/components/weather/HourlyForecast.jsx` – Pronóstico por horas
- `src/components/weather/DailyForecast.jsx` – Pronóstico diario
- `src/components/weather/WeatherDetails.jsx` – Detalles del clima
- `src/components/assistant/WeatherAI.jsx` – Asistente Gemini (opcional)
- `src/components/favorites/FavoritesList.jsx` – Lista de favoritos
- `src/components/effects/RainEffect.jsx` – Efecto lluvia
- `src/services/weatherService.js` – Lógica para consumir Open-Meteo
- `src/services/geminiService.js` – Integración opcional con Gemini (requiere API Key)

## Requisitos

- Node.js 18 o superior
- npm o yarn

## Instalación

1. Clona el repositorio:

```bash
git clone <repositorio>
cd weather-app
```

2. Instala dependencias:

```bash
npm install
# o
# yarn install
```

## Ejecución en desarrollo

```bash
npm run dev
```

Abre `http://localhost:5173` (o la URL que indique Vite) en tu navegador.

## Generar build y previsualizar

```bash
npm run build
npm run preview
```

## APIs y configuración

- Datos meteorológicos: `src/services/weatherService.js` utiliza la API pública de Open-Meteo (https://open-meteo.com). No requiere API key.
- Geocodificación (búsqueda de ciudades): integrada con Open-Meteo Geocoding.
- Asistente Gemini (opcional): `src/services/geminiService.js` requiere una API Key de Google Generative AI. El componente `src/components/assistant/WeatherAI.jsx` permite pegar la API Key desde la interfaz (se guarda en `localStorage` bajo la clave `gemini_api_key`).

Consejo: si usas Gemini, guarda tu API key localmente en la aplicación (no la subas al repositorio).

## Contribuir

- Haz fork del proyecto y crea una rama con tu mejora: `git checkout -b feature/nombre`
- Abre un Pull Request describiendo los cambios.
- Asegúrate de que la UI sea responsiva y de que no se filtren claves ni datos sensibles.

## Sugerencias y mejoras posibles

- Añadir tests unitarios/integación.
- Añadir caching local de respuestas para ahorrar llamadas a la API.
- Soporte para temas (claro/oscuro) y localización adicional.

## Licencia

No se ha especificado una licencia en este repositorio. Añade un archivo `LICENSE` si deseas declarar una licencia (por ejemplo MIT).

## Contacto

Si tienes dudas o mejoras, abre un issue en el repositorio o contacta al autor del proyecto.

---

Gracias por usar y mejorar esta aplicación del clima. ¡Disfruta construyendo sobre ella!
