import { Injectable } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { AuthService } from '../Auth/Auth.service';
import { NbMenuItem } from '@nebular/theme';
import { PrivilegesService } from './privileges.service';
import { TranslationService } from './translation.service';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(
    private AuthService: AuthService,
    private privilegesService: PrivilegesService,
    private translate: TranslationService
  ) { }

  validators: Validators[];

  getMenuItems(list: NbMenuItem[]) {
    let out = [];
    for (var i = 0; i < list.length; i++) {
      if (
        !list[i].data
        || list[i].data.length == 0
        || this.privilegesService.isAuthorized(list[i]['data']['privilege'])) {
        list[i].title = this.translate.translateWord(list[i].title);
        out.push(list[i]);
      }
      if (list[i].children) {
        list[i].children = this.getMenuItems(list[i].children);
      }
    }
    return out;
  }

  getFields(name) {
    var fields = {};
    fields['addRole'] = [
      // { name: "role_id", type: "selectApi", apiName: "roles/roles", bindLable: "role_id", bindValue: "role_name", label: "role id" }
    ]
    fields['users'] = [
      { name: 'first_name', type: 'text', label: 'firstName', validators: [Validators.required, Validators.minLength(3)], colClasses: ['col-5', 'my-2'], inputClasses: ['mt-1'] },
      { name: 'last_name', type: 'text', label: 'lastName', validators: [Validators.required], colClasses: ['col-5', 'my-2'], inputClasses: ['mt-1'] },
      { name: 'email', type: 'text', label: 'email', validators: [], asyncValidators: [this.checkEmail.bind(this)], colClasses: ['col-10', 'my-2'], inputClasses: ['mt-1'] },
      { name: 'password', type: 'password', label: 'password', validators: [Validators.required], colClasses: ['col-10', 'my-2'], inputClasses: ['mt-1'] },
      // { name: 'confirmPassword', type: 'password', label: 'confirmPassword', validators: [Validators.required], colClasses: ['col-10', 'my-2'], inputClasses: ['mt-1'] },
      { name: 'birthday', type: 'date', label: 'birthday', validators: [Validators.required], colClasses: ['col-5', 'my-2'], inputClasses: ['mt-1'] },
      { name: 'mobile_number', type: 'number', label: 'mobileNumber', validators: [Validators.required], colClasses: ['col-5', 'my-2'], inputClasses: ['mt-1'] },
      // { name: 'roleName', type: 'selectApi', apiName: "roles/roles", bindLabel: 'name', bindValue: 'id', label: 'roleName', validators: [Validators.required], colClasses: ['col-5', 'my-2'], inputClasses: ['mt-1'] }
      { name: 'role_id', type: 'selectApi', disabled: "true", apiName: "roles/roles", bindLabel: 'name', bindValue: 'id', label: 'role', validators: [Validators.required], colClasses: ['col-5', 'my-2'], inputClasses: ['mt-1'] }
    ],


      fields['users'] = [
        { name: 'first_name', type: 'text', label: 'firstName', validators: [Validators.required, Validators.minLength(3)], colClasses: ['col-5', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'last_name', type: 'text', label: 'lastName', validators: [Validators.required], colClasses: ['col-5', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'email', type: 'text', label: 'email', validators: [Validators.required], asyncValidators: [this.checkEmail.bind(this)], colClasses: ['col-10', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'password', type: 'password', label: 'password', validators: [Validators.required], colClasses: ['col-10', 'my-2'], inputClasses: ['mt-1'] },
        // { name: 'confirmPassword', type: 'password', label: 'confirmPassword', validators: [Validators.required], colClasses: ['col-10', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'birthday', type: 'date', label: 'birthday', validators: [Validators.required], colClasses: ['col-5', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'mobile_number', type: 'number', label: 'mobileNumber', validators: [Validators.required], colClasses: ['col-5', 'my-2'], inputClasses: ['mt-1'] },
        // { name: 'roleName', type: 'selectApi', apiName: "roles/roles", bindLabel: 'name', bindValue: 'id', label: 'roleName', validators: [Validators.required], colClasses: ['col-5', 'my-2'], inputClasses: ['mt-1'] }
        { name: 'role_id', type: 'selectApi', disabled: "true", apiName: "roles/roles", bindLabel: 'name', bindValue: 'id', label: 'role', validators: [Validators.required], colClasses: ['col-5', 'my-2'], inputClasses: ['mt-1'] }
      ],

      fields['permissions'] = [
        { name: 'name', type: 'text', label: 'privilegeName', validators: [Validators.required, Validators.minLength(3)], colClasses: ['col-7', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'description', type: 'text', label: 'description', validators: [Validators.required, Validators.minLength(3)], colClasses: ['col-7', 'my-2'], inputClasses: ['mt-1'] }
      ],

      fields['trips'] = [
        { name: "startFrom", type: 'date', label: "startFrom", validators: [Validators.required], colClasses: ['col-4', 'my-2'], inputClasses: ['mt-1'] },
        { name: "finishTo", type: 'date', label: "FinshAt", validators: [Validators.required], colClasses: ['col-4', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'name', type: 'text', label: "name", validators: [Validators.required], colClasses: ['col-8', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'tripFlow', type: "textarea", label: "tripFlow", validators: [Validators.required], colClasses: ['col-8', 'my-2'], inputClasses: ['mt-1', 'textArea'] },
        { name: 'description', type: "textarea", label: "description", validators: [Validators.required], colClasses: ['col-8', 'my-2', 'mr-1'], inputClasses: ['mt-1', 'textArea'] },
        { name: 'price', type: 'number', label: "price", validators: [Validators.required], colClasses: ['col-4', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'evaluation', type: 'number', label: "evaluation", validators: [Validators.required], colClasses: ['col-4', 'my-2'], inputClasses: ['mt-1'] },
      ],

      fields['hotels'] = [
        { name: 'name', type: 'text', label: "name", validators: [Validators.required], colClasses: ['col-8', 'my-2', 'mr-1'], inputClasses: ['mt-1'] },
        { name: 'mobile_number', type: 'text', label: 'mobileNumber', validators: [Validators.required], colClasses: ['col-4', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'email', type: 'text', label: 'email', validators: [Validators.required], asyncValidators: [this.checkEmail.bind(this)], colClasses: ['col-4', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'address', type: 'text', label: 'address', validators: [Validators.required], colClasses: ['col-8', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'description', type: "textarea", label: "description", validators: [Validators.required], colClasses: ['col-8', 'my-2', 'mr-1'], inputClasses: ['mt-1', 'textArea'] },
        { name: 'price', type: 'number', label: "price", validators: [Validators.required], colClasses: ['col-4', 'my-2'], inputClasses: ['mt-1'] },
        { name: 'evaluation', type: 'number', label: "evaluation", validators: [Validators.required], colClasses: ['col-4', 'my-2'], inputClasses: ['mt-1'] },
      ]
    return fields[name];
  }

  getTableInfo(tableName) {
    var fields = {};
    fields['users'] = [
      "firstName", "lastName", "email", "gender", "birthday", "mobileNumber"],
      fields['clinics'] = [
        "clinicName", "fOwnerName", "lOwnerName", "email", "city", "country", "descrption"
      ],
      // fields['travelAgencies'] = [
      //   "name", "username", "lOwnerName", "email", "city", "country", "descrption"
      // ]

      fields['roles'] = [
        'name', 'description'],
      fields['privileges'] = [
        'name', 'description'
      ]
    return fields[tableName]
  }

  checkEmail(control: FormControl) {
    const promise = new Promise((reslove, rejcet) => {
      this.AuthService.checkEmail(control.value).subscribe(response => {
        const RES = response.json();
        if (!RES.success) {
          reslove({ emailIsUsed: true });
        } else {
          reslove(null);
        }
      });
    });

    return promise;
  }
}
