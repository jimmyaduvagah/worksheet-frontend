import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { ListResponse } from '../../bases/models/ListResponse';
import { Http }    from '@angular/http';
import { User, UserProfile } from '../models/user';

@Component({
    selector: 'as-user-account-profile',
    templateUrl: 'app/User/templates/user-account-management.html',
    styleUrls: [
        'app/User/styles/user-account-management.css'
    ]
})

export class UserAccountManagementComponent implements OnInit {

    public currentUser: User;
    public currentUserProfile: UserProfile = new UserProfile({});
    public profile_image: any;
    public reader = new FileReader();

    constructor(private _userService: UserService,
                private http: Http) {
        return;
    }

    ngOnInit() {
        this.getCurrentUser();
    }

    saveUserAccountChanges() {

        if (typeof this.profile_image !== undefined) {
            console.log(this.profile_image);
            this._userService.uploadProfileImage(this.currentUser.userprofile.id,
                this.profile_image).subscribe((res) => {
                console.log(res);
            });
        }
        this._userService.upDateUserProfile(this.currentUser.userprofile.id, this.currentUserProfile).subscribe((res) => {
            this.currentUserProfile = res;
            console.log(this.currentUserProfile);
        });
    }

    getCurrentUser() {
        this._userService.get('current_user').subscribe((res) => {
            this.currentUser = res;
            console.log(this.currentUser);
        });
    }

    getFileAsBase64() {
        let file = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();

        reader.addEventListener('load', () => {
            this.profile_image = reader.result;
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }

}
