import React, {useState} from 'react';
import './MovieRow.css';


export default ({title, items}) => {
    const [scrollX, setScrollX] = useState(0);
    const handleLeftArrow = () => {
        let x = scrollX + Math.round(window.innerWidth/2);
        if(x>0){
            x=0;
        }
        setScrollX(x)
    }

    

    const handleRightArrow = () => {
        let x = scrollX - Math.round(window.innerWidth/2)
        let listL = items.results.length * 150;
        if((window.innerWidth - listL) > x){
            x = (window.innerWidth - listL) - 60;
        }
        setScrollX(x)

    }

    return(
        <div className="movieRow">
            <h2>{title}</h2>
            <div className="movieRow--Left" onClick={handleLeftArrow}>
                B
            </div>
            <div className="movieRow--right" onClick={handleRightArrow}>
                B
            </div>
            <div className="movieRow--listarea">
                <div className="movieRow--list"style={{
                    marginLeft: scrollX,
                    width: items.results.length * 150
                }}>
                    
                    {items.results.length > 0 && items.results.map((item, key) => (
                        <div key={key} className="movieRow--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
