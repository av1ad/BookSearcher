import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/Header";

export default function GenrePage() {

    // Shows a list of books with that genre that is selected, allows you to click on the book and redirects you to the book id 
    // We'll also use the search method for these so when they click on a subject/genre it redirects to the genre id
        // Extra feature would being able to search with specific genre
    return (
        <div>
            <Header />
            <h1>Genre</h1>
            <Footer />
        </div>
    )
    
}