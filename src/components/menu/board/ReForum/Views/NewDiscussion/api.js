import axios from 'axios';
import { properties } from "../../../../../../properties";

export const postDiscussionApi = (discussion) => {
  return axios.post(properties.chronasApiHost + '/board/discussion/newDiscussion', discussion, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('chs_token')}});
};

export const updatetDiscussionApi = (discussion) => {
  return axios.post(properties.chronasApiHost + '/board/discussion/newDiscussion/' + discussion.id, discussion, { 'headers': { 'Authorization': 'Bearer ' + localStorage.getItem('chs_token')}});
};
