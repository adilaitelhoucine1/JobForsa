import {UserResponse} from '../../dto/UserResponse';


export  interface authState{
    user : UserResponse | null;
    error : string | null;
    loading : boolean;
    isAuthenticated : boolean;
}
