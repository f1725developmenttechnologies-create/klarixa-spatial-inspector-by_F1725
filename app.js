// Klarixa Spatial Inspector - Application Logic
// F1725 Development Technologies

// Datos de telemetría
const droneData = [
    { id: 'ALPHA-1', code: 'DRN-01', role: 'Búsqueda y rescate', module: 'ALPHA', battery: 87, signal: 4, status: 'ok' },
    { id: 'ALPHA-2', code: 'DRN-02', role: 'Búsqueda y rescate', module: 'ALPHA', battery: 74, signal: 4, status: 'ok' },
    { id: 'BETA-1', code: 'DRN-03', role: 'Inspección industrial', module: 'BETA', battery: 62, signal: 3, status: 'ok' },
    { id: 'BETA-2', code: 'DRN-04', role: 'Inspección industrial', module: 'BETA', battery: 91, signal: 4, status: 'ok' },
    { id: 'GAMMA-1', code: 'DRN-05', role: 'Táctico · bloqueo RF', module: 'GAMMA', battery: 58, signal: 4, status: 'warning' },
    { id: 'GAMMA-2', code: 'DRN-06', role: 'Táctico · acústica', module: 'GAMMA', battery: 39, signal: 3, status: 'critical' },
    { id: 'SAT', code: 'SAT-07', role: 'Nodo mesh · sensor macro · 6.000 m · cobertura 50 km²', module: 'SAT', battery: 96, signal: 5, status: 'ok' }
];

// Bitácora inicial
const initialLogs = [
    { time: '23:56:09', event: 'Hazard CRITICAL confirmado en dron ALPHA-1', node: 'NONACORTEX N7', severity: 'critical' },
    { time: '23:55:37', event: 'Hazard LOW confirmado en tanque B', node: 'NONACORTEX N7', severity: 'low' },
    { time: '23:55:14', event: 'Transmisión de voz al canal RESCATE-1', node: 'DRN-05', severity: 'ptt' },
    { time: '23:55:06', event: 'Hazard MEDIUM confirmado en torre de proceso', node: 'NONACORTEX N7', severity: 'medium' },
    { time: '23:55:02', event: 'Hazard LOW confirmado en torre de proceso', node: 'NONACORTEX N7', severity: 'low' }
];

let missionTime = 0;
let hazardCount = 0;
const severities = [
    { name: 'LOW', color: '#ffff00', class: 'low' },
    { name: 'MEDIUM', color: '#ffaa00', class: 'medium' },
    { name: 'HIGH', color: '#ff8800', class: 'high' },
    { name: 'CRITICAL', color: '#ff0000', class: 'critical' }
];

// Inicialización
document.addEventListener('DOMContentLoaded', () => {
    renderTelemetry();
    renderLogs();
    startMissionTimer();
    startTelemetryUpdates();
});

// Renderizar telemetría
function renderTelemetry() {
    const grid = document.getElementById('telemetry-grid');
    if (!grid) return;

    grid.innerHTML = droneData.map(drone => `
        <div class="drone-card">
            <div class="drone-header">
                <div>
                    <div class="drone-name">${drone.id}</div>
                    <div class="drone-id">${drone.code}</div>
                </div>
                <div class="drone-status ${drone.status}"></div>
            </div>
            <div class="drone-role">${drone.role}</div>
            <div class="drone-module">${drone.module}</div>
            <div class="drone-signal">
                ${Array(5).fill(0).map((_, i) => `
                    <div class="signal-bar ${i < drone.signal ? 'active' : ''}"></div>
                `).join('')}
            </div>
            <div class="drone-battery">
                <div class="battery-bar">
                    <div class="battery-fill ${drone.battery < 50 ? 'warning' : drone.battery < 30 ? 'critical' : ''}" 
                         style="width: ${drone.battery}%"></div>
                </div>
                <div class="battery-text">${drone.battery}%</div>
            </div>
        </div>
    `).join('');
}

