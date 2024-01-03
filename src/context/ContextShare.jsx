import React, { createContext, useState } from 'react'
export const addProjectResponseContextShare = createContext()
export const editProjectResponseContextShare = createContext()
export const isAuthTokenContextShare = createContext()

const ContextShare = ({ children }) => {
    const [addProjectResponse, setAddProjectResponse] = useState({})
    const [editProjectResponse, seteditProjectResponse] = useState({})
    const [isAuthToken, setisAuthToken] = useState(true)

    return (

        <addProjectResponseContextShare.Provider value={{ addProjectResponse, setAddProjectResponse }}>
            <editProjectResponseContextShare.Provider value={{ editProjectResponse, seteditProjectResponse }}>
                <isAuthTokenContextShare.Provider value={{isAuthToken, setisAuthToken}}>
                    {children}
                </isAuthTokenContextShare.Provider>

            </editProjectResponseContextShare.Provider>

        </addProjectResponseContextShare.Provider>
    )
}

export default ContextShare