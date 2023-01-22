import { useState, useEffect, useRef } from 'react';
import './comicsList.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/spinner';
import ErrorMessage from '../errorMessage/errorMessage';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);


    const {loading, error, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []); 

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(onCharListLoaded)
    }


    const onCharListLoaded = (newComicslist) => {
        let ended = false;
        if(newComicslist.length < 8){
            ended = true
        }

        setComicsList(comicsList => [...comicsList, ...newComicslist]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8);
        setComicsEnded(ended);
    }


    const itemRefs = useRef([]);

    
    const focusOnItem = (id) => {
        itemRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemRefs.current[id].classList.add('char__item_selected');
        itemRefs.current[id].focus();
    }
    
    function renderComics(arr) {
        const comics =  arr.map((comic, i) => {
            let imgStyle = {'objectFit' : 'cover'};
            if (comic.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit' : 'unset'};
            }

            return(
                <li className="comics__item" key={i}
                ref={el => itemRefs.current[i] = el}
                onClick={() => {
                    focusOnItem(i);
                }}
                onFocus={() => {
                    focusOnItem(i);
                }}>
                    <Link to={`/comics/${comic.id}`} className="comics__item-link">
                        <img src={comic.thumbnail} alt={comic.title} className="comics__item-img" style={imgStyle}/>
                        <div className="comics__item-name">{comic.title}</div>
                        <div className="comics__item-price">{comic.price}</div>
                    </Link>
                </li>
            )
        });

        return (
            
                <ul className="comics__grid">
                    {comics}
                </ul>
        )
    }


    const comics = renderComics(comicsList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    const content = comics;
    
    return (
        <>
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {content}
            
            <button className="button button__main button__long" 
            disabled={newItemLoading}
            style={{'display': comicsEnded ? 'none' : 'block'}}
            onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
        </>
    )
    
}

export default ComicsList;