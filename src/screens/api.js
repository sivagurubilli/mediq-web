const BASE_URL = 'https://dev.lyfguard.litspark.cloud/api';
// const BASE_URL = 'https://lyfguard.litspark.space/api';

export const LOGIN_API = `${BASE_URL}/auth/login`;
export const SEND_OTP = `${BASE_URL}/auth/send-otp`;
export const EMERGENCY_TYPE = `${BASE_URL}/get-emergency-type`;
export const EMERGENCY_BOOK = `${BASE_URL}/emergency/book`;
export const BOOKING_BY_BOOKINGID = (id) => `${BASE_URL}/booking/${id}`;
export const BOOKING_UPDATE = (id) => `${BASE_URL}/get-booking-update/${id}`;
export const CANCEL_BOOKING = `${BASE_URL}/cancel-booking`;
export const GET_LISTING_TYPE = `${BASE_URL}/get-listing-type`;
export const POLICE_DETAILS = `${BASE_URL}/listing-type/1`;
export const PREFERRED_HOSPITAL = `${BASE_URL}/get-preferred-hospital`;
// export const BOOKING_BY_BOOKINGID= `${BASE_URL}/booking/LYF-D0KSFU0TXC1FOEXR2OO0`;
