import {createReducer,on} from '@ngrx/store';
import * as AuthActions from './actions.auth';
 import {authState} from './state.auth';


export  const initialState : authState={
   user : null,
   error : null,
   loading : false,
   isAuthenticated : false
 }

 export const authReducer = createReducer(
   initialState,
   on(AuthActions.login, (state)=>({
     ...state,
      loading: true,
     error:null
   })),
    on(AuthActions.loginSuccess, (state,{user})=>({
      ...state,
      user:user,
      error:null,
      isAuthenticated: true,
      loading : false
    })),

   on(AuthActions.loginFailure, (state, { error }) => ({
     ...state,
     loading: false,
     error: error
   })),

    on(AuthActions.register, (state)=>({
      ...state,
      loading: true,
      error: null
    })),

   on(AuthActions.registerSuccess , (state , {user})=>({
     ...state,
     user:user,
     isAuthenticated: true,
     loading: false,
     error: null
   })),

   on(AuthActions.registerFailure, (state, { error }) => ({
    ...state,
     error: error || 'Registration failed. Please try again.',
     loading: false
   })),

  on(AuthActions.logout , (state)=>({
    ...state,
    loading: false,
    isAuthenticated: false,
    user: null,
    error: null
  })),

  on(AuthActions.loadUserFromStorage, (state, {user})=>({
    ...state,
    user: user,
    isAuthenticated: true,
    loading: false,
    error: null
  })),

   on(AuthActions.updateProfile, state => ({
      ...state,
      loading: true,
      error: null
   })),
   on(AuthActions.updateProfileSuccess, (state, { user }) => ({
        ...state,
        user,
        loading: false,
        error: null
   })),
   on(AuthActions.updateProfileFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
   })),

   on(AuthActions.deleteUser, state => ({
      ...state,
      loading: true,
      error: null
   })),
   on(AuthActions.deleteUserSuccess, () => ({
      ...initialState
   })),
   on(AuthActions.deleteUserFailure, (state, { error }) => ({
      ...state,
      loading: false,
      error
   }))
 )
