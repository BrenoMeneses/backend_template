export type UserProps = {
    id: string;
    name: string;
    email: string;
    password: string;
}

export default class User {
    private constructor(private props: UserProps) {
        console.log(this.props)
    }

    public static create(name: string, email: string, password: string) {
        const id = crypto.randomUUID().toString();
        return new User({
            id: id,
            name: name,
            email: password,
            password: password
        });
    }

    public static with(props: UserProps) {
        return new User(props);
    }
}