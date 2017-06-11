import React from 'react';
import SectionContainer from './SectionContainer.jsx';

class ContactSectionContainer extends SectionContainer {

    getContent(successCallback, errorCallback) {
        this.state.data.getContactInfo(successCallback, errorCallback);
    }

    parseData(data) {

        const contactPersons = data.contactPersons.map((contactPerson, index) => {
            return <p key={index}>Tel {contactPerson.country}: {contactPerson.name} - {contactPerson.phonenumber}</p>
        });

        return <div>
            <h2>Bokning, press, säga hej och allting:</h2>
            <p>Mail: {data.email}</p>
            {contactPersons}
        </div>

    }

}

export default ContactSectionContainer;