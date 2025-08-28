export type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
}

export class User {
    private constructor(private props: UserProps) {
        this.validate()
    }

    public static create(name: string, email: string, password: string) {
        const id = crypto.randomUUID().toString();
        return new User({
            id: id,
            name: name,
            email: email,
            password: password
        });
    }

    public static with(props: UserProps) {
        return new User(props);
    }

    private validate(){
        if(this.props.password.length < 6){
            throw new Error("Password must be at least 6 characters long");
        }
        if(!this.props.email.includes("@")){
            throw new Error("Email must be valid");
        }
    }

    public get id(){
        return this.props.id
    }

    public get name(){
        return this.props.name
    }

    public get email(){
        return this.props.email
    }

    public get password(){
        return this.props.password
    }
}