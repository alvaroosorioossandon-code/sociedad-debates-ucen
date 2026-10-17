/**
 * Controlador de Renderizado y Panel Editor
 * Sociedad de Debates "Prof. Rodrigo Pica F."
 */

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

function initApp() {
  renderArticles('todos');
  renderMembers();
  renderMaterials('todos');
  setupEditorialFilters();
  setupMaterialsFilters();
  setupModalReader();
  setupEditorDrawer();
  setupMobileNav();
}

// ==========================================
// RENDERIZADO DE ARTÍCULOS (ESTILO DIARIO CONSTITUCIONAL)
// ==========================================
function renderArticles(filter = 'todos') {
  const articles = window.DebatesDB.getArticles();
  const filtered = filter === 'todos' 
    ? articles 
    : articles.filter(a => a.category.toLowerCase().includes(filter.toLowerCase()));

  const leadCardContainer = document.getElementById('dc-lead-container');
  const sidebarContainer = document.getElementById('dc-sidebar-opinion-list');
  const subgridContainer = document.getElementById('articles-subgrid');

  if (!leadCardContainer || !sidebarContainer || !subgridContainer) return;

  // Artículo Destacado Principal
  const leadArticle = filtered.find(a => a.isLead) || filtered[0] || articles[0];
  const remaining = filtered.filter(a => a.id !== (leadArticle ? leadArticle.id : null));

  if (leadArticle) {
    leadCardContainer.innerHTML = `
      <article class="dc-lead-card" onclick="openArticleModal('${leadArticle.id}')" style="cursor: pointer;">
        <div class="dc-lead-card__media">
          <img src="assets/img/foto-noticia.jpg" alt="${leadArticle.title}">
          <span class="dc-lead-card__badge">${leadArticle.category}</span>
        </div>
        <div class="dc-lead-card__content">
          <div class="dc-lead-card__meta">
            <span>📅 ${leadArticle.date}</span>
            <span>⏱️ Lectura: ${leadArticle.readTime || '5 min'}</span>
            <span style="color: var(--wine-700); font-weight: 700;">★ Destacado</span>
          </div>
          <h3 class="dc-lead-card__title">${leadArticle.title}</h3>
          <p class="dc-lead-card__summary">${leadArticle.summary}</p>
          <div class="dc-lead-card__footer">
            <div class="dc-author-chip">
              <div class="dc-author-avatar">${getInitials(leadArticle.author)}</div>
              <div>
                <span class="dc-author-name">${leadArticle.author}</span>
                <span class="dc-author-role">${leadArticle.authorRole || 'Colaborador'}</span>
              </div>
            </div>
            <span class="btn btn--gold" style="padding: 0.4rem 0.9rem; font-size: 0.8rem;">Leer Artículo Completo →</span>
          </div>
        </div>
      </article>
    `;
  } else {
    leadCardContainer.innerHTML = `<p style="padding: 2rem; color: var(--gray-600);">No hay artículos en esta categoría.</p>`;
  }

  // Columna Lateral de Opinión & Columnas Breves
  const sidebarArticles = remaining.slice(0, 3);
  sidebarContainer.innerHTML = sidebarArticles.map(art => `
    <div class="dc-opinion-item" onclick="openArticleModal('${art.id}')">
      <p class="dc-opinion-item__tag">${art.category}</p>
      <h4 class="dc-opinion-item__title">${art.title}</h4>
      <div class="dc-opinion-item__meta">
        <strong>${art.author}</strong> · <span>${art.date}</span>
      </div>
    </div>
  `).join('');

  if (sidebarArticles.length === 0 && !leadArticle) {
    sidebarContainer.innerHTML = `<p style="font-size: 0.85rem; color: var(--gray-600);">Sin entradas recientes.</p>`;
  }

  // Subgrilla Inferior de Artículos
  const gridArticles = remaining.slice(3);
  if (gridArticles.length > 0) {
    subgridContainer.innerHTML = gridArticles.map(art => `
      <article class="article-card" onclick="openArticleModal('${art.id}')">
        <div class="article-card__header">
          <p class="article-card__category">${art.category}</p>
          <h4 class="article-card__title">${art.title}</h4>
        </div>
        <div class="article-card__body">
          <p>${art.summary}</p>
        </div>
        <div class="article-card__footer">
          <span><strong>${art.author}</strong></span>
          <span>${art.date}</span>
        </div>
      </article>
    `).join('');
  } else {
    subgridContainer.innerHTML = '';
  }
}

// Filtros de Artículos
function setupEditorialFilters() {
  const buttons = document.querySelectorAll('.editorial-filters .filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderArticles(filter);
    });
  });
}

