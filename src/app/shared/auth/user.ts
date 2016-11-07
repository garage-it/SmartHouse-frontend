export class User {
    name: string;
    email: string;
    password: string;
    passwordConfirm: string;

    constructor(name = '', email = '', password = '', passwordConfirm = '') {
        this.name = name;
        this.email = email;
        this.password = password;
        this.passwordConfirm = passwordConfirm;
    }
}
