import Footer from "../(components)/Footer";
import Header from "../(components)/Header";

export default function AuthorList() {


    return (
        // Returning a list from A-Z
        // Remove all duplicates along with people with no books, also allow some sort of searching system for this as well
        <div>
            <Header />
            <h1>Author List</h1>
            <Footer />
        </div>
    )
    
}