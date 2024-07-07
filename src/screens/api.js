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
export const POLICE_DETAILS = (id, latitude, longitude) => `${BASE_URL}/listing-type/${id}/${latitude}/${longitude}`;
export const PREFERRED_HOSPITAL = `${BASE_URL}/get-preferred-hospital`;
export const LOGOUT = `${BASE_URL}/logout`;
export const UPDATE_PROFILE = `${BASE_URL}/update-profile`;
export const GET_FIRSTAID_CATEGORY = `${BASE_URL}/get-firstaid-category`;
export const GET_FIRSTAID_CATEGORY_BYID = (id) => `${BASE_URL}/get-firstaid-category/${id}`;
