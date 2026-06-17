document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('searchForm');
    const dniInput = document.getElementById('dniInput');
    const processingState = document.getElementById('processingState');
    const terminalLog = document.getElementById('terminalLog');
    const resultCard = document.getElementById('resultCard');

    // Result Elements
    const statusIndicator = document.getElementById('statusIndicator');
    const statusTitle = document.getElementById('statusTitle');
    const resultMessage = document.getElementById('resultMessage');
    const certificatePreview = document.getElementById('certificatePreview');
    const filenameDisplay = document.getElementById('filenameDisplay');
    const downloadBtn = document.getElementById('downloadBtn');

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const dni = dniInput.value.trim();

        if (!dni) return;

        // Reset & Start Animation
        resultCard.classList.add('hidden');
        processingState.classList.remove('hidden');
        form.style.opacity = '0.5';
        form.style.pointerEvents = 'none'; // Disable form during check

        // Simulate engineered process
        simulateProcessing(dni);
    });

    function simulateProcessing(dni) {
        const steps = [
            "Conectando a base de datos...",
            "Verificando integridad hash...",
            "Buscando coincidencia de DNI..."
        ];

        let i = 0;
        // Text animation for terminal log
        const interval = setInterval(() => {
            if (i < steps.length) {
                terminalLog.textContent = steps[i];
                i++;
            }
        }, 600);

        // Completion
        setTimeout(() => {
            clearInterval(interval);
            processingState.classList.add('hidden');
            form.style.opacity = '1';
            form.style.pointerEvents = 'all';

            checkCertificate(dni);
        }, 2000); // 2 second mock delay
    }

function checkCertificate(dni) {
    resultCard.classList.remove('hidden');

    const records = {
        '72604038': 'Gabriela Nhia Quiñonez Chuquitapa',
        '70416995': 'Roxana Cusi Ccasani'
    };

    if (records[dni]) {
        const participantName = records[dni];
        statusIndicator.className = 'status-indicator valid';
        statusTitle.textContent = 'CERTIFICADO VERIFICADO';
        resultMessage.innerHTML = `
            <div style="margin-bottom: 0.5rem; color: #86868b; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 1px;">Participante</div>
            <div style="font-size: 1.25rem; font-weight: 600; color: white; margin-bottom: 0.2rem;">${participantName}</div>
            <div style="font-family: var(--font-mono); color: var(--accent); font-size: 0.9rem; margin-bottom: 1rem;">DNI: ${dni}</div>
            <div style="font-size: 0.9rem; color: #86868b;">El documento oficial se encuentra disponible para su descarga.</div>
        `;
        certificatePreview.classList.remove('hidden');
        filenameDisplay.textContent = `Certificado_${dni}.pdf`;
        downloadBtn.href = `${dni}[FP].pdf`;
    } else {
        statusIndicator.className = 'status-indicator invalid';
        statusTitle.textContent = 'REGISTRO NO ENCONTRADO';
        resultMessage.textContent = 'No se encontró documentación asociada a este identificador en el periodo fiscal vigente.';
        certificatePreview.classList.add('hidden');
        downloadBtn.href = '#';
    }
}
});
