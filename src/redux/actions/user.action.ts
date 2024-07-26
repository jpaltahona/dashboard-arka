import {USERDATA} from '../types';

export const userAction = ( data:any ) => async (dispatch:any) =>{
  dispatch({
      type: USERDATA,
      payload: data
  });
}
