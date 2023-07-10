import AuthenticatedLayout from "../layouts/AuthenticatedLayout";
import LoginLayout from "../layouts/LoginLayout";
import Main from "../pages/Main/Main";
import Contacts from "../pages/Contacts/Contacts";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Profile from "../pages/Profile/Profile";
import Questions from "../pages/Questions/Questions";
import NewQuestion from "../pages/NewQuestion/NewQuestion";
import Answer from "../pages/Answer/Answer";
import EditQuestion from "../pages/EditQuestion/EditQuestion";

export const REGISTER_ROUTE = "/register";
export const LOGIN_ROUTE = "/";
export const MAIN_ROUTE = "/";
export const CONTACTS_ROUTE = "/contacts";
export const PROFILE_ROUTE = "/profile";
export const QUESTIONS_ROUTE = "/questions";
export const NEW_QUESTION_ROUTE = `${QUESTIONS_ROUTE}/new`;
export const QUESTION_ROUTE = `${QUESTIONS_ROUTE}/:id`;
export const EDIT_QUESTION_ROUTE = `${QUESTION_ROUTE}/edit`;
export const ANSWER_ROUTE = `${ANSWER_ROUTE}/:id`;

// kol ne prisijnugta
export const loginRoutes = {
  Layout: LoginLayout,
  routes: [
    {
      path: MAIN_ROUTE,
      Component: Main,
    },
    {
      path: LOGIN_ROUTE,
      Component: Login,
    },
    {
      path: REGISTER_ROUTE,
      Component: Register,
    },
    {
      path: QUESTIONS_ROUTE,
      Component: Questions,
    },
  ],
};

// kai prisijungta
export const authenticatedRoutes = {
  Layout: AuthenticatedLayout,
  routes: [
    {
      path: MAIN_ROUTE,
      Component: Main,
    },
    {
      path: CONTACTS_ROUTE,
      Component: Contacts,
    },
    {
      path: PROFILE_ROUTE,
      Component: Profile,
    },
    {
      path: QUESTIONS_ROUTE,
      Component: Questions,
    },
    {
      path: NEW_QUESTION_ROUTE,
      Component: NewQuestion,
    },
    {
      path: QUESTIONS_ROUTE,
      Component: Questions,
    },
    {
      path: EDIT_QUESTION_ROUTE,
      Component: EditQuestion,
    },
    {
      path: ANSWER_ROUTE,
      Component: Answer,
    },
  ],
};

export const topbarNavigationItems = [
  { route: MAIN_ROUTE, title: "NAMUČIAI" },
  { route: QUESTIONS_ROUTE, title: "DISKUSIJOS" },
];
