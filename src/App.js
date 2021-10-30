import React, {useEffect, useState} from 'react';
import './App.css';
import Tmdb from './Tmdb';
import MovieRow from './components/MovieRow';
import FeaturedMovie from './components/FeaturedMovie';
import Header from './components/Header';



export default () => {  
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false)
  useEffect(() =>{
    const loadAll = async () =>{
      //Pegando a lista total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      // Pegando filme em destaque
      let originals = list.filter(i => i.slug ==='originals');
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1))
      let chosen = originals[0].items.results[randomChosen]
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, 'tv');
      setFeaturedData(chosenInfo)
    }
    loadAll();
  }, []);

  useEffect(() => {
      const scrollListener = () =>{
        if(window.scrollY>50){
          setBlackHeader(true);
        }else{
          setBlackHeader(false)
        }
      }
      window.addEventListener('scroll', scrollListener);
      return () =>{
        window.removeEventListener('scroll', scrollListener);
      }
  }, [])


  return(
    <div className="page">
      <Header black={blackHeader}/>
      {featuredData &&
      <FeaturedMovie item = {featuredData} />
      }
      <section className="lists">
        {movieList.map((item, key) =>(
        <MovieRow key={key} title={item.title} items={item.items}/>
        
        ))}
      </section>
      <footer>
          <p>

            Direitos de imagem para Netflix<br/>
            Dados de <a href="https://www.themoviedb.org/?language=pt-BR">The Movie Database</a>    
          </p>
                <p>
                  Minhas redes:<br/>    
                  <a href="https://www.linkedin.com/in/juan-soares-881877177/" target="blank">LinkedIn</a>|
                  <a href="https://www.youtube.com/channel/UCO_mBpadEe467FAJjNQWD1g" target="blank">YouTube</a>
                </p>
      </footer>
      {movieList.length <= 0 &&
      <div className="loading">
          <img src="https://i.gifer.com/origin/36/36527397c208b977fa3ef21f68c0f7b2.gif" alt="carregando" />
      </div>
      }
    </div>
  )
}