/* ============================================
   XINN BUILD APK - Ultra Modern JavaScript
   ============================================ */

// DOM Elements
const loadingScreen = document.getElementById('loading-screen');
const toastContainer = document.getElementById('toast-container');
const themeToggle = document.getElementById('theme-toggle');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');
const buildForm = document.getElementById('build-form');
const buildModal = document.getElementById('build-modal');
const buildProgress = document.getElementById('build-progress');
const buildResult = document.getElementById('build-result');
const historyModal = document.getElementById('history-modal');
const historyGrid = document.getElementById('history-grid');
const emptyHistory = document.getElementById('empty-history');

// Form Elements
const appNameInput = document.getElementById('app-name');
const websiteUrlInput = document.getElementById('website-url');
const packageNameInput = document.getElementById('package-name');
const appVersionInput = document.getElementById('app-version');
const themeColorInput = document.getElementById('theme-color');
const colorValueSpan = document.getElementById('color-value');
const appIconInput = document.getElementById('app-icon');
const uploadArea = document.getElementById('upload-area');
const uploadContent = document.getElementById('upload-content');
const uploadPreview = document.getElementById('upload-preview');
const iconPreview = document.getElementById('icon-preview');
const removeIconBtn = document.getElementById('remove-icon');

// Preview Elements
const splashIcon = document.getElementById('splash-icon');
const splashName = document.getElementById('splash-name');
const splashUrl = document.getElementById('splash-url');
const previewName = document.getElementById('preview-name');
const previewPackage = document.getElementById('preview-package');
const previewVersion = document.getElementById('preview-version');

// Progress Elements
const progressBar = document.getElementById('progress-bar');
const progressPercentage = document.getElementById('progress-percentage');
const currentStepText = document.getElementById('current-step-text');
const terminalBody = document.getElementById('terminal-body');

// Result Elements
const resultBuildId = document.getElementById('result-build-id');
const resultApkName = document.getElementById('result-apk-name');
const resultPackage = document.getElementById('result-package');
const resultSize = document.getElementById('result-size');
const resultDate = document.getElementById('result-date');
const downloadApkBtn = document.getElementById('download-apk-btn');
const copyLinkBtn = document.getElementById('copy-link-btn');
const buildAgainBtn = document.getElementById('build-again-btn');

// Stats
const statTotal = document.getElementById('stat-total');
const statSuccess = document.getElementById('stat-success');

// State
let currentBuildData = null;
let uploadedIcon = null;

// Build Steps
const buildSteps = [
    { text: 'Checking website URL...', log: 'Validating URL: ', duration: 800 },
    { text: 'Creating Android WebView...', log: 'Initializing WebView component...', duration: 1200 },
    { text: 'Applying app icon...', log: 'Processing icon asset...', duration: 1000 },
    { text: 'Setting splash screen...', log: 'Generating splash screen layout...', duration: 900 },
    { text: 'Generating APK config...', log: 'Creating AndroidManifest.xml...', duration: 1100 },
    { text: 'Signing APK...', log: 'Applying debug keystore signature...', duration: 1400 },
    { text: 'Optimizing APK...', log: 'Running zipalign optimization...', duration: 1000 },
    { text: 'APK Ready!', log: 'Build completed successfully!', duration: 500 }
];

// ============================================
// Initialization
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    initApp();
});

function initApp() {
    // Hide loading screen after delay
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 1500);

    // Load theme
    loadTheme();

    // Load stats
    loadStats();

    // Load history
    loadHistory();

    // Setup event listeners
    setupEventListeners();

    // Initialize FAQ
    initFAQ();
}

