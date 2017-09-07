import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../User/models/user';
import { UserService } from '../../User/services/user.service';
import { UserProfile } from '../../User/models/user';
import { UserProfileService } from '../../User/services/user-profile.service';
import { CompanyService } from '../../company/services/company.service';
import { LocationService } from '../../locations/services/location.service';
import { State } from '../../locations/models/location';
import { ListResponse } from '../../bases/models/ListResponse';
import { Company } from '../../company/models/company';
import { CompleterService, CompleterData } from 'ng2-completer';
import { Country } from '../../locations/models/country';

interface UrlParams {
    id: string;
}

@Component({
    selector: 'as-user-admin',
    templateUrl: 'app/admin/templates/user-admin.component.html',
})

export class UserAdminComponent implements OnInit, OnDestroy {

    public user: User = new User({});
    public userProfile: UserProfile = new UserProfile({});
    public companyListResponse: ListResponse;
    public countryListResponse: ListResponse;
    public stateListResponse: ListResponse;
    public companyArray: Company[] = [];
    private searching: boolean = false;
    private searchResult: any[] = [];
    private loading: boolean = true;
    private _routerSubscription: any;
    private countryArray: Country[] = [];
    private stateArray: State[] = [];
    private companysearchStr: string;
    private companydataService: CompleterData;
    private addressCountrysearchStr: string;
    private addressCountrydataService: CompleterData;

    constructor(private _userService: UserService,
                private _companyService: CompanyService,
                private _countryService: LocationService,
                private _route: ActivatedRoute,
                private _userProfileService: UserProfileService,
                private completerService: CompleterService,
                private _router: Router) {
                this.getCompanies();
                this.getCountries();
    }

    ngOnInit() {
        this.getUserID();
        this.getStatesList();
    }
    companySearchStrChanged($event) {
        console.log($event);
        this.companysearchStr = $event;
    }
    companyWasSelected($event) {
        console.log($event);
        this.user.userprofile.company_id = $event.originalObject.id;
    }
    addressCountrySearchStrChanged($event) {
        console.log($event);
        this.addressCountrysearchStr = $event;
    }
    addressCountryWasSelected($event) {
        console.log($event);
        this.user.userprofile.address_country = $event.originalObject.id;
    }

    public getUserID() {
        this._routerSubscription = this._route.params.subscribe((params: UrlParams) => {
            if (params.hasOwnProperty('id')) {
                this.getUser(+params.id);
            } else {
                this.loading = false;
            }
        });
    }

    getUser(userId: number) {
        this.loading = true;
        this._userService.get(userId, {full: 'true'}).subscribe((res) => {
            this.user = res;
            this.loading = false;
        });
    }

    getCompanies() {
        this.loading = true;
        this._companyService.getList().subscribe((res) => {
            this.companyListResponse = res;
            this.companydataService = this.completerService.local(this.companyListResponse.results, 'name', 'name');
            for (let i in this.companyListResponse.results) {
                if (this.companyListResponse.results.hasOwnProperty(i)) {
                    this.companyArray.push(this.companyListResponse.results[i]);
                }
            }
            this.loading = false;
        });
    }

    getCountries() {
        this.loading = true;
        this._countryService.getList().subscribe((res) => {
            this.countryListResponse = res;
            this.addressCountrydataService = this.completerService.local(this.countryListResponse.results, 'name', 'name');
            for (let i in this.countryListResponse.results) {
                if (this.countryListResponse.results.hasOwnProperty(i)) {
                    this.countryArray.push(this.countryListResponse.results[i]);
                }
            }
            this.loading = false;
        });
    }

    getStatesList() {
        this.loading = true;
        this._countryService.getStates().subscribe((res) => {
            this.stateListResponse = res;
            for (let i in this.stateListResponse) {
                if (this.stateListResponse.hasOwnProperty(i)) {
                    this.stateArray.push(this.stateListResponse[i]);
                }
            }
            this.loading = false;
        });
    }

    save() {
        this.saveUser();
    }

    saveUser() {
        this.userProfile = this.user.userprofile;
        this.loading = true;
        console.log(this.user.id);
        if (this.user.id) {
            this._userService.upDateUser(this.user.id, JSON.stringify(this.user)).subscribe((res) => {
                this.user = res;
                this.saveUserProfile();
                this.loading = false;
            });
        } else {
            this._userService.createUser(this.user).subscribe((res) => {
                this.user = res;
                console.log(res);
                this.saveUserProfile();
            });

        }
        return false;
    }

    saveUserProfile() {
        this.loading = true;
        this.userProfile.user_id = this.user.id;
        this.userProfile.address_country = this.getId(this.countryArray, this.userProfile.address_country as string);
        this.userProfile.company_id = this.getId(this.companyArray, this.userProfile.company_id as string);
        if (typeof this.userProfile.user_image !== undefined && typeof this.userProfile.user_image !== '') {
            console.log(this.user.userprofile.user_image);
            this._userService.uploadProfileImage(this.userProfile.id,
                this.userProfile.user_image).subscribe((res) => {
                console.log(res);
            });
        }
        if (this.userProfile.id) {
            this._userService.upDateUserProfile(this.userProfile.id, JSON.stringify(this.userProfile)).subscribe((res) => {
                this.userProfile = res;
                this.user.userprofile = this.userProfile;
                this.loading = false;
            });
        } else {
            this._userProfileService.post(JSON.stringify(this.userProfile)).subscribe((res) => {
                this.userProfile = res;
                if (typeof this.user.userprofile.user_image !== undefined && typeof this.userProfile.user_image !== '') {
                    console.log(this.user.userprofile.user_image);
                    this._userService.uploadProfileImage(this.userProfile.id,
                        this.userProfile.user_image).subscribe((resp) => {
                        console.log(resp);
                    });
                }
                this.user.userprofile = this.userProfile;
                this.loading = false;
            });
        }
        return false;
    }

    getId(_array: any[], _name: string): number {
        let idToReturn: number;
        for (let i in _array) {
            if (_array[i].name === _name) {
                return idToReturn = _array[i].id;
            }
        }
    }

    getFileAsBase64() {
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();

        reader.addEventListener('load', () => {
            this.user.userprofile.user_image = reader.result;
            console.log(this.user.userprofile.user_image);
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    ngOnDestroy() {
        this._routerSubscription.unsubscribe();
    }

}
