import { fireEvent, render } from "@testing-library/react";
import Header from "../Header";
import { Provider } from "react-redux";
import Appstore from "../../../utils/Appstore";
import { BrowserRouter } from "react-router-dom";

it("should render header component", () => {
    const { getByText } = render(
    <BrowserRouter>
        <Provider store={Appstore}>
             <Header />
        </Provider>
    </BrowserRouter>
    );
    
    const login = getByText("login");
    fireEvent.click(login);
    const logout = getByText("logout");
    expect(logout).toBeInTheDocument();
})