// ============================================
// Theme Management
// ============================================
function loadTheme() {
    const savedTheme = localStorage.getItem('xinn-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('xinn-theme', newTheme);
    showToast('info', 'Tema Diubah', `Mode ${newTheme === 'dark' ? 'gelap' : 'terang'} aktif`);
}

// ============================================
// Toast Notifications
// ============================================
function showToast(type, title, message, duration = 4000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/></svg>',
        error: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>',
        warning: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>',
        info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>'
    };

    toast.innerHTML = `
        <div class="toast-icon">${icons[type]}</div>
        <div class="toast-content">
            <div class="toast-title">${title}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close" onclick="this.parentElement.remove()">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;

    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ============================================
// Event Listeners
// ============================================
function setupEventListeners() {
    // Theme toggle
    themeToggle.addEventListener('click', toggleTheme);

    // Mobile menu
    mobileMenuBtn.addEventListener('click', () => {
        mobileMenuBtn.classList.toggle('active');
        mobileNav.classList.toggle('active');
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.classList.remove('active');
            mobileNav.classList.remove('active');
        });
    });

    // App name input - auto generate package name
    appNameInput.addEventListener('input', handleAppNameChange);

    // Website URL input
    websiteUrlInput.addEventListener('input', handleUrlChange);

    // Version input
    appVersionInput.addEventListener('input', handleVersionChange);

    // Theme color input
    themeColorInput.addEventListener('input', handleColorChange);

    // Icon upload
    uploadArea.addEventListener('click', () => appIconInput.click());
    appIconInput.addEventListener('change', handleIconUpload);
    removeIconBtn.addEventListener('click', handleRemoveIcon);

    // Drag and drop
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const files = e.dataTransfer.files;
        if (files.length > 0 && files[0].type.startsWith('image/')) {
            handleIconFile(files[0]);
        }
    });

    // Build form submit
    buildForm.addEventListener('submit', handleBuildSubmit);

    // Result buttons
    downloadApkBtn.addEventListener('click', handleDownloadApk);
    copyLinkBtn.addEventListener('click', handleCopyLink);
    buildAgainBtn.addEventListener('click', handleBuildAgain);

    // Close modals on overlay click
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
        overlay.addEventListener('click', () => {
            closeAllModals();
        });
    });

    // History modal close
    document.getElementById('close-history-modal').addEventListener('click', () => {
        historyModal.classList.remove('active');
    });

    // Smooth scroll for nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}

// ============================================
// Form Handlers
// ============================================
function handleAppNameChange(e) {
    const name = e.target.value.trim();
    
    // Update preview
    splashName.textContent = name || 'App Name';
    previewName.textContent = name || '-';

    // Auto-generate package name
    if (name) {
        const packageName = generatePackageName(name);
        packageNameInput.value = packageName;
        previewPackage.textContent = packageName;
    } else {
        packageNameInput.value = '';
        previewPackage.textContent = '-';
    }
}

function generatePackageName(appName) {
    const sanitized = appName
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '')
        .substring(0, 20);
    return `com.xinn.${sanitized || 'app'}`;
}

function handleUrlChange(e) {
    const url = e.target.value.trim();
    splashUrl.textContent = url || 'https://example.com';
}

function handleVersionChange(e) {
    previewVersion.textContent = e.target.value || '1.0.0';
}

function handleColorChange(e) {
    const color = e.target.value;
    colorValueSpan.textContent = color;
    splashIcon.style.background = `linear-gradient(135deg, ${color}, ${adjustColor(color, -30)})`;
}

function adjustColor(color, amount) {
    const hex = color.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, (num >> 16) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0x0000FF) + amount));
    return `#${(1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}

function handleIconUpload(e) {
    const file = e.target.files[0];
    if (file) {
        handleIconFile(file);
    }
}

function handleIconFile(file) {
    if (!file.type.startsWith('image/')) {
        showToast('error', 'Format Tidak Valid', 'Harap upload file gambar (PNG, JPG, SVG)');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedIcon = e.target.result;
        iconPreview.src = uploadedIcon;
        uploadContent.style.display = 'none';
        uploadPreview.classList.add('active');
        
        // Update splash icon
        splashIcon.innerHTML = `<img src="${uploadedIcon}" alt="App Icon">`;
        
        showToast('success', 'Icon Diupload', 'Icon aplikasi berhasil diupload');
    };
    reader.readAsDataURL(file);
}

function handleRemoveIcon(e) {
    e.stopPropagation();
    uploadedIcon = null;
    appIconInput.value = '';
    iconPreview.src = '';
    uploadContent.style.display = 'flex';
    uploadPreview.classList.remove('active');
    
    // Reset splash icon
    const themeColor = themeColorInput.value;
    splashIcon.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
    </svg>`;
    splashIcon.style.background = `linear-gradient(135deg, ${themeColor}, ${adjustColor(themeColor, -30)})`;
    
    showToast('info', 'Icon Dihapus', 'Icon aplikasi telah dihapus');
}

// ============================================
// Build Process
// ============================================
async function handleBuildSubmit(e) {
    e.preventDefault();

    // Validate form
    const appName = appNameInput.value.trim();
    const websiteUrl = websiteUrlInput.value.trim();

    if (!appName) {
        showToast('error', 'Validasi Gagal', 'Nama aplikasi wajib diisi');
        appNameInput.focus();
        return;
    }

    if (appName.length < 2) {
        showToast('error', 'Validasi Gagal', 'Nama aplikasi minimal 2 karakter');
        appNameInput.focus();
        return;
    }

    if (!websiteUrl) {
        showToast('error', 'Validasi Gagal', 'URL website wajib diisi');
        websiteUrlInput.focus();
        return;
    }

    if (!isValidUrl(websiteUrl)) {
        showToast('error', 'URL Tidak Valid', 'Masukkan URL yang valid (contoh: https://example.com)');
        websiteUrlInput.focus();
        return;
    }

    // Prepare build data
    currentBuildData = {
        buildId: generateBuildId(),
        appName: appName,
        websiteUrl: websiteUrl,
        packageName: packageNameInput.value,
        version: appVersionInput.value || '1.0.0',
        themeColor: themeColorInput.value,
        icon: uploadedIcon,
        fullscreen: document.getElementById('fullscreen-mode').checked,
        enableJs: document.getElementById('enable-js').checked,
        enableCache: document.getElementById('enable-cache').checked,
        buildDate: new Date().toISOString(),
        size: generateRandomSize()
    };

    // Show build modal
    showBuildModal();

    // Start build simulation
    await simulateBuild();
}

function isValidUrl(string) {
    try {
        const url = new URL(string);
        return url.protocol === 'http:' || url.protocol === 'https:';
    } catch (_) {
        return false;
    }
}

function generateBuildId() {
    return 'XINN-' + Date.now().toString(36).toUpperCase() + '-' + Math.random().toString(36).substring(2, 6).toUpperCase();
}

function generateRandomSize() {
    const sizes = ['2.4 MB', '2.8 MB', '3.1 MB', '3.5 MB', '2.9 MB', '3.2 MB'];
    return sizes[Math.floor(Math.random() * sizes.length)];
}

function showBuildModal() {
    buildModal.classList.add('active');
    buildProgress.style.display = 'block';
    buildResult.classList.remove('active');
    progressBar.style.width = '0%';
    progressPercentage.textContent = '0%';
    terminalBody.innerHTML = '<p class="terminal-line"><span class="terminal-prompt">$</span> xinn-build --init</p>';
}

async function simulateBuild() {
    const totalSteps = buildSteps.length;
    
    for (let i = 0; i < totalSteps; i++) {
        const step = buildSteps[i];
        const progress = Math.round(((i + 1) / totalSteps) * 100);
        
        currentStepText.textContent = step.text;
        
        // Add terminal log
        let logMessage = step.log;
        if (i === 0) logMessage += currentBuildData.websiteUrl;
        
        const logClass = i === totalSteps - 1 ? 'success' : 'info';
        addTerminalLog(logMessage, logClass);
        
        // Animate progress
        await animateProgress(progress, step.duration);
    }

    // Show result
    setTimeout(() => {
        showBuildResult();
    }, 500);
}

function addTerminalLog(message, className = '') {
    const line = document.createElement('p');
    line.className = `terminal-line ${className}`;
    line.innerHTML = `<span class="terminal-prompt">$</span> ${message}`;
    terminalBody.appendChild(line);
    terminalBody.scrollTop = terminalBody.scrollHeight;
}

function animateProgress(targetProgress, duration) {
    return new Promise(resolve => {
        const startProgress = parseInt(progressBar.style.width) || 0;
        const increment = (targetProgress - startProgress) / (duration / 50);
        let currentProgress = startProgress;

        const interval = setInterval(() => {
            currentProgress += increment;
            if (currentProgress >= targetProgress) {
                currentProgress = targetProgress;
                clearInterval(interval);
                resolve();
            }
            progressBar.style.width = `${currentProgress}%`;
            progressPercentage.textContent = `${Math.round(currentProgress)}%`;
        }, 50);
    });
}

function showBuildResult() {
    buildProgress.style.display = 'none';
    buildResult.classList.add('active');

    // Fill result data
    resultBuildId.textContent = currentBuildData.buildId;
    resultApkName.textContent = `${currentBuildData.appName}.apk`;
    resultPackage.textContent = currentBuildData.packageName;
    resultSize.textContent = currentBuildData.size;
    resultDate.textContent = formatDate(currentBuildData.buildDate);

    // Save to history
    saveToHistory(currentBuildData);

    // Update stats
    updateStats();

    showToast('success', 'Build Berhasil!', `${currentBuildData.appName}.apk siap didownload`);
}

// ============================================
// Result Actions
// ============================================
function handleDownloadApk() {
    if (!currentBuildData) return;

    // Create fake APK file for download
    const content = `
XINN BUILD APK - Simulated APK File
====================================
Build ID: ${currentBuildData.buildId}
App Name: ${currentBuildData.appName}
Package: ${currentBuildData.packageName}
Version: ${currentBuildData.version}
Website: ${currentBuildData.websiteUrl}
Theme Color: ${currentBuildData.themeColor}
Build Date: ${currentBuildData.buildDate}

This is a simulated APK file from XINN BUILD APK.
Connect a real backend to generate actual APK files.

BY XINN 2026
    `;

    const blob = new Blob([content], { type: 'application/vnd.android.package-archive' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentBuildData.appName.replace(/\s+/g, '_')}.apk`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showToast('success', 'Download Dimulai', `${currentBuildData.appName}.apk sedang didownload`);
}

function handleCopyLink() {
    if (!currentBuildData) return;

    const link = `https://xinn.build/download/${currentBuildData.buildId}`;
    navigator.clipboard.writeText(link).then(() => {
        showToast('success', 'Link Disalin', 'Link download APK berhasil disalin ke clipboard');
    }).catch(() => {
        showToast('error', 'Gagal Menyalin', 'Tidak dapat menyalin link ke clipboard');
    });
}

function handleBuildAgain() {
    buildModal.classList.remove('active');
    buildForm.reset();
    
    // Reset preview
    splashName.textContent = 'App Name';
    splashUrl.textContent = 'https://example.com';
    previewName.textContent = '-';
    previewPackage.textContent = '-';
    previewVersion.textContent = '1.0.0';
    
    // Reset icon
    handleRemoveIcon(new Event('click'));
    
    // Reset color
    themeColorInput.value = '#8b5cf6';
    colorValueSpan.textContent = '#8b5cf6';
    
    scrollToSection('build');
    showToast('info', 'Form Direset', 'Silakan isi form untuk build APK baru');
}

// ============================================
// History Management
// ============================================
function saveToHistory(buildData) {
    let history = JSON.parse(localStorage.getItem('xinn-build-history') || '[]');
    history.unshift(buildData);
    
    // Keep only last 20 items
    if (history.length > 20) {
        history = history.slice(0, 20);
    }
    
    localStorage.setItem('xinn-build-history', JSON.stringify(history));
    loadHistory();
}

function loadHistory() {
    const history = JSON.parse(localStorage.getItem('xinn-build-history') || '[]');
    
    if (history.length === 0) {
        historyGrid.style.display = 'none';
        emptyHistory.style.display = 'block';
        return;
    }

    historyGrid.style.display = 'grid';
    emptyHistory.style.display = 'none';

    historyGrid.innerHTML = history.map((item, index) => `
        <div class="history-card" data-index="${index}">
            <div class="history-card-header">
                <div class="history-icon">
                    ${item.icon 
                        ? `<img src="${item.icon}" alt="${item.appName}">` 
                        : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                           </svg>`
                    }
                </div>
                <div class="history-info">
                    <h4>${escapeHtml(item.appName)}</h4>
                    <p>${item.packageName}</p>
                </div>
            </div>
            <div class="history-meta">
                <div class="history-meta-item">
                    <span>Size</span>
                    <span>${item.size}</span>
                </div>
                <div class="history-meta-item">
                    <span>Version</span>
                    <span>${item.version}</span>
                </div>
                <div class="history-meta-item">
                    <span>Date</span>
                    <span>${formatDateShort(item.buildDate)}</span>
                </div>
            </div>
            <div class="history-actions">
                <button class="btn btn-primary btn-sm" onclick="viewHistoryDetail(${index})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                        <circle cx="12" cy="12" r="3"/>
                    </svg>
                    Detail
                </button>
                <button class="btn btn-ghost btn-sm" onclick="deleteHistory(${index})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16">
                        <polyline points="3,6 5,6 21,6"/>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                    </svg>
                    Hapus
                </button>
            </div>
        </div>
    `).join('');
}

function viewHistoryDetail(index) {
    const history = JSON.parse(localStorage.getItem('xinn-build-history') || '[]');
    const item = history[index];
    
    if (!item) return;

    const modalBody = document.getElementById('history-modal-body');
    modalBody.innerHTML = `
        <div class="history-detail">
            <div class="history-detail-item">
                <span>Build ID</span>
                <span>${item.buildId}</span>
            </div>
            <div class="history-detail-item">
                <span>Nama Aplikasi</span>
                <span>${escapeHtml(item.appName)}</span>
            </div>
            <div class="history-detail-item">
                <span>URL Website</span>
                <span>${escapeHtml(item.websiteUrl)}</span>
            </div>
            <div class="history-detail-item">
                <span>Package Name</span>
                <span>${item.packageName}</span>
            </div>
            <div class="history-detail-item">
                <span>Versi</span>
                <span>${item.version}</span>
            </div>
            <div class="history-detail-item">
                <span>Ukuran APK</span>
                <span>${item.size}</span>
            </div>
            <div class="history-detail-item">
                <span>Warna Tema</span>
                <span style="display: flex; align-items: center; gap: 8px;">
                    <span style="width: 20px; height: 20px; background: ${item.themeColor}; border-radius: 4px;"></span>
                    ${item.themeColor}
                </span>
            </div>
            <div class="history-detail-item">
                <span>Tanggal Build</span>
                <span>${formatDate(item.buildDate)}</span>
            </div>
            <div class="history-detail-actions">
                <button class="btn btn-primary" onclick="redownloadApk(${index})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="7,10 12,15 17,10"/>
                        <line x1="12" y1="15" x2="12" y2="3"/>
                    </svg>
                    Download APK
                </button>
                <button class="btn btn-secondary" onclick="copyHistoryLink(${index})">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                    Copy Link
                </button>
            </div>
        </div>
    `;

    historyModal.classList.add('active');
}

function deleteHistory(index) {
    let history = JSON.parse(localStorage.getItem('xinn-build-history') || '[]');
    const item = history[index];
    
    if (!item) return;

    history.splice(index, 1);
    localStorage.setItem('xinn-build-history', JSON.stringify(history));
    loadHistory();
    updateStats();
    
    showToast('success', 'History Dihapus', `${item.appName} berhasil dihapus dari history`);
}

function redownloadApk(index) {
    const history = JSON.parse(localStorage.getItem('xinn-build-history') || '[]');
    const item = history[index];
    
    if (!item) return;

    currentBuildData = item;
    handleDownloadApk();
    historyModal.classList.remove('active');
}

function copyHistoryLink(index) {
    const history = JSON.parse(localStorage.getItem('xinn-build-history') || '[]');
    const item = history[index];
    
    if (!item) return;

    const link = `https://xinn.build/download/${item.buildId}`;
    navigator.clipboard.writeText(link).then(() => {
        showToast('success', 'Link Disalin', 'Link download APK berhasil disalin ke clipboard');
    }).catch(() => {
        showToast('error', 'Gagal Menyalin', 'Tidak dapat menyalin link ke clipboard');
    });
}

// ============================================
// Stats Management
// ============================================
function loadStats() {
    const history = JSON.parse(localStorage.getItem('xinn-build-history') || '[]');
    animateCounter(statTotal, history.length);
    animateCounter(statSuccess, history.length);
}

function updateStats() {
    loadStats();
}

function animateCounter(element, target) {
    let current = 0;
    const increment = Math.ceil(target / 20);
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = current;
    }, 50);
}

// ============================================
// FAQ
// ============================================
function initFAQ() {
    document.querySelectorAll('.faq-question').forEach(button => {
        button.addEventListener('click', () => {
            const item = button.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Open clicked if was closed
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ============================================
// Utility Functions
// ============================================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function scrollToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.remove('active');
    });
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

function formatDateShort(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'short'
    });
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Make functions globally available
window.scrollToSection = scrollToSection;
window.scrollToTop = scrollToTop;
window.viewHistoryDetail = viewHistoryDetail;
window.deleteHistory = deleteHistory;
window.redownloadApk = redownloadApk;
window.copyHistoryLink = copyHistoryLink;
