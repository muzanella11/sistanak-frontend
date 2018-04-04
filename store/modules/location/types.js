// let TAG = `GLOBAL` // TAG MUST BE UNIQUE ACCROSS PROJECT
let TAG = `LOCATION`

/** ************************ For Mutations ***************************************/
export const SET_STATE = `${TAG}_SET_STATE`
export const PRUNE_STATE_PROVINCE = `${TAG}_PRUNE_STATE_PROVINCE`

export const PRUNE_STATE_REGION = `${TAG}_PRUNE_STATE_REGION`

export const PRUNE_STATE_VILLAGE = `${TAG}_PRUNE_STATE_VILLAGE`
/*******************************************************************************/

/** ************************ For Actions ****************************************/
export const FETCH_PROVINCE = `${TAG}_FETCH_PROVINCE`
export const FETCH_DETAIL_PROVINCE = `${TAG}_FETCH_DETAIL_PROVINCE`
export const FETCH_DETAIL_DATA_PROVINCE = `${TAG}_FETCH_DETAIL_DATA_PROVINCE`
export const CREATE_DATA_PROVINCE = `${TAG}_CREATE_DATA_PROVINCE`
export const UPDATE_DATA_PROVINCE = `${TAG}_UPDATE_DATA_PROVINCE`
export const DELETE_DATA_PROVINCE = `${TAG}_DELETE_DATA_PROVINCE`

export const FETCH_REGION = `${TAG}_FETCH_REGION`
export const FETCH_DETAIL_REGION = `${TAG}_FETCH_DETAIL_REGION`
export const FETCH_DETAIL_DATA_REGION = `${TAG}_FETCH_DETAIL_DATA_REGION`
export const CREATE_DATA_REGION = `${TAG}_CREATE_DATA_REGION`
export const UPDATE_DATA_REGION = `${TAG}_UPDATE_DATA_REGION`
export const DELETE_DATA_REGION = `${TAG}_DELETE_DATA_REGION`

export const FETCH_VILLAGE = `${TAG}_FETCH_VILLAGE`
export const FETCH_DETAIL_VILLAGE = `${TAG}_FETCH_DETAIL_VILLAGE`
export const FETCH_DETAIL_DATA_VILLAGE = `${TAG}_FETCH_DETAIL_DATA_VILLAGE`
export const CREATE_DATA_VILLAGE = `${TAG}_CREATE_DATA_VILLAGE`
export const UPDATE_DATA_VILLAGE = `${TAG}_UPDATE_DATA_VILLAGE`
export const DELETE_DATA_VILLAGE = `${TAG}_DELETE_DATA_VILLAGE`
/*******************************************************************************/

/** ************************ For Getters ****************************************/
export const GET_ENTRIES_PROVINCE = `${TAG}_GET_ENTRIES_PROVINCE`

export const GET_ENTRIES_REGION = `${TAG}_GET_ENTRIES_REGION`

export const GET_ENTRIES_VILLAGE = `${TAG}_GET_ENTRIES_VILLAGE`
/*******************************************************************************/
