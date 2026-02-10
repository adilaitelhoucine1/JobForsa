import {createAction, props} from '@ngrx/store';
import {UserResponse} from '../../dto/UserResponse';
import {LoginRequest} from '../../dto/LoginRequest';
import {RegisterRequest} from '../../dto/RegisterRequest';


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

