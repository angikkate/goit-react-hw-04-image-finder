import { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Button from './Button';
import api from '../services/api';
import { ThreeDots } from 'react-loader-spinner';

export const App = () => {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [total, setTotal] = useState(0);
  
  useEffect(() => {
    if (query === '') {
      return;
    }

    const fetchImages = async (query, page) => {
      setIsLoading(true);
      try {
        const imagesArray = await api.fetchImages(query, page);

        if (imagesArray.totalHits === 0) {
          return toast.info(`Nothing was found for ${query}`);
        }

        setImages(prevState => [...prevState, ...imagesArray.hits]);
        setTotal(imagesArray.totalHits);

      } catch (error) {
        return toast.error('Server temporarily unavailable. Try again later');
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages(query, page);
  }, [query, page]);

  const onFormSubmit = query => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const clickLoadMore = () => {
    setPage(page => page + 1 );
    setIsLoading(true);
  };

  const totalPage = total / images.length;
  const showButton = totalPage > 1 && total !== images.length;

  return (
    <div className="app">
      <Searchbar onSubmit={onFormSubmit} />
      {images.length !== 0 && (
        <ImageGallery images={images}/>
      )}

      {isLoading && <ThreeDots
        height="80" 
        width="80" 
        radius="9"
        color="#4fa94d" 
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: 'center' }}
      />}
      
      {showButton && !isLoading && <Button onLoadMore={clickLoadMore} />}
      
      <ToastContainer autoClose={2000}/>
    </div>
  );
}

export default App;