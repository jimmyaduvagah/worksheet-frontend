/**
 * Only valid JSON data types can be used for types
 *
 * Make sure the keys in `env.model.ts` exist in `env.json`
 * otherwise it'll throw message like this
 * Property '<missing-key>' is missing in type '{}'
 *
 */

export interface AppEnv {
    DEV_MODE?: boolean;
    PROTOCOL?: string;
    DOMAIN?: string;
    BASE_URL?: string;
    API_VERSION?: string;
    UPLOAD_BASE?: string;
}
