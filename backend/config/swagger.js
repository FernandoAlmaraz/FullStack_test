import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yaml';
import fs from 'fs';

const setupSwagger = (app) => {
    const swaggerFile = path.join(process.cwd(), 'swagger.yml');
    const swaggerDocument = YAML.parse(fs.readFileSync(swaggerFile, 'utf8'));

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
};

export default setupSwagger;
