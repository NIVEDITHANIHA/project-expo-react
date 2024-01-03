import { baseUrl } from "./Baseurl";
import Api from "./Api";


export const registerApi = (reqbody) => {
    return Api("POST", `${baseUrl}/user/register`, reqbody, "")
}


export const loginApi = (reqbody) => {
    return Api("POST", `${baseUrl}/user/login`, reqbody, "")
}

export const projectsApi = (reqbody, header) => {
    return Api("POST", `${baseUrl}/project/addProject`, reqbody, header)
}

/* Search Api ?search this is the queryparameter */

export const getAllProject = (searchKey, header) => {
    return Api("GET", `${baseUrl}/project/getAllProject?search=${searchKey}`, "", header)
}

export const getHomeProject = () => {
    return Api("GET", `${baseUrl}/project/getHomeProject`)
}

export const getUsersProject = (header) => {
    return Api("GET", `${baseUrl}/project/getUsersProject`, "", header)
}

export const EditprojectApi = (project_id, reqbody, header) => {
    return Api("PUT", `${baseUrl}/project/edit/${project_id}`, reqbody, header)
}

export const deleteApi = (project_id, header) => {
    return Api("DELETE", `${baseUrl}/project/delete/${project_id}`, {}, header)
}

export const editProfileApi = (body, header) => {
    return Api("PUT", `${baseUrl}/user/edit`, body, header)
}

