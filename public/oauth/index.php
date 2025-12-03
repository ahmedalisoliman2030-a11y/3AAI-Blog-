<?php
/**
 * سكربت المصادقة النهائي لـ Dawen CMS
 */

// استدعاء ملف الإعدادات السري (الذي يولده GitHub Action)
require_once 'config.php';

// ========================================================
// 1. استقبال الرمز من GitHub وتبادله بالتوكن
// ========================================================
if (isset($_GET['code'])) {
    $code = $_GET['code'];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://github.com/login/oauth/access_token');
    curl_setopt($ch, CURLOPT_POST, 1);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query([
        'client_id' => CLIENT_ID,
        'client_secret' => CLIENT_SECRET,
        'code' => $code,
        'state' => 'random_state_string' 
    ]));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_HTTPHEADER, ['Accept: application/json']);
    
    $response = curl_exec($ch);
    curl_close($ch);
    
    $data = json_decode($response, true);
    
    // صياغة الرسالة للوحة التحكم
    $content = isset($data['access_token']) 
        ? 'authorization:github:success:' . json_encode(['token' => $data['access_token'], 'provider' => 'github']) 
        : 'authorization:github:error:' . json_encode($data);
    
    // كود JS لإرسال التوكن وإغلاق النافذة فوراً
    echo "<script>
        const receiveMessage = (message) => {
            window.opener.postMessage(message, '*');
            window.close(); // إغلاق النافذة بعد النجاح
        }
        receiveMessage('$content');
    </script>";
    exit;
}

// ========================================================
// 2. توجيه المستخدم لتسجيل الدخول
// ========================================================
$authorize_url = "https://github.com/login/oauth/authorize?" . http_build_query([
    'client_id' => CLIENT_ID,
    'scope' => 'repo user',
    'redirect_uri' => REDIRECT_URI,
    'state' => 'random_state_string'
]);

header("Location: $authorize_url");
exit;
?>
