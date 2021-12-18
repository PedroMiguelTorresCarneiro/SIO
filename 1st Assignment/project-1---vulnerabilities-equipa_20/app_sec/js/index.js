import BookList from "./pages/BookList.js";
import Home from "./pages/Home.js";
import User from "./pages/User.js";
import Cart from "./pages/Cart.js";
import SqlInjection from "./pages/SqlInjection.js";
import BooksAvailable from "./pages/BooksAvailable.js";


const router = async () => {
    const routes = [
        { path: "/", page: Home },
        { path: "/BookList", page: BookList },
        { path: "/User", page: User },
        { path: "/Cart", page: Cart },
        { path: "/booksavailable", page: BooksAvailable},
        { path: "/Login", page: SqlInjection },
    ];
    
    const potentialMatches = routes.map(route => {
        return {
            route: route,
            isMatch: location.pathname === route.path
        };
    });

    let match = potentialMatches.find(potentialMatch => potentialMatch.isMatch);

    
    if(!match) {
        match = {
            //may want to put a default error page 
            route: routes[0]
        };
    }
    
    const htmlForAll = new match.route.page();
    const JSForAll = new match.route.page();
    
    document.querySelector("#htmlForAll").innerHTML = await htmlForAll.getHtml();
    document.querySelector("#JSForAll").eval = await JSForAll.getJS();

};   

window.addEventListener("popstate", router);

document.addEventListener("DOMContentLoaded", () => {
    router();
});
