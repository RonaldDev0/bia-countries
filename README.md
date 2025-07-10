## Arquitectura y Solución

### Arquitectura propuesta

- **Framework:** Next.js (App Router, SSR/CSR híbrido) para máxima performance y escalabilidad.
- **Estado global:** Zustand para gestión eficiente y reactiva del estado (búsqueda, filtros, caché de países y detalles).
- **Componentización:** UI desacoplada en componentes reutilizables (`Card`, `Filter`, `SearchBar`, `NavBar`), siguiendo principios de Atomic Design y Clean Code.
- **Estilos:** Tailwind CSS con soporte completo para **Dark Mode** (usando variantes `dark:`), asegurando accesibilidad y experiencia de usuario moderna.
- **Responsive Design:** Layout fluido y adaptativo, optimizado para desktop y mobile, siguiendo la guía de estilos proporcionada.
- **Consumo de API:** Integración robusta con [REST Countries API](https://restcountries.com/#rest-countries), desacoplando lógica de fetch y presentación.
- **Ruteo y detalle:** Navegación dinámica; al seleccionar un país, se muestra una vista detallada con toda la información relevante, optimizando UX.
- **Testing:** Pruebas unitarias con Vitest y Testing Library, garantizando calidad y mantenibilidad del código.
- **Accesibilidad:** Uso de roles, labels y focus rings para cumplir buenas prácticas de accesibilidad web (a11y).

### Generalidades de la solución

- Se implementó un **buscador** y **filtros** funcionales por región, con renderizado instantáneo y sin recargas.
- El **modo oscuro** es persistente y configurable por el usuario (localStorage).
- El código sigue principios SOLID, DRY y KISS, con comentarios mínimos y claros.
- Se priorizó la experiencia de usuario, la performance y la mantenibilidad.
- El proyecto es fácilmente escalable y extensible para nuevas features o integraciones.