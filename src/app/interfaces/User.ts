export interface User{
    id_user: number,
    email: string,
    first_name: string,
    last_name: string,
    password:string,
    password_changed_date: string,
    type_user: string,
    status: string,
    failde_attempts: number,
    dependencies_id_dependencie: number,
    id_dependencie: number,
    name_dependencie: string
}