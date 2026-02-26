import * as environments from './environmentUrls.json';

export function selectEnvironment() {
    if (process.env.ENVIRONMENT === 'undenfined') {
        return 'undefined';
    }

    const environment = process.env.ENVIRONMENT as keyof (typeof environments)['baseUrls'];

    try {
        return environments.baseUrls[environment];
    } catch (error) {
        console.error('Error loading environment variables;', error);
        process.exit(1);
    }
}