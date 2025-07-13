# Rick & Morty App · Prueba Técnica Flat101

Esta aplicación muestra información de episodios y localizaciones de la serie **Rick & Morty** usando la [Rick and Morty API](https://rickandmortyapi.com/).  
Desarrollada como prueba técnica con **Next.js 15** (App Router), **TypeScript** y **Tailwind CSS**.

## Funcionalidades principales

- Listado paginado de **episodios**.
- Buscador de episodios por nombre (en el header).
- Detalle de cada episodio con personajes asociados y un formulario de comentarios simulado.
- Listado paginado de **localizaciones**.
- Buscador de localizaciones por nombre (en el header).
- Detalle de localización con listado de residentes.
- Navegación SPA (sin recargas de página).

## Requisitos

- **Node.js** v18 o superior
- **npm** v9 o superior
- **Next.js** v15 o superior

## Instalación y uso

1. **Clona el repositorio**
   ```bash
   git clone <url-del-repo>
   cd <carpeta-del-proyecto>
   ```
2. **Instala las dependencias**
   npm install
3. **Desarrollo**
   npm run dev
4. **Producción**
   npm run build
   npm run start
5. **Puerto desarrollo y producción**
   Accede a http://localhost:3000

## Notas técnicas

La app está en React Client Components ("use client" en cada página).

El buscador del header funciona tanto para episodios como para localizaciones.

El formulario de comentarios en el detalle de episodio no envía datos reales; simula una petición a un endpoint ficticio.

El contexto de estado (React Context) se usa para gestión de búsqueda, episodios y localizaciones.

Las imágenes externas están configuradas correctamente en el next.config.js usando remotePatterns.

## Estructura proyecto

/app
/components → Componentes compartidos
/context → Providers y hooks de contexto
/episodes → Listado y detalle de episodios
/locations → Listado y detalle de localizaciones
layout.tsx → Layout principal (Header, providers)
...
/public
...
/styles
...
next.config.js
...

## Consideraciones

Duplicidad de peticiones: En desarrollo (npm run dev) puede parecer que se hacen peticiones dobles debido a React Strict Mode, pero no ocurre en producción.

404 en detalles: Si navegas a un detalle inexistente (por ejemplo, un ID que no existe), la API externa devuelve un 404.

Estilos: El diseño es responsive y está hecho con Tailwind CSS para una apariencia moderna y minimalista.
