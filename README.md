# Sociedad de Debates "Prof. Rodrigo Pica F." - Universidad Central de Chile

Sitio web oficial y portal editorial jurídico diseñado con la estética institucional de la Sociedad de Debates UCEN y la estructura de prensa jurídica inspirada en el **Diario Constitucional de Chile**.

---

## 🚀 ¿Cómo abrir y ver la página en tu computador?
No requiere instalación de bases de datos ni configuración compleja:
1. Haz doble clic en el archivo [`index.html`](file:///Users/mac/Downloads/Mi%20biblioteca%20para%20la%20IA/sociedad-debates-web/index.html) para abrirlo en cualquier navegador (Chrome, Safari, Edge, Firefox).
2. O bien, si tienes una extensión como *Live Server* en VS Code o similar, ábrelo directamente desde la carpeta `sociedad-debates-web`.

---

## ✨ Características y Secciones Incluidas

### 1. Portada y Diseño Institucional Fiel
- **Paleta de Colores y Tipografías Oficiales**: Azul marino profundo (`#06111f`), azul acero (`#7fa6d3`), dorados institucionales, fuentes *Anton*, *Mrs Saint Delafield* (cursiva distinguida del Prof. Rodrigo Pica F.) y *DM Sans*.
- **Homenaje In Memoriam**: Sección dedicada a la memoria del ex ministro del Tribunal Constitucional Rodrigo Pica Flores.
- **Entrevista Radio UCEN 107.1 FM**: Reproductor de video integrado y enlaces directos.

### 2. Sección Editorial y de Artículos (Estilo Diario Constitucional de Chile)
- **Diseño Periodístico**: Destacado principal de portada con imagen, bajada, tiempo de lectura y cápsula del autor.
- **Columna Lateral de Especialistas**: Columnas de opinión breves para debate y discusión doctrinaria.
- **Filtros temáticos por categoría**:
  - *Doctrina & Debate Constitucional*
  - *Opinión & Columnas*
  - *Jurisprudencia Comentada*
  - *Debate & Sociedad*
- **Apertura de lectura completa**: Al hacer clic en cualquier artículo o columna se abre una ventana modal con formato de lectura editorial limpia, citas destacadas, perfil del autor y su enlace directo a LinkedIn.

### 3. Red de Socios & Equipo (Conexión LinkedIn)
- Tarjetas de cada integrante con rol, insignias de especialidad y síntesis biográfica.
- **Botón oficial de LinkedIn**: Cada miembro cuenta con su enlace directo a su perfil profesional.

### 4. Repositorio de Archivos y Materiales Académicos
- Sección con visor y filtros para:
  - *Minutas de Debate*
  - *Compendios de Mociones & Rúbricas*
  - *Guías y Manuales de Litigación / Retórica*
  - *Estatutos y Reglamentos de la Sociedad*
- Botones de descarga directa de material.

### 5. Modo Edición Visual In Situ ("Estilo Wix") & Panel CMS
- **Roles Diferenciados**:
  - **Admin Central (`admin` / `debate2026`)**: Control absoluto, editor visual de toda la web, gestión de contraseñas y creación de nuevos Editores y Socios.
  - **Editor (`editor` / `editor2026`)**: Acceso al **Modo Edición Visual**, cambio in situ de fotos, textos, colores y ordenamiento de artículos.
  - **Socio Redactor (`socio` / `socio2026`)**: Solo redacción y envío de artículos y columnas de opinión (sin acceso a modificar elementos globales ni fotos del sitio).
- **Edición Visual Directa**:
  - Al iniciar sesión como Editor o Admin, aparece una barra flotante dorada inferior.
  - **Textos**: Haz clic directamente sobre cualquier título, bajada o párrafo para escribir.
  - **Imágenes**: Al pasar el ratón sobre cualquier foto (hero, logo, homenaje a Rodrigo Pica, feed de Instagram) aparece la opción *"📷 Cambiar Foto"*, permitiendo pegar una URL o cargar un archivo directo desde tu computador.
  - **Colores del Tema**: Selector con paletas predefinidas (*UCEN Clásico, Vino Forense, Corte Suprema*) o ajuste fino con selector de color hexadecimal.
  - **Guardar Cambios**: Botón *"💾 Guardar Cambios"* para persistir todas las modificaciones.

---

## 🌐 Cómo trabajar de forma más orgánica (sin arrastrar carpetas todo el tiempo)

### Opción 1 (Inmediata y actual): Despliegue en Netlify Drop
Arrastras la carpeta `sociedad-debates-web` a [Netlify Drop](https://app.netlify.com/drop). Todo lo editado visualmente por el editor se guarda en el navegador.

### Opción 2 (La más profesional y 100% automática): Conectar Netlify a GitHub
1. Creas un repositorio gratuito en GitHub (ej. `sociedad-debates-ucen`).
2. En Netlify, eliges **"Import from Git"** y seleccionas tu repositorio de GitHub.
3. A partir de ese momento, cada vez que hagas un cambio o uses un CMS git, **Netlify se actualiza solo en 30 segundos sin que tengas que volver a subir carpetas manualmente nunca más**.

### Opción 3 (Base de Datos en tiempo real gratuita: Supabase o Firebase):
Si quieres que múltiples editores modifiquen la web desde diferentes computadores y los visitantes vean los cambios al instante sin re-compilar Netlify, se conecta una base de datos gratuita como Supabase o Firebase REST que alimente los artículos y los textos editados en vivo.

