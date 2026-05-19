const canvas = document.getElementById('watch-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

let rotation = 0;

function drawWatch() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    rotation += 0.004;

    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    // OUTER GLOW
    const glow = ctx.createRadialGradient(0, 0, 20, 0, 0, 300);
    glow.addColorStop(0, 'rgba(255,255,255,0.12)');
    glow.addColorStop(1, 'rgba(255,255,255,0)');

    ctx.fillStyle = glow;
    ctx.beginPath();
    ctx.arc(0, 0, 300, 0, Math.PI * 2);
    ctx.fill();

    // WATCH BODY
    ctx.beginPath();
    ctx.arc(0, 0, 180, 0, Math.PI * 2);
    ctx.fillStyle = '#0e0e0e';
    ctx.fill();

    ctx.lineWidth = 12;
    ctx.strokeStyle = '#555';
    ctx.stroke();

    // INNER DIAL
    ctx.beginPath();
    ctx.arc(0, 0, 145, 0, Math.PI * 2);
    ctx.fillStyle = '#111';
    ctx.fill();

    // TICKS
    for (let i = 0; i < 60; i++) {
        ctx.save();
        ctx.rotate((Math.PI * 2 / 60) * i);

        ctx.beginPath();
        ctx.moveTo(0, -120);
        ctx.lineTo(0, -135);

        ctx.lineWidth = i % 5 === 0 ? 4 : 1;
        ctx.strokeStyle = i % 5 === 0 ? '#fff' : '#777';
        ctx.stroke();
requestAnimationFrame(drawWatch);
