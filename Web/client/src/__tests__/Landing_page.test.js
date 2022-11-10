import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import LandingPage from "../Pages/UserInitialization/Landing_page";

test('Checking landing page components', () => {
    render(<BrowserRouter><LandingPage/></BrowserRouter>);
    const hero_img = screen.getByRole('hero_image')
    const showcase = screen.getByRole('showcase')

    expect(hero_img).toBeInTheDocument();
    expect(showcase).toBeInTheDocument();
})