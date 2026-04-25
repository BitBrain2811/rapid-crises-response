document.addEventListener("DOMContentLoaded", () => {
    // Inject fonts and icons
    document.head.insertAdjacentHTML("beforeend", `
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    `);

    const sidebarHTML = `
        <aside class="sidebar glass-panel">
            <div class="sidebar-header">
                <div class="logo-icon"><i class="fa-solid fa-shield-halved"></i></div>
                <div class="logo-text">Crisis<span class="text-accent">Nexus</span></div>
            </div>
            <nav class="sidebar-nav">
                <a href="admin.html" id="nav-admin"><i class="fa-solid fa-border-all"></i> <span>Command Center</span></a>
                <a href="index.html" id="nav-index"><i class="fa-solid fa-satellite-dish"></i> <span>Emergency Broadcast</span></a>
                <a href="alerts.html" id="nav-alerts"><i class="fa-solid fa-server"></i> <span>Data Logs</span></a>
                <a href="map.html" id="nav-map"><i class="fa-solid fa-map-location-dot"></i> <span>Live Topography</span></a>
                <a href="personnel.html" id="nav-personnel"><i class="fa-solid fa-users-viewfinder"></i> <span>Response Units</span></a>
                <a href="settings.html" id="nav-settings"><i class="fa-solid fa-sliders"></i> <span>System Config</span></a>
            </nav>
            <div class="sidebar-footer">
                <div class="status-indicator">
                    <div class="pulse-dot"></div>
                    <span>System Online</span>
                </div>
            </div>
        </aside>
    `;
    document.body.insertAdjacentHTML('afterbegin', sidebarHTML);

    // Highlight active link
    const path = window.location.pathname;
    const page = path.split("/").pop() || "index.html";
    const navLink = document.getElementById("nav-" + page.replace('.html', ''));
    if (navLink) {
        navLink.classList.add("active");
    }
});