// Renderizar bitácora
function renderLogs() {
    const tbody = document.getElementById('log-table-body');
    if (!tbody) return;

    tbody.innerHTML = initialLogs.map(log => `
        <tr>
            <td>${log.time}</td>
            <td>${log.event}</td>
            <td>${log.node}</td>
            <td class="severity-${log.severity}">${log.severity.toUpperCase()}</td>
        </tr>
    `).join('');
}

// Temporizador de misión
function startMissionTimer() {
    setInterval(() => {
        missionTime++;
        const minutes = Math.floor(missionTime / 60).toString().padStart(2, '0');
        const seconds = (missionTime % 60).toString().padStart(2, '0');
        const timerEl = document.getElementById('mission-timer');
        if (timerEl) {
            timerEl.textContent = `T+${minutes}:${seconds}`;
        }
    }, 1000);
}

// Actualización de telemetría
function startTelemetryUpdates() {
    setInterval(() => {
        droneData.forEach(drone => {
            if (drone.id !== 'SAT') {
                const change = Math.random() > 0.5 ? -1 : 0;
                drone.battery = Math.max(20, Math.min(100, drone.battery + change));
            }
        });
        renderTelemetry();
    }, 5000);
}

// Lanzar XR
function launchXR() {
    window.location.href = 'xr-demo.html';
}

// Scroll a sección
function scrollToSection(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
}

// Inicializar demo XR
function initXRDemo() {
    const scene = document.querySelector('a-scene');
    if (!scene) return;

    // Verificar soporte WebXR
    checkXRSupport();

    // Configurar interacción con objetos
    document.querySelectorAll('.clickable').forEach(obj => {
        obj.addEventListener('click', handleObjectClick);
        obj.addEventListener('mouseenter', handleObjectHover);
        obj.addEventListener('mouseleave', handleObjectLeave);
    });

    // Simular eventos de bitácora
    simulateLogEvents();
}

// Verificar soporte WebXR
async function checkXRSupport() {
    const btnVR = document.getElementById('btn-vr');
    const btnMR = document.getElementById('btn-mr');

    if (!navigator.xr) {
        if (btnVR) btnVR.style.opacity = '0.3';
        if (btnMR) btnMR.style.opacity = '0.3';
        return;
    }

    const vrSupported = await navigator.xr.isSessionSupported('immersive-vr');
    const arSupported = await navigator.xr.isSessionSupported('immersive-ar');

    if (!vrSupported && btnVR) btnVR.style.opacity = '0.3';
    if (!arSupported && btnMR) btnMR.style.opacity = '0.3';
}

// Iniciar VR
async function startVR() {
    if (!navigator.xr) {
        alert('WebXR no disponible. Usando modo escritorio.');
        return;
    }

    const supported = await navigator.xr.isSessionSupported('immersive-vr');
    if (!supported) {
        alert('No hay headset VR conectado. Usando modo previsualización.');
        return;
    }

    try {
        const session = await navigator.xr.requestSession('immersive-vr', {
            optionalFeatures: ['local-floor', 'bounded-floor', 'hand-tracking']
        });
        // Configurar sesión VR...
    } catch (e) {
        console.error('Error VR:', e);
        alert('Error iniciando VR. Usando modo escritorio.');
    }
}

// Iniciar MR
async function startMR() {
    if (!navigator.xr) {
        alert('WebXR no disponible. Usando modo escritorio.');
        return;
    }

    const supported = await navigator.xr.isSessionSupported('immersive-ar');
    if (!supported) {
        alert('Passthrough/MR requiere Meta Quest 3. Usando modo previsualización.');
        return;
    }

    try {
        const session = await navigator.xr.requestSession('immersive-ar', {
            requiredFeatures: ['hit-test'],
            optionalFeatures: ['local-floor', 'bounded-floor']
        });
        // Configurar sesión MR...
    } catch (e) {
        console.error('Error MR:', e);
        alert('Error iniciando MR. Usando modo escritorio.');
    }
}

