import  React from 'react';
import PropTypes from 'prop-types';

const Account = ({title,amount,description}) => {
    return (

        <section class="account">
        <div class="account-content-wrapper">
          <h3 class="account-title">{title}</h3>
          <p class="account-amount">{amount}</p>
          <p class="account-amount-description">{description}</p>
        </div>
        <div class="account-content-wrapper cta">
          <button class="transaction-button">View transactions</button>
        </div>
        </section>
    );
};

Account.PropTypes = {
    title: PropTypes.string.isRequired,
    amount: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
};

export default Account;