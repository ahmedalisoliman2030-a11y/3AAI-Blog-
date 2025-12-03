import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, '..', 'public', 'admin', 'config.yml');
const config = fs.readFileSync(configPath, 'utf8');

// Comment out local_backend line
const updatedConfig = config.replace(
    /^local_backend:\s*true.*$/m,
    '# local_backend: true # ⚠️ قم بإزالة التعليق هنا فقط عند التجربة المحلية (Local Development)'
);

fs.writeFileSync(configPath, updatedConfig, 'utf8');
console.log('✅ Local backend disabled for production');