// Salir de XR
function exitXR() {
    window.location.href = 'index.html';
}

// Reiniciar misión
function resetMission() {
    missionTime = 0;
    hazardCount = 0;
    document.getElementById('log-entries').innerHTML = '';
    addLogEntry('Misión reiniciada', 'SYSTEM', 'info');
}

// Manejar clic en objeto
function handleObjectClick(event) {
    const obj = event.target;
    const name = obj.getAttribute('data-name') || 'Objeto desconocido';
    const pos = obj.getAttribute('position');
    
    hazardCount++;
    const severity = severities[Math.floor(Math.random() * severities.length)];
    
    // Crear marcador
    createHazardMarker(pos, severity, hazardCount);
    
    // Actualizar color del objeto
    obj.setAttribute('material', 'color', severity.color);
    
    // Agregar a bitácora
    addLogEntry(`Hazard ${severity.name} confirmado en ${name}`, 'NONACORTEX N7', severity.class);
    
    console.log(`[Nonacortex] Hazard #${hazardCount}: ${severity.name} en ${name}`);
}

// Crear marcador de hazard
function createHazardMarker(position, severity, id) {
    const scene = document.querySelector('a-scene');
    const pos = typeof position === 'string' ? position : `${position.x} ${position.y} ${position.z}`;
    const [x, y, z] = pos.split(' ').map(Number);
    
    const marker = document.createElement('a-entity');
    marker.setAttribute('geometry', 'primitive: ring; radiusInner: 0.4; radiusOuter: 0.6');
    marker.setAttribute('material', `color: ${severity.color}; shader: flat; side: double`);
    marker.setAttribute('position', `${x} ${y + 4} ${z}`);
    marker.setAttribute('rotation', '-90 0 0');
    marker.setAttribute('animation', 'property: scale; from: 1 1 1; to: 1.5 1.5 1.5; dur: 800; loop: true; dir: alternate');
    
    const label = document.createElement('a-text');
    label.setAttribute('value', `HZ-${id.toString().padStart(2, '0')} · ${severity.name}`);
    label.setAttribute('position', '0 0.8 0');
    label.setAttribute('color', severity.color);
    label.setAttribute('align', 'center');
    label.setAttribute('width', '3');
    marker.appendChild(label);
    
    scene.appendChild(marker);
}

// Hover sobre objeto
function handleObjectHover(event) {
    event.target.setAttribute('material', 'emissive', '#333333');
}

// Salir de hover
function handleObjectLeave(event) {
    event.target.setAttribute('material', 'emissive', '#000000');
}

// Agregar entrada a bitácora
function addLogEntry(event, node, severity) {
    const logEntries = document.getElementById('log-entries');
    if (!logEntries) return;
    
    const now = new Date();
    const time = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:${now.getSeconds().toString().padStart(2, '0')}`;
    
    const entry = document.createElement('div');
    entry.className = `log-entry ${severity}`;
    entry.textContent = `${time} · ${event} · ${node}`;
    
    logEntries.insertBefore(entry, logEntries.firstChild);
}

// Simular eventos de bitácora
function simulateLogEvents() {
    const events = [
        { event: 'PTT → CANAL RESCATE-1 · transmitiendo', node: 'DRN-05', severity: 'ptt' },
        { event: 'PTT cerrado', node: 'DRN-05', severity: 'info' },
        { event: 'N8 · gemelo digital actualizado en local', node: 'NONACORTEX N8', severity: 'info' },
        { event: 'N9 · KSHIELD aplicado · severidad confirmada', node: 'NONACORTEX N9', severity: 'info' }
    ];
    
    setInterval(() => {
        if (Math.random() > 0.7) {
            const evt = events[Math.floor(Math.random() * events.length)];
            addLogEntry(evt.event, evt.node, evt.severity);
        }
    }, 8000);
}