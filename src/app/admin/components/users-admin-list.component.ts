import { Component, OnInit } from '@angular/core';
import {UserService} from '../../User/services/user.service';
import {User} from '../../User/models/user';
import {Router} from '@angular/router';
import {ListResponse} from '../../bases/models/ListResponse';

@Component({
    selector: 'as-user-admin-list-dashboard',
    templateUrl: 'app/admin/templates/users-admin-list.component.html',
})

export class UserAdminListComponent implements OnInit {

    public userResponse: ListResponse;
    public searchTerm: string = '';
    private loadingUser: boolean = true;
    private loading: boolean = true;


    constructor(
    private _userService: UserService,
    private _router: Router
    ) {
       return;
    }

    ngOnInit() {
        document.title = 'Users';
        this.getUsers();
    }

    getUsers() {
        this.loading = true;
        this._userService.getList().subscribe((res) => {
            this.userResponse = res;
            this.loading = false;
        });
    }
     search(searchTerm: string) {
        this.loading = true;
        let params = {};
        if (searchTerm !== '') {
        let field = 'search';
        params[field] = searchTerm;
        }
        this._userService.getList(params).subscribe((res) => {
        this.userResponse = res;
        this.loading = false;
        });
      }
      goToEdit(user: User) {
        this._router.navigate(['/users/form/', {id: user.id}]);
    }

}
