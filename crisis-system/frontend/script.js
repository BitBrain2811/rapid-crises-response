const API = "/api/alerts";

// Helper to format date
const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleString();
};

document.addEventListener("DOMContentLoaded", () => {
    // 1. Form Submission (Emergency Alert Page)
    const alertForm = document.getElementById('createAlertForm');
    if (alertForm) {
        alertForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get user's geolocation if possible
            let lat = 0, lng = 0;
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(pos => {
                    lat = pos.coords.latitude;
                    lng = pos.coords.longitude;
                    submitAlertData(lat, lng);
                }, () => submitAlertData(lat, lng));
            } else {
                submitAlertData(lat, lng);
            }
        });
    }

    async function submitAlertData(lat, lng) {
        const data = {
            type: document.getElementById("type").value,
            severity: document.getElementById("severity").value,
            location: document.getElementById("location").value,
            message: document.getElementById("message").value,
            lat, lng,
            status: 'ACTIVE'
        };

        try {
            await fetch(API, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data)
            });
            document.getElementById("createAlertForm").reset();
            alert("Emergency alert broadcasted successfully!");
        } catch (err) {
            console.error(err);
            alert("Failed to broadcast alert");
        }
    }

    // 2. Admin Dashboard & Alerts Data logs Page
    const recentAlertsTable = document.getElementById("recent-alerts-table");
    const allAlertsTable = document.getElementById("all-alerts-table");
    
    async function fetchAlerts() {
        try {
            const res = await fetch(API);
            const alerts = await res.json();
            
            // Update Dashboard Stats
            const statTotal = document.getElementById("stat-total");
            const statActive = document.getElementById("stat-active");
            if (statTotal && statActive) {
                statTotal.innerText = alerts.length;
                statActive.innerText = alerts.filter(a => a.status === 'ACTIVE' || !a.status).length;
                // Assuming status could be RESOLVED, we fake resolved for now
                document.getElementById("stat-resolved").innerText = alerts.filter(a => a.status === 'RESOLVED').length;
            }

            // Update Recent Alerts Table (Admin Dashboard)
            if (recentAlertsTable) {
                recentAlertsTable.innerHTML = alerts.slice(0, 5).map(alert => `
                    <tr>
                        <td><strong>${alert.type}</strong></td>
                        <td><span class="badge ${alert.severity ? alert.severity.toLowerCase() : 'high'}">${alert.severity || 'High'}</span></td>
                        <td>${alert.location}</td>
                        <td>${formatDate(alert.createdAt || new Date())}</td>
                    </tr>
                `).join('');
            }

            // Update All Alerts Table (Data Logs)
            if (allAlertsTable) {
                const filterType = document.getElementById("filter-type");
                const renderAllAlerts = (filter) => {
                    const filtered = filter === "All" ? alerts : alerts.filter(a => a.type === filter);
                    allAlertsTable.innerHTML = filtered.map(alert => `
                        <tr>
                            <td>${formatDate(alert.createdAt || new Date())}</td>
                            <td><strong>${alert.type}</strong></td>
                            <td><span class="badge ${alert.severity ? alert.severity.toLowerCase() : 'high'}">${alert.severity || 'High'}</span></td>
                            <td>${alert.location}</td>
                            <td><span class="badge ${alert.status === 'RESOLVED' ? 'low' : 'high'}">${alert.status || 'ACTIVE'}</span></td>
                            <td>${alert.message}</td>
                        </tr>
                    `).join('');
                };

                renderAllAlerts(filterType ? filterType.value : "All");

                if (filterType) {
                    filterType.addEventListener("change", (e) => renderAllAlerts(e.target.value));
                }
            }

            return alerts;

        } catch (err) {
            console.error("Error loading alerts:", err);
            return [];
        }
    }

    // Load initial data and set auto-refresh interval
    if (recentAlertsTable || allAlertsTable || document.getElementById('stat-total')) {
        fetchAlerts();
        setInterval(fetchAlerts, 10000); // 10s auto-refresh
    }

    // 3. Map Initialization (Live Map Page)
    if (document.getElementById("map")) {
        // Init map
        const map = L.map('map').setView([0, 0], 2);
        L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            attribution: '&copy; OpenStreetMap contributors &copy; CARTO'
        }).addTo(map);

        const markers = [];

        async function updateMap() {
            const alerts = await fetchAlerts();
            
            // Clear existing markers
            markers.forEach(m => map.removeLayer(m));
            markers.length = 0;

            let latlngs = [];
            alerts.forEach(alert => {
                let lat = alert.lat || (Math.random() * 180 - 90);
                let lng = alert.lng || (Math.random() * 360 - 180);
                
                // fallback to random locations if no lat/lng just for visualization demo
                if (!alert.lat) { lat = 40.7128 + (Math.random() - 0.5); }
                if (!alert.lng) { lng = -74.0060 + (Math.random() - 0.5); }

                const m = L.circleMarker([lat, lng], {
                    color: alert.severity === 'High' ? '#ef4444' : '#f59e0b',
                    radius: 8,
                    fillOpacity: 0.8
                }).addTo(map);
                
                m.bindPopup(`
                    <b>${alert.type} Emergency</b><br>
                    ${alert.location}<br>
                    Severity: ${alert.severity}<br>
                    Status: ${alert.status || 'ACTIVE'}
                `);
                markers.push(m);
                latlngs.push([lat, lng]);
            });

            if (latlngs.length > 0) {
                map.fitBounds(L.latLngBounds(latlngs));
            }
        }

        updateMap();
        setInterval(updateMap, 15000); // refresh map every 15s
    }
});
