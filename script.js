const canvas = document.getElementById('portraitCanvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

const images = ['image1.JPG', 'image2.JPG', 'image3.JPG'];
let currentIndex = 0;

const tributeText = `You are not standing alone now. You stood firm through our darkest hours, when everything felt unsteady, when strength had to be chosen every day. You carried more than your share so the rest of us could breathe, so we could keep going. We did not forget that. What we forged together was not made in ease. It was shaped by pressure, by nights that demanded endurance, by faith in each other when certainty was nowhere to be found. The memories we built are not distant. They live in us. They are reminders of who we are and what we are capable of surviving together. This bond moved beyond friendship. It became family—chosen, earned, unbreakable. Not blood, but deeper than that. You are one of my own. And now, in this moment that weighs heavier than the rest, we stand tall for you. Just as you did for us. No matter how this path unfolds—whether the days ahead bring relief or difficulty—we will be here. Steady. Present. Unmoving. Through the best outcome. Through the hardest one. Through joy and through trial, "The Forgers" remain united. When the world feels uncertain, we rely on each other. When strength falters, we hold the line together. We have faced moments where it felt like we had no one but each other—and we learned that was enough. I am thankful for everything we created. For every time you fought—for me, for us, for what we believed in. Now it is our turn. You do not have to be strong for us. We will be strong with you. We will stay. We will not waver. We will not leave. You are not alone. Not now. Not ever. `;

function drawPortrait() {
    const img = new Image();
    img.src = images[currentIndex];
    
    img.onload = () => {
        // High-res for detail
        const targetWidth = 1200; 
        canvas.width = targetWidth;
        canvas.height = (img.height / img.width) * targetWidth;
        
        // --- 3RD IMAGE PANNING (Shifted Right) ---
        if (currentIndex === 2) {
            const zoomFactor = 0.8; 
            const sourceW = img.width * zoomFactor;
            const sourceH = img.height * zoomFactor;
            const sourceX = img.width * 0.2; // Adjust this to pan <<<
            const sourceY = (img.height - sourceH) / 2;
            ctx.drawImage(img, sourceX, sourceY, sourceW, sourceH, 0, 0, canvas.width, canvas.height);
        } else {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        }

        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // --- TEXT ART SETTINGS ---
        const fontSize = 5.5; 
        ctx.font = `bold ${fontSize}px Courier, monospace`;
        const contrast = 2.5;    
        const exposure = 1.5;    
        const spacingX = fontSize * 0.6; 
        const spacingY = fontSize * 0.85; 

        let charIndex = 0;
        for (let y = 0; y < canvas.height; y += spacingY) {
            for (let x = 0; x < canvas.width; x += spacingX) {
                const pixelIndex = (Math.floor(y) * canvas.width + Math.floor(x)) * 4;
                let r = (((imageData.data[pixelIndex] - 128) * contrast) + 128) * exposure;
                let g = (((imageData.data[pixelIndex + 1] - 128) * contrast) + 128) * exposure;
                let b = (((imageData.data[pixelIndex + 2] - 128) * contrast) + 128) * exposure;

                const brightness = (r + g + b) / 3;
                if (brightness > 20) { 
                    ctx.fillStyle = `rgb(${Math.min(255, r)},${Math.min(255, g)},${Math.min(255, b)})`;
                    ctx.fillText(tributeText[charIndex % tributeText.length], x, y);
                    charIndex++;
                }
            }
        }
    };
}

function changeSlide(dir) {
    currentIndex = (currentIndex + dir + images.length) % images.length;
    drawPortrait();
}

window.onload = drawPortrait;