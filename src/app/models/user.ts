export class User {
    public email: string;
    public password: string;
    public fullName: string;
    public birthday: string;
    public gender: 'male' | 'female';
    public image: string;
    public isAdmin: boolean;
    public isBlocked: boolean;

    constructor(
        email: string,
        password: string,
        fullName: string,
        birthday: string,
        gender: 'male' | 'female',
        image?: string,
        isAdmin: boolean = false,
        isBlocked: boolean = false
    ) {
        this.email = email;
        this.password = password;
        this.fullName = fullName;
        this.birthday = birthday;
        this.gender = gender;
        this.image = image || (gender === 'male' ? '/assets/avatar-male.svg' : '/assets/avatar-female.svg');
        this.isAdmin = isAdmin;
        this.isBlocked = isBlocked;
    }
}
