import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundery from "../errorBoundery/ErrorBoundery";



const ComicsPage = () => {
    return(
        <ErrorBoundery>
            <AppBanner/>
            <ComicsList/>
        </ErrorBoundery>
    )
}

export default ComicsPage;