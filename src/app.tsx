import { BaseStyles, themeGet } from "@primer/react";
import { useHotkeys } from "react-hotkeys-hook";
import { createGlobalStyle } from "styled-components";
import { useGlobalState } from "./global-state";
import { Index } from "./pages";
import { Curve } from "./pages/curve";
import { NotFound } from "./pages/not-found";
import { Palette } from "./pages/palette";
import { Scale } from "./pages/scale";
import {
    BrowserRouter,
    Outlet,
    Route,
    RouterProvider,
    Routes,
    createBrowserRouter,
} from "react-router-dom";

const GlobalStyles = createGlobalStyle`
  body {
    background-color: ${themeGet("colors.canvas.default")};
  }
`;

export const App = (): React.ReactElement => <RouterProvider router={router} />;

const Root = (): React.ReactElement => {
    const [, send] = useGlobalState();

    useHotkeys("command+z, ctrl+z", () => send("UNDO"));
    useHotkeys("command+shift+z, ctrl+shift+z", () => send("REDO"));

    return (
        <BaseStyles>
            <GlobalStyles />
            <Outlet />
        </BaseStyles>
    );
};

const router = createBrowserRouter([
    { path: "*", element: <NotFound /> },
    {
        path: "/",
        element: <Root />,
        children: [
            { index: true, element: <Index /> },
            {
                path: "/local/:paletteId",
                element: <Palette />,
                children: [
                    { path: "scale/:scaleId", element: <Scale /> },
                    { path: "curve/:curveId", element: <Curve /> },
                ],
            },
        ],
    },
]);
