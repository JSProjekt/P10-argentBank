import React from 'react';
import Account from '../components/Account';
import { useState, useEffect } from 'react';
import Header from '../components/Header';

const User = () => {
    // Get the name from the local storage
    const [name, setName] = useState(() => {
        return localStorage.getItem('userName') || 'Tony Jarvis';
      });
      const [onEdit, setOnEdit] = useState(false);
      const [newName, setNewName] = useState(name);
        // Save the name in the local storage
        useEffect(() => {
            localStorage.setItem('userName', newName);
        }, [newName]);
        // Handle the edit of the name
        const handleEdit = () => {
            setOnEdit(true);
        };
        // Handle the submit of the form
        const handleSubmitForm = (e) => {
            e.preventDefault();
            setName(newName);
            setOnEdit(false);
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
        // Split the name to get the first name
        const firstName = name.split(' ')[0];
            
    return (
        <>
            <Header firstName={firstName} />
            <main class="main bg-dark">
                <div class="header">
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
                        <button onClick={handleEdit} className='edit-btn'>Edit Name</button>
                        </>
                    )}
                </div>
                <h2 class="sr-only">Accounts</h2>
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