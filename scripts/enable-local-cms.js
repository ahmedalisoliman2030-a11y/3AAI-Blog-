import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const configPath = path.join(__dirname, '..', 'public', 'admin', 'config.yml');
const config = fs.readFileSync(configPath, 'utf8');

// Uncomment local_backend line
const updatedConfig = config.replace(
    /^#\s*local_backend:\s*true.*$/m,
    'local_backend: true'
);

fs.writeFileSync(configPath, updatedConfig, 'utf8');
console.log('✅ Local backend enabled for development');
