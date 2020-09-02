export const BASE_URL = "http://localhost:5000/wayfinder-api";
export const IMG_URL = "http://localhost:5000";
// sessionStorage.setItem("user_id", 29);

const USER_ID = sessionStorage.getItem("user_id");
const MALL_ID = sessionStorage.getItem("mall_id");

export default {
  /* LOGIN RELATED APIs */
  FORGOT_PASSWORD: `${BASE_URL}/login/forget-password`,
  GET_LOGIN: `${BASE_URL}/login/get-login`,

  /* USER RELATED APIs */
  GET_ALL_USERS: `${BASE_URL}/users/get-all-users/${USER_ID}`,
  GET_USER_BY_USER_ID: `${BASE_URL}/users/get-user-by-userid`,
  GET_USERS_BY_MALL: `${BASE_URL}/malls/get-malls`,
  POST_USER: `${BASE_URL}/users/add-user`,
  CHANGE_PASSWORD: `${BASE_URL}/users/change-password`,
  UPDATE_USER_STATUS_BY_ID: `${BASE_URL}/users/update-user-status-by-id`,
  UPDATE_USER: `${BASE_URL}/users/update-user`,

  /* ROLES RELATED APIs */
  GET_ALL_ROLES: `${BASE_URL}/roles/get-all-roles/${USER_ID}`,
  GET_ROLE_BY_ID: `${BASE_URL}/roles/get-role-by-id`,
  POST_ROLE: `${BASE_URL}/roles/add-role`,
  UPDATE_ROLE_STATUS: `${BASE_URL}/roles/update-role-status-by-id`,
  UPDATE_ROLE: `${BASE_URL}/roles/update-role`,

  /* MALLS RELATED APIs */
  GET_MALLS_BY_ID: `${BASE_URL}/malls/get-malls-by-id`,
  GET_ALL_MALLS: `${BASE_URL}/malls/get-malls`,
  POST_MALL: `${BASE_URL}/malls/add-mall`,
  UPDATE_MALL_STATUS: `${BASE_URL}/malls/update-mall-status`,
  UPDATE_MALL_LOGO: `${BASE_URL}/malls/update-mall-logo`,

  /* FLOOR RELATED APIs */
  GET_FLOORS: `${BASE_URL}/floors/get-floor/${USER_ID}`,
  GET_FLOOR_BY_ID: `${BASE_URL}/floors/get-floor-by-id`,
  GET_FLOOR_BY_MALL: `${BASE_URL}/floors/get-floor-by-mall-id`,
  POST_FLOOR: `${BASE_URL}/floors/add-floor`,
  UPDATE_FLOOR_BY_ID: `${BASE_URL}/floors/update-floor-by-id`,
  UPDATE_FLOOR_STATUS_BY_ID: `${BASE_URL}/floors/update-floor-status-by-id`,
  UPDATE_FLOOR_IMAGES: `${BASE_URL}/floors/update-floor-image`,

  /* CATEGORY RELATED APIs */
  GET_ALL_CATEGORIES: `${BASE_URL}/category/get-all-categories`,
  GET_CATEGORY_BY_ID: `${BASE_URL}/category/get-category-by-id`,
  POST_CATEGORY: `${BASE_URL}/category/add-category`,
  UPDATE_CATEGORY: `${BASE_URL}/category/update-category`,
  UPDATE_CATEGORY_STATUS: `${BASE_URL}/category/update-category-status`,

  /* STORE RELATED APIs */
  GET_ALL_STORES: `${BASE_URL}/stores/get-all-stores/${USER_ID}`,
  GET_STORE_BY_STORE_ID: `${BASE_URL}/stores/get-store-by-store-id`,
  GET_STORE_BY_FLOOR_ID: `${BASE_URL}/stores/get-store-by-floor-id`,
  GET_ALL_EMPTY_STORES: `${BASE_URL}/stores/get-all-empty-stores`,
  POST_STORES: `${BASE_URL}/stores/add-store`,
  UPDATE_STORE_STATUS: `${BASE_URL}/stores/update-store-status`,
  UPDATE_STORE_PATH: `${BASE_URL}/stores/update-store-path`,
  GET_STORE: `${BASE_URL}/stores/get-stores`,

  /* BANNER RELATED APIs */

  GET_ALL_BANNERS: `${BASE_URL}/banners/get-all-banners/${USER_ID}`,
  GET_BANNERS_BY_ID: `${BASE_URL}/banners/get-banners-by-id`,
  GET_BANNERS_BY_MALL_ID: `${BASE_URL}/banners/get-banners-by-mall-id`,
  UPDATE_BANNERS: `${BASE_URL}/banners/update-banner`,
  POST_BANNER: `${BASE_URL}/banners/add-banner`,
  DELETE_BANNERS: `${BASE_URL}/banners/delete-banner`,
  UPDATE_BANNER_IMAGE: `${BASE_URL}/banners/update-banner-image`,

  /* MAIN-CARD RELATED APIs */
  GET_ALL_MAIN_CARDS: `${BASE_URL}/main-cards/get-all-main-cards/${USER_ID}`,
  GET_MAIN_CARDS_BY_CARD_ID: `${BASE_URL}/main-cards/get-main-cards-by-card-id`,
  GET_MAIN_CARDS_BY_MALL_ID: `${BASE_URL}/main-cards/get-main-cards-by-mall-id`,
  UPDATE_MALL_MAIN_CARDS: `${BASE_URL}/main-cards/update-mall-main-card`,
  POST_MAIN_CARDS: `${BASE_URL}/main-cards/add-main-card`,
  DELETE_MAIN_CARDS: `${BASE_URL}/main-cards/main-card-delete`,
  CHANGE_MAIN_CARDS_IMAGE: `${BASE_URL}/main-cards/change-main-card-image`,

  /* EVENTS RELATED APIs */

  GET_ALL_EVENTS: `${BASE_URL}/events/get-all-events/${USER_ID}`,
  GET_EVENTS_BY_ID: `${BASE_URL}/events/get-events-by-id`,
  GET_EVENTS_BY_MALL_ID: `${BASE_URL}/events/get-events-by-mall-id`,
  UPDATE_EVENTS: `${BASE_URL}/events/update-event`,
  POST_EVENTS: `${BASE_URL}/events/add-event`,
  DELETE_EVENTS: `${BASE_URL}/events/delete-events`,
  DELETE_EVENT_IMAGE: `${BASE_URL}/events/delete-event-image`,
  ADD_IMAGE_TO_EVENT: `${BASE_URL}/events/add-image-to-event`,
  UPDATE_EVENT_COVER_IMAGE: `${BASE_URL}/events/update-event-cover-image`,

  /* MALL-INFO RELATED APIs */
  GET_ALL_MALL_INFO: `${BASE_URL}/mall-info/get-all-mall-info/${USER_ID}`,
  GET_MALL_INFO_BY_ID: `${BASE_URL}/mall-info/get-mall-info-by-id`,
  GET_MALL_INFO_BY_MALL_ID: `${BASE_URL}/mall-info/get-mall-info-by-mall-id`,
  POST_MALL_INFO: `${BASE_URL}/mall-info/add-mall-info`,
  DELETE_MALL_INFO: `${BASE_URL}/mall-info/delete-mall-info`,
  UPDATE_MALL_INFO: `${BASE_URL}/mall-info/update-mall-info`,

  /* OFFERS RELATED APIs */
  GET_ALL_OFFERS: `${BASE_URL}/offers/get-all-offers/${USER_ID}`,
  GET_OFFERS_BY_ID: `${BASE_URL}/offers/get-offers-by-id`,
  GET_OFFERS_BY_SHOP_ID: `${BASE_URL}/offers/get-offers-by-shop-id`,
  UPDATE_OFFERS_VALIDITY: `${BASE_URL}/offers/updateOfferValidity`,
  POST_OFFERS: `${BASE_URL}/offers/add-offers`,
  UPDATE_OFFERS_STATUS: `${BASE_URL}/offers/update-offer-status`,
  UPDATE_OFFERS_IMAGE: `${BASE_URL}/offers/update-offer-image`,
  UPDATE_OFFERS_DATA: `${BASE_URL}/offers/update-offer-data`,

  /* SHOPS RELATED APIs */
  GET_ALL_SHOPS: `${BASE_URL}/shops/get-all-shops/${USER_ID}`,
  GET_ALL_CATEGORIES_BY_SHOP_ID: `${BASE_URL}/shops/get-all-categories-by-shop-id`,
  GET_ALL_SHOPS_BY_SHOP_ID: `${BASE_URL}/shops/get-shops-by-shop-id`,
  GET_ALL_STORES_BY_SHOP_ID: `${BASE_URL}/shops/get-all-stores-by-shop-id`,
  UPDATE_SHOP: `${BASE_URL}/shops/update-shop`,
  POST_SHOPS: `${BASE_URL}/shops/add-shop`,
  UPDATE_SHOP_LOGO: `${BASE_URL}/shops/update-shop-logo`,
  UPDATE_SHOPS_IMAGE: `${BASE_URL}/shops/update-shop-image`,
  UPDATE_SHOPS_STATUS: `${BASE_URL}/shops/update-shop-status`,
  GET_SHOPS: `${BASE_URL}/shops/get-shops`,

  /* screens related APIs */
  POST_SCREENS: `${BASE_URL}/screen/add-screen`,
  GET_ALL_SCREENS: `${BASE_URL}/screen/get-all-screens/${USER_ID}`,
  GET_SCREEN_BY_MALL_ID: `${BASE_URL}/screen/get-screen-by-mall`,
  GET_SCREEN_BY_SCREEN_ID: `${BASE_URL}/screen/get-screen-by-screen-id`,
  UPDATE_SCREEN_STATUS: `${BASE_URL}/screen/update-screen-status`,

  /* Floor Amenity related APIs */

  GET_ALL_AMENITY: `${BASE_URL}/amenities/get-all-amenities-data/${USER_ID}`,
  GET_AMENITY_BY_ID: `${BASE_URL}/amenities/get-amenities-by-id`,
  GET_AMENITY_BY_MALL_ID: `${BASE_URL}/amenities/get-amenities-by-mall-id`,
  GET_AMENITY_BY_TYPE: `${BASE_URL}/amenities/get-amenities-by-type`,
  GET_AMENITY_NUMBER: `${BASE_URL}/amenities/get-amenities`,
  POST_AMENITY: `${BASE_URL}/amenities/add-amenities`,
  UPDATE_AMENITY_STATUS: `${BASE_URL}/amenities/update-amenities-status`,
  UPDATE_AMENITY: `${BASE_URL}/amenities/update-amenities`,



};