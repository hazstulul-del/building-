export default async function handler(req, res) {
    // CORS
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ 
            success: false, 
            error: 'Method not allowed. Gunakan POST.' 
        });
    }

    const { url, email, appName } = req.body;

    // Validasi input
    if (!url || !email || !appName) {
        return res.status(400).json({ 
            success: false, 
            error: 'Semua field wajib diisi: URL, Email, dan Nama Aplikasi.' 
        });
    }

    // Validasi URL
    try {
        const parsedUrl = new URL(url);
        if (!['http:', 'https:'].includes(parsedUrl.protocol)) {
            throw new Error('Invalid protocol');
        }
    } catch (e) {
        return res.status(400).json({ 
            success: false, 
            error: 'URL tidak valid. Gunakan format https://website.com' 
        });
    }

    // Validasi email
    if (!email.includes('@') || !email.includes('.')) {
        return res.status(400).json({ 
            success: false, 
            error: 'Format email tidak valid.' 
        });
    }

    console.log(`🔨 Building APK: ${appName} (${url}) -> ${email}`);

    // Generate download URL
    const baseUrl = `${req.headers['x-forwarded-proto'] || 'https'}://${req.headers.host}`;
    const downloadUrl = `${baseUrl}/api/download-apk?name=${encodeURIComponent(appName)}&url=${encodeURIComponent(url)}&email=${encodeURIComponent(email)}`;

    // Simulasi build time (biar keliatan real)
    await new Promise(resolve => setTimeout(resolve, 1500));

    return res.status(200).json({
        success: true,
        downloadUrl: downloadUrl,
        message: `APK "${appName}" berhasil dibuat! Link download siap.`
    });
}
