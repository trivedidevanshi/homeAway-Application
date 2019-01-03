import { gql } from 'apollo-boost';

const addTravelerMutation = gql`
    mutation AddTraveler($firstName: String, $lastName: String, $email: String, $password: String){
        addTraveler(firstName: $firstName, lastName: $lastName, email: $email, password: $password){
            email
        }
    }
`;
const addOwnerMutation = gql`
    mutation AddOwner($firstName: String, $lastName: String, $email: String, $password: String){
        addOwner(firstName: $firstName, lastName: $lastName, email: $email, password: $password){
            email
        }
    }
`;

const postUserProfileMutation = gql`
mutation postUserProfileMutation($firstName: String, $lastName: String, $aboutme: String,
    $city: String,$country: String, $company: String, $school: String, $hometown: String,
    $languages: String,
    $gender: String,
    $phonenumber: String,
    $oort: String, 
    $email: String){
    postUserProfileMutation(
        firstName: $firstName, 
        lastName: $lastName,
        aboutme: $aboutme,
        city: $city,
        country: $country,
        company: $company,
        school: $school,
        hometown: $hometown,
        languages: $languages,
        gender: $gender,
        phonenumber: $phonenumber,
        oort: $oort, 
        email: $email
        ){
        email
    }
}
`;
const mainPageMutation = gql`
mutation mainPageMutation( $city: String, $availablestart: String, $availableend: String, $accomodates: String){
    mainPageMutation( city: $city, availablestart: $availablestart, availableend: $availableend,accomodates: $accomodates){
        city
    }
}
`;

const handleBookingMutation =gql`
mutation handleBookingMutation( $email: String,$propname: String){
    handleBookingMutation( email: $email, propname: $propname){
        email
    }
}
`;

export { addTravelerMutation, addOwnerMutation, postUserProfileMutation, mainPageMutation, handleBookingMutation };