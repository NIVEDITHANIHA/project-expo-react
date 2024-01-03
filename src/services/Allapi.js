import { baseUrl } from "./Baseurl";
import Api from "./Api";


export const registerApi = async (reqbody) => {
    return await Api("POST", `${baseUrl}/user/register`, reqbody, "")
}


export const loginApi = async (reqbody) => {
    return await Api("POST", `${baseUrl}/user/login`, reqbody, "")
}

export const projectsApi = async (reqbody, header) => {
    return await Api("POST", `${baseUrl}/project/addProject`, reqbody, header)
}

/* Search Api ?search this is the queryparameter */

export const getAllProject = async (searchKey, header) => {
    return await Api("GET", `${baseUrl}/project/getAllProject?search=${searchKey}`, "", header)
}

export const getHomeProject = async () => {
    return await Api("GET", `${baseUrl}/project/getHomeProject`)
}

export const getUsersProject = async (header) => {
    return await Api("GET", `${baseUrl}/project/getUsersProject`, "", header)
}

export const EditprojectApi = async (project_id, reqbody, header) => {
    return Api("PUT", `${baseUrl}/project/edit/${project_id}`, reqbody, header)
}

export const deleteApi = async (project_id, header) => {
    return await Api("DELETE", `${baseUrl}/project/delete/${project_id}`, {}, header)
}

export const editProfileApi = async (body, header) => {
    return await Api("PUT", `${baseUrl}/user/edit`, body, header)
}

