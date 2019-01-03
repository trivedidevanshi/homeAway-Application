import { gql } from 'apollo-boost';

//import gql from 'graphql-tag';travelerLogin

const loginQuery = gql`
query userLogin($email: String, $password:String){
    userLogin(email: $email, password: $password){
        email
    }
}`

const travelerLoginQuery = gql`
query travelerLoginQuery($email: String, $password:String){
    travelerLogin(email: $email, password: $password){
        email
    }
}`

const searchResultQuery = gql`
query searchResultQuery($email: String){
    searchResultQuery(email: $email){
        properties{
            propname 
            propdescription 
            proptype 
            bedroom 
            accomodates 
            bathrooms 
            propPhotos 
            country 
            address  
            city  
            state  
            zipcode  
            availablestart  
            availableend  
            pricepernight  
            bookeddates{
                traveleremail 
                bookdatestart 
                bookdateend 
            }
             
        }
    }
}`

const getUserProfileQuery = gql`
query getUserProfileQuery($email: String){
    getUserProfileQuery(email: $email){
        email,
        firstName,
        lastName,
        aboutme,
        city,
        country,
        company,
        school,
        hometown,
        languages,
        gender,
        phonenumber,
        profileimage

    }
}`

const getPropertyDashboardQuery = gql`
query getPropertyDashboardQuery($email: String){
    getPropertyDashboardQuery(email: $email){
        email,
        properties{
            
            propname 
            propdescription 
            proptype 
            bedroom 
            accomodates 
            bathrooms 
            propPhotos 
            country 
            address  
            city  
            state  
            zipcode  
            availablestart  
            availableend  
            pricepernight  
            bookeddates{
                traveleremail 
                bookdatestart 
                bookdateend 
            }
        }
    }
}`

const myTripQuery = gql`
query myTripQuery($email: String){
    myTripQuery(email: $email){
        email,
        travelerbooking{
            propname 
            propdescription 
            proptype 
            bedroom 
            accomodates 
            bathrooms 
            propPhotos 
            country 
            address  
            city  
            state  
            zipcode  
            availablestart  
            availableend  
            bookdatestart 
        bookdateend 
            pricepernight  
            bookeddates{
                traveleremail 
                bookdatestart 
                bookdateend 
            }
        }
    }
}`

export { myTripQuery, loginQuery, travelerLoginQuery, getUserProfileQuery, getPropertyDashboardQuery, searchResultQuery }