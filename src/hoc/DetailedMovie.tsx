import { useState, useEffect, FC } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase.config';
import { doc, onSnapshot } from 'firebase/firestore';
import { useUserAuth } from '../contexts/AuthContext';
import { useRecoilState } from 'recoil';
import { movieState } from '../atoms/movieAtom';
import { MovieInfoProps } from '../interfaces/movie';
import { getMovieDetailedInfo, getMovieReviewsById } from '../services/api';

function DetailedMovie(MovieComponent: FC) {
    function WrappedComponent(props: any) {
        const { user } = useUserAuth();
        const { movieId } = useParams();
        const [movie, setMovie] = useRecoilState(movieState);
        const [isLiked, setIsLiked] = useState(false);
        const [isAddedToWatchlist, setIsAddedToWatchlist] = useState(false);
        const [isAddedToMyList, setIsAddedToMyList] = useState(false);
        const [savedMovies, setSavedMovies] = useState<MovieInfoProps[]>([]);
        const [isLoading, setIsLoading] = useState(false);

        useEffect(() => {
            if (movie.info?.id.toString() === movieId) return;
            setIsLoading(true);

            async function fetchMovieDetailedInfo(): Promise<void> {
                try {
                    const [movieInfo, movieVideos] = await getMovieDetailedInfo(
                        movieId!
                    );
                    const movieReviewsResult = await getMovieReviewsById(
                        movieId!
                    );

                    const index = movieVideos.results.findIndex(
                        (element: any) => element.type === 'Trailer'
                    );
                    setMovie((state) => ({
                        ...state,
                        movieInfo,
                        movieVideos: movieVideos.results[index],
                        movieReviews: movieReviewsResult.results,
                    }));

                    setIsLoading(false);
                } catch (error: any) {
                    // setNotify((state) => ({
                    //     ...state,
                    //     show: true,
                    //     msg: error.message,
                    // }));
                    console.log(error);
                }
            }

            fetchMovieDetailedInfo();
        }, [movieId, setMovie, movie.info?.id]);

        useEffect(() => {
            onSnapshot(doc(db, 'users', `${user?.email}`), (doc) => {
                const liked: boolean = doc
                    .data()
                    ?.savedShows.find((x: any) => x.id === movie.info?.id);
                setSavedMovies(doc.data()?.savedShows);

                const isInMyWatchlist: boolean = doc
                    .data()
                    ?.watchList.find((x: any) => x.id === movie.info?.id);
                const isInMyList: boolean = doc
                    .data()
                    ?.myList.find((x: any) => x.id === movie.info?.id);

                if (liked) {
                    setIsLiked(true);
                } else {
                    setIsLiked(false);
                }

                if (isInMyWatchlist) {
                    setIsAddedToWatchlist(true);
                } else {
                    setIsAddedToWatchlist(false);
                }

                if (isInMyList) {
                    setIsAddedToMyList(true);
                } else {
                    setIsAddedToMyList(false);
                }
            });
        }, [user, movie]);

        return (
            <MovieComponent
                {...props}
                isLiked={isLiked}
                isAddedToWatchlist={isAddedToWatchlist}
                isAddedToMyList={isAddedToMyList}
                savedMovies={savedMovies}
                isLoading={isLoading}
                movie={movie}
            />
        );
    }

    return WrappedComponent;
}

export default DetailedMovie;
