import {Injectable} from '@angular/core';
import { ENV } from '../shared/constant/env';

@Injectable()
export class SettingsService {

    private devMode = ENV.DEV_MODE;
    private protocol = ENV.PROTOCOL;
    private domain = ENV.DOMAIN;
    private baseUrl = ENV.BASE_URL;
    private apiVersion = ENV.API_VERSION;

    private uploadBase = ENV.UPLOAD_BASE;

    constructor() {
        // if (!this.devMode) {
        //     this.protocol = 'http';
        //     this.domain = '127.0.0.1';
        // }
    }

    public getUploadBase() {
        return this.uploadBase;
    }

    public getProtocol() {
        return this.protocol;
    }

    public isDevMode() {
        return this.devMode;
    }

    public getDomain() {
        return this.domain;
    }

    public getBaseUrl(version?: string) {
        if (typeof version === 'undefined') {
            version = this.apiVersion;
        }
        return this.baseUrl + 'v' + version + '/';
    }
}