// ==========================================
// RENDERIZADO DE SOCIOS / EQUIPO (CON LINKEDIN)
// ==========================================
function renderMembers() {
  const members = window.DebatesDB.getMembers();
  const container = document.getElementById('team-grid');
  if (!container) return;

  container.innerHTML = members.map(m => {
    const photoHtml = m.photo 
      ? `<div class="member-card__photo" style="background-image: url('${m.photo}');"><span class="member-card__badge">${m.badge || m.role}</span></div>`
      : `<div class="member-card__photo"><div class="member-card__initials">${m.initials || getInitials(m.name)}</div><span class="member-card__badge">${m.badge || m.role}</span></div>`;

    const bioList = Array.isArray(m.bio) 
      ? `<ul>${m.bio.map(b => `<li>${b}</li>`).join('')}</ul>`
      : `<p>${m.bio}</p>`;

    const linkedinButton = m.linkedin 
      ? `<a href="${m.linkedin}" target="_blank" rel="noopener noreferrer" class="linkedin-btn" title="Ver perfil de LinkedIn de ${m.name}">
          <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
          LinkedIn
         </a>`
      : `<span style="font-size: 0.72rem; color: var(--gray-400);">Sin perfil vinculado</span>`;

    return `
      <article class="member-card">
        ${photoHtml}
        <div class="member-card__body">
          <h3 class="member-card__name">${m.name}</h3>
          <p class="member-card__role">${m.role}</p>
          <div class="member-card__bio">
            ${bioList}
          </div>
          <div class="member-card__footer">
            <span style="font-size: 0.75rem; color: var(--gray-600);">UCEN Debate</span>
            ${linkedinButton}
          </div>
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================
// RENDERIZADO DE ARCHIVOS Y MATERIALES
// ==========================================
function renderMaterials(filter = 'todos') {
  const materials = window.DebatesDB.getMaterials();
  const container = document.getElementById('archivos-grid');
  if (!container) return;

  const filtered = filter === 'todos' 
    ? materials 
    : materials.filter(m => m.category.toLowerCase().includes(filter.toLowerCase()));

  container.innerHTML = filtered.map(mat => `
    <div class="archivo-card">
      <div class="archivo-card__top">
        <div class="archivo-icon">
          <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
        </div>
        <span class="archivo-tag">${mat.category}</span>
      </div>
      <h4 class="archivo-card__title">${mat.title}</h4>
      <p class="archivo-card__desc">${mat.desc}</p>
      <div class="archivo-card__meta">
        <span>Formato: <strong>${mat.fileType || 'PDF'}</strong> · ${mat.date}</span>
        <a href="${mat.downloadUrl || '#'}" download class="btn-download" onclick="handleDownload(event, '${mat.title}')">
          <svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
          Descargar
        </a>
      </div>
    </div>
  `).join('');
}

function handleDownload(e, title) {
  if (e.target.getAttribute('href') === '#') {
    e.preventDefault();
    alert(`Material académico: "${title}" listo para consultar o descargar.`);
  }
}

function setupMaterialsFilters() {
  const buttons = document.querySelectorAll('.archivos-filter .filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      renderMaterials(filter);
    });
  });
}

// ==========================================
// MODAL DE LECTURA COMPLETA DE ARTÍCULOS
// ==========================================
function setupModalReader() {
  const modal = document.getElementById('article-modal');
  const closeBtn = document.getElementById('modal-close-btn');

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('active');
    });
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
      }
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      modal.classList.remove('active');
    }
  });
}

window.openArticleModal = function(id) {
  const articles = window.DebatesDB.getArticles();
  const article = articles.find(a => a.id === id);
  if (!article) return;

  const modal = document.getElementById('article-modal');
  const content = document.getElementById('modal-article-container');

  const linkedinBtn = article.authorLinkedin
    ? `<a href="${article.authorLinkedin}" target="_blank" rel="noopener" class="linkedin-btn">
        <svg viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
        Perfil LinkedIn del autor
       </a>`
    : '';

  content.innerHTML = `
    <span class="modal-article__category">${article.category}</span>
    <h1 class="modal-article__title">${article.title}</h1>
    <div class="modal-article__byline">
      <div class="dc-author-avatar">${getInitials(article.author)}</div>
      <div>
        <div style="font-weight: 700; color: var(--navy-900);">${article.author}</div>
        <div style="font-size: 0.78rem; color: var(--gray-600);">${article.authorRole || 'Colaborador'} · Publicado: ${article.date}</div>
      </div>
    </div>
    <div class="modal-article__body">
      ${article.content}
    </div>
    <div class="modal-article__author-box">
      <div>
        <strong>Sobre el autor: ${article.author}</strong>
        <p style="font-size: 0.85rem; color: var(--gray-700); margin-top: 0.2rem;">${article.authorRole || 'Integrante de la Sociedad de Debates UCEN'}.</p>
      </div>
      ${linkedinBtn}
    </div>
  `;

  modal.classList.add('active');
};

// ==========================================
// PANEL DE EDITOR / CMS SENCILLO
// ==========================================
function setupEditorDrawer() {
  const drawer = document.getElementById('editor-drawer');
  const backdrop = document.getElementById('editor-backdrop');
  const openButtons = document.querySelectorAll('.js-open-editor');
  const closeBtn = document.getElementById('editor-close-btn');

  function openDrawer() {
    drawer.classList.add('open');
    backdrop.classList.add('open');
    checkEditorAuth();
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    backdrop.classList.remove('open');
  }

  openButtons.forEach(btn => btn.addEventListener('click', openDrawer));
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (backdrop) backdrop.addEventListener('click', closeDrawer);

  // Tabs del editor
  const tabBtns = document.querySelectorAll('.editor-tab-btn');
  const tabPanels = document.querySelectorAll('.editor-tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.style.display = 'none');
      btn.classList.add('active');
      const target = document.getElementById(btn.getAttribute('data-target'));
      if (target) target.style.display = 'block';
    });
  });

  // Autenticación de Editor
  const authForm = document.getElementById('editor-login-form');
  if (authForm) {
    authForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const pwd = document.getElementById('editor-password-input').value;
      if (pwd === 'debate2026' || pwd === 'admin') {
        window.DebatesDB.setEditorLogin(true);
        checkEditorAuth();
        alert('¡Acceso concedido como Editor!');
      } else {
        alert('Clave incorrecta. La clave por defecto es: debate2026');
      }
    });
  }

  const logoutBtn = document.getElementById('editor-logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      window.DebatesDB.setEditorLogin(false);
      checkEditorAuth();
    });
  }

  // Formulario Nuevo Artículo
  const newArticleForm = document.getElementById('form-new-article');
  if (newArticleForm) {
    newArticleForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('art-input-title').value.trim();
      const category = document.getElementById('art-input-cat').value;
      const author = document.getElementById('art-input-author').value.trim();
      const authorRole = document.getElementById('art-input-role').value.trim();
      const authorLinkedin = document.getElementById('art-input-linkedin').value.trim();
      const summary = document.getElementById('art-input-summary').value.trim();
      const content = document.getElementById('art-input-content').value.trim();
      const isLead = document.getElementById('art-input-lead').checked;

      const newArticle = {
        id: 'art-' + Date.now(),
        title,
        category,
        author,
        authorRole,
        authorLinkedin,
        summary,
        content: content.split('\n\n').map(p => `<p>${p}</p>`).join(''),
        date: new Intl.DateTimeFormat('es-CL', { day: 'numeric', month: 'long', year: 'numeric' }).format(new Date()),
        readTime: `${Math.max(3, Math.ceil(content.split(' ').length / 180))} min`,
        isLead
      };

      const articles = window.DebatesDB.getArticles();
      if (isLead) {
        articles.forEach(a => a.isLead = false);
      }
      articles.unshift(newArticle);
      window.DebatesDB.saveArticles(articles);

      renderArticles();
      renderManageArticlesList();
      newArticleForm.reset();
      alert('¡Artículo u opinión publicado exitosamente!');
    });
  }

  // Formulario Nuevo Miembro con LinkedIn
  const newMemberForm = document.getElementById('form-new-member');
  if (newMemberForm) {
    newMemberForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('mem-input-name').value.trim();
      const role = document.getElementById('mem-input-role').value.trim();
      const badge = document.getElementById('mem-input-badge').value.trim() || role;
      const linkedin = document.getElementById('mem-input-linkedin').value.trim();
      const bioText = document.getElementById('mem-input-bio').value.trim();

      const newMember = {
        id: 'mem-' + Date.now(),
        name,
        role,
        badge,
        photo: '',
        initials: getInitials(name),
        linkedin,
        bio: bioText.split('\n').filter(b => b.trim().length > 0)
      };

      const members = window.DebatesDB.getMembers();
      members.push(newMember);
      window.DebatesDB.saveMembers(members);

      renderMembers();
      renderManageMembersList();
      newMemberForm.reset();
      alert('¡Nuevo integrante agregado con su enlace a LinkedIn!');
    });
  }

  // Formulario Nuevo Archivo / Material
  const newMaterialForm = document.getElementById('form-new-material');
  if (newMaterialForm) {
    newMaterialForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const title = document.getElementById('mat-input-title').value.trim();
      const category = document.getElementById('mat-input-cat').value;
      const desc = document.getElementById('mat-input-desc').value.trim();
      const fileType = document.getElementById('mat-input-type').value;
      const downloadUrl = document.getElementById('mat-input-url').value.trim() || '#';

      const newMaterial = {
        id: 'mat-' + Date.now(),
        title,
        category,
        desc,
        fileType,
        downloadUrl,
        date: new Intl.DateTimeFormat('es-CL', { month: 'long', year: 'numeric' }).format(new Date())
      };

      const materials = window.DebatesDB.getMaterials();
      materials.unshift(newMaterial);
      window.DebatesDB.saveMaterials(materials);

      renderMaterials();
      renderManageMaterialsList();
      newMaterialForm.reset();
      alert('¡Material académico agregado a la sección de archivos!');
    });
  }

  renderManageArticlesList();
  renderManageMembersList();
  renderManageMaterialsList();
}

function checkEditorAuth() {
  const isAuth = window.DebatesDB.isEditorLoggedIn();
  const loginPrompt = document.getElementById('editor-login-box');
  const formsContainer = document.getElementById('editor-forms-box');

  if (isAuth) {
    if (loginPrompt) loginPrompt.style.display = 'none';
    if (formsContainer) formsContainer.style.display = 'block';
  } else {
    if (loginPrompt) loginPrompt.style.display = 'block';
    if (formsContainer) formsContainer.style.display = 'none';
  }
}

function renderManageArticlesList() {
  const container = document.getElementById('manage-articles-list');
  if (!container) return;

  const articles = window.DebatesDB.getArticles();
  container.innerHTML = articles.map(art => `
    <div class="manage-item">
      <span class="manage-item__title">${art.isLead ? '★ ' : ''}${art.title}</span>
      <button class="manage-item__delete" onclick="deleteArticle('${art.id}')" title="Eliminar artículo">🗑️</button>
    </div>
  `).join('');
}

window.deleteArticle = function(id) {
  if (!confirm('¿Deseas eliminar este artículo?')) return;
  const articles = window.DebatesDB.getArticles().filter(a => a.id !== id);
  window.DebatesDB.saveArticles(articles);
  renderArticles();
  renderManageArticlesList();
};

function renderManageMembersList() {
  const container = document.getElementById('manage-members-list');
  if (!container) return;

  const members = window.DebatesDB.getMembers();
  container.innerHTML = members.map(m => `
    <div class="manage-item">
      <span class="manage-item__title">${m.name} (${m.role})</span>
      <button class="manage-item__delete" onclick="deleteMember('${m.id}')" title="Eliminar integrante">🗑️</button>
    </div>
  `).join('');
}

window.deleteMember = function(id) {
  if (!confirm('¿Deseas eliminar este integrante?')) return;
  const members = window.DebatesDB.getMembers().filter(m => m.id !== id);
  window.DebatesDB.saveMembers(members);
  renderMembers();
  renderManageMembersList();
};

function renderManageMaterialsList() {
  const container = document.getElementById('manage-materials-list');
  if (!container) return;

  const materials = window.DebatesDB.getMaterials();
  container.innerHTML = materials.map(mat => `
    <div class="manage-item">
      <span class="manage-item__title">${mat.title}</span>
      <button class="manage-item__delete" onclick="deleteMaterial('${mat.id}')" title="Eliminar material">🗑️</button>
    </div>
  `).join('');
}

window.deleteMaterial = function(id) {
  if (!confirm('¿Deseas eliminar este archivo?')) return;
  const materials = window.DebatesDB.getMaterials().filter(m => m.id !== id);
  window.DebatesDB.saveMaterials(materials);
  renderMaterials();
  renderManageMaterialsList();
};

// ==========================================
// UTILIDADES & RESPONSIVE NAV
// ==========================================
function getInitials(name) {
  if (!name) return 'SD';
  const parts = name.split(' ').filter(p => p.length > 0);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function setupMobileNav() {
  const toggleBtn = document.getElementById('nav-toggle-btn');
  const links = document.getElementById('nav-links');

  if (toggleBtn && links) {
    toggleBtn.addEventListener('click', () => {
      links.classList.toggle('mobile-open');
    });

    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        links.classList.remove('mobile-open');
      });
    });
  }
}
