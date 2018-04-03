// let TAG = `GLOBAL` // TAG MUST BE UNIQUE ACCROSS PROJECT
let TAG = `AUTH`

/** ************************ For Mutations ***************************************/
export const SET_STATE = `${TAG}_SET_STATE`
export const SIGNIN_STATE = `${TAG}_SIGNIN_STATE`
export const SIGNOUT_STATE = `${TAG}_SIGNOUT_STATE`
export const USER = `${TAG}_USER`
export const ROLES = `${TAG}_ROLES`
/*******************************************************************************/

/** ************************ For Actions ****************************************/
export const SIGNIN = `${TAG}_SIGNIN`
/*******************************************************************************/

/** ************************ For Getters ****************************************/
export const GET_ENTRIES = `${TAG}_GET_ENTRIES`
export const IS_AUTHENTICATED = `${TAG}_IS_AUTHENTICATED`
export const TOKEN = `${TAG}_TOKEN`
/*******************************************************************************/
