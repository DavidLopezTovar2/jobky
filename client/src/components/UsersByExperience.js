import React, { useEffect, useState } from 'react';
import UsersTable from './UsersTable';
import { findUsersWithExperience } from '../services/user.service';

const UserByExperience = ({ experience }) => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsersFromService();
    }, []);
    

    const getUsersFromService = async() => {
        try{
            const usersFromService = await findUsersWithExperience(experience);
            setUsers(usersFromService.data.users);
        }catch(err){
            alert(err);
        }
    }

    return(
        <>
            <UsersTable users={users} props='joboffer'/>
        </>
    )
}

export default UserByExperience;