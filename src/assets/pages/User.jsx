import React from 'react';
import Account from '../components/Account';
import { useState, useEffect } from 'react';
import Header from '../components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, userUpdate, userLogout } from '../../redux/reducers/UserSlices';
import { useNavigate } from 'react-router-dom';

const User = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector((state) => state.user);

    // Get the name from the local storage or set a default value

    const [name, setName] = useState(() => {
        const saveName = localStorage.getItem('userName');
        return userInfo?.userName || saveName || 'Tony Stark';
    });

    const [onEdit, setOnEdit] = useState(false);
    const [newName, setNewName] = useState(name);
    // Save the name in the local storage

    useEffect(() => {
        if (!userInfo) {
            dispatch(getUserInfo());
        }
    }, [dispatch, userInfo]);

    // Handle the edit of the name
    useEffect(() => {
        localStorage.setItem('userName', name);
    }
        , [name]);

    // Handle the submit of the form
    const handleSubmitForm = (e) => {
        e.preventDefault();
        setName(newName);
        setOnEdit(false);

    dispatch(userUpdate({ userName: name }))
        .unwrap()
        .then(() => {
            console.log('Updated');
        })
        .catch((error) => {
            console.error('Failed to update', error);
        }
        );
};


// Handle the change of the input
const handleEditChange = (e) => {
    setNewName(e.target.value);
};

// Cancel the edit
const handleCancel = () => {
    setOnEdit(false);
    setNewName(name);
};

// Handle the edit
const firstName = name?.split(' ')[0] || 'Tony';

// Handle the logout
const handleLogout = () => {
    dispatch(userLogout());
    navigate('/login');
};

return (
    <>
        <Header firstName={firstName} handleLogout={handleLogout} />
        <main className="main bg-dark">
            <div className="header">
                {onEdit ? (
                    <form onSubmit={handleSubmitForm}>
                        <div className="form-grp">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={newName}
                                onChange={handleEditChange}
                            />
                        </div>
                        <button type="submit" className='save-btn'>Save</button>
                        <button type="button" onClick={handleCancel} className='cancel-btn'>Cancel</button>
                    </form>
                ) : (
                    <>
                        <h1>Welcome back<br />{name} !</h1>
                        <button onClick={() => setOnEdit(true)} className='edit-btn'>Edit</button>
                    </>
                )}
            </div>
            <h2 className="sr-only">Accounts</h2>
            <Account

                title="Argent Bank Checking (x8349)"
                amount="$2,082.79"
                description="Available Balance"
            />
            <Account

                title="Argent Bank Savings (x6712)"
                amount="$10,928.42"
                description="Available Balance"
            />
            <Account

                title="Argent Bank Credit Card (x8349)"
                amount="$184.30"
                description="Current Balance"
            />
        </main >
    </>
);
};


export default User;