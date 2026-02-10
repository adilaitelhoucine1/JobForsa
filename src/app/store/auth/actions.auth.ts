import {createAction, props} from '@ngrx/store';
import {UserResponse} from '../../dto/UserResponse';
import {LoginRequest} from '../../dto/auth/LoginRequest';
import {RegisterRequest} from '../../dto/auth/RegisterRequest';
import {UpdateProfileRequest} from '../../dto/profile/UpdateProfileRequest';


export const login =  createAction(
  "[Auth ] login ",
  props<LoginRequest>()
)

export const  loginSuccess= createAction(
  "[Auth] login success",
  props<{user:UserResponse}>()
)
 export const loginFailure = createAction(
   "[Auth] login failure",
   props<{error : string}>()
 )

export  const register = createAction(
  "[Auth] register",
  props<RegisterRequest>()
)
export  const  registerSuccess =  createAction(
  "[Auth] register success",
  props<{user : UserResponse}>()
)
export const registerFailure = createAction(
  "[Auth] register failure",
  props<{error : string}>()
)
 export const logout= createAction(
   "[Auth] logout "
 )

export const loadUserFromStorage = createAction(
  "[Auth] load user from storage",
  props<{user: UserResponse}>()
)


 export  const  updateProfile = createAction(
   "[Profile ]  update profile ",
   props<{userId : number , userData : UpdateProfileRequest}>()
 )
 export  const  updateProfileSuccess= createAction(
   "[Profile ] update Profile Success" ,
   props<{user : UserResponse}>()
 )

 export  const  updateProfileFailure= createAction(
   "[Profile]  update Profile Failure",
   props<{error :string}>()
 )
