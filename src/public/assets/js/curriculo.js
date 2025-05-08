const API_PDF_URL = 'https://api.pdfshift.io/v3/convert/pdf';
const API_KEY = 'sk_f85cf4a3f37251e0c3aaae35b52b02a1c970a896';

async function downloadPDF() {

    const response = await fetch(API_PDF_URL, {
        method: 'POST',
        headers: {
            'X-API-Key': API_KEY,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sandbox: true,
            source: 'https://en.wikipedia.org/wiki/PDF'
        })
    });

    if (!response.ok) {
        console.error('Failed to fetch PDF:', response.statusText);
        return;
    }

    const blob = await response.blob();
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'wikipedia.pdf';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);

    URL.revokeObjectURL(url);
}


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('btn_gerar_pdf').addEventListener('click', downloadPDF);
});


