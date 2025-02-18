import CalendarPage from "@/pages/calendar/CalendarPage";
import LoginPage from "@/pages/login/LoginPage";

import { AuthorizationService } from "../services/auth/authorization.service";
import { createBrowserRouter, redirect } from "react-router-dom";
import RegisterPage from "@/pages/register/RegisterPage";

export enum Routes {
    Root = '/',
    Home = '/',
    Login = '/login',
    Register = '/register',
    Calendar = '/calendar'
}

export const router = createBrowserRouter([
    {
        path: Routes.Root,
        element: <CalendarPage />,
        loader: async () => {
            const auth = AuthorizationService.safeGetAuthorization();
            if (auth) return true;
            else throw redirect(Routes.Login);
        }
    },
    {
        path: Routes.Calendar,
        element: <CalendarPage />,
        loader: async () => {
            const auth = AuthorizationService.safeGetAuthorization();
            if (auth) return true;
            else throw redirect(Routes.Login);
        }
    },
    {
        path: Routes.Login,
        element: <LoginPage />
    },
    {
        path: Routes.Register,
        element: <RegisterPage />
    }
])