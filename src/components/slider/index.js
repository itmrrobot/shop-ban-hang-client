import './Slider.css';
import './SliderResponsive.css';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { url } from '../../constants';

function Slider() {
    const [data,setData] = useState([]);
    const [currentSlide,setCurrentSlide] = useState(0); 
    const [loading,setLoading] = useState(false);
    let newData = data.filter((item) => {
        return item.images[0]!=="";
    });
    let slideInterval;
    useEffect(() => {
        const controller = new AbortController();
        try{
            axios.get(url+'/products?offset=1&limit=5',{
                signal: controller.signal
            })
            .then((respone) => {
                setData(respone.data);
                setLoading(true);
            })
            .catch((err) => {
                if(axios.isCancel(err)) {
                    console.log('caught cancel');
                }else {
                    throw err;
                }
            })
        }catch(err) {
            console.log(">>err: "+err);
        }
        
        return () => {
            controller.abort();
        }
    },[]);

    useEffect(() => {
        setCurrentSlide(0);
    },[])

    useEffect(() => {
        auto();
        return () => {
            clearInterval(slideInterval);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[currentSlide])

    const preBtn = () => {
        setCurrentSlide(currentSlide===0 ? data.length-1:currentSlide-1);
    }

    const nextBtn = () => {
        setCurrentSlide(currentSlide===data.length-1 ? 0:currentSlide+1);
    }

    const auto = () => {
        slideInterval=setInterval(nextBtn,5000);
    }

    return(
        loading===true?<div className='slider'>
            <div className='arrow-pre hide' onClick={preBtn}>
                <svg className='arrow-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill='#fff' d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"/></svg>
            </div>
            {newData.map((item,index) => (
                index===currentSlide && <div className='slide-current' key={index}>
                    <h3 className='slider-title'>{item.title}</h3>
                    <img src={item.images[0]} alt='' className='slider-img'/>
                    <span className='slider-desc'>{item.description}</span>
                </div>
            ))}
            <div className='arrow-next hide' onClick={nextBtn}>
                <svg className='arrow-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill='#fff' d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
            </div>
        </div>:<div className='loader'></div>
    )
}

export default Slider;