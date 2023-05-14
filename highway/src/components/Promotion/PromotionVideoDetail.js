import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import videoList from "../../utils/VideoDummyData"
import { Image } from 'antd';

const PromotionVideoDetail = () => {

    const location = useLocation();
    // video테이블이 없기에 임시방편으로 세워둠
    const text = window.location.href;
    const url = parseInt(text.replace("http://localhost:3000/promotion/videos/",""));
    console.log(url)
    const test = videoList.map((it)=>{
        if(it.videoId === url){
        return(
            <div key={it.videoId}>
                <div><video width={753} height={424} preview={false} src={it.src}/></div>
                <div>{it.videoTitle}</div>
                <div>{it.videoContent}</div>
            </div>
        )
        }
    })
    return (
        <div>
            {test}
            <div>
                <Link to={`http://localhost:3000/promotion/videos/${url-1}`}><button>이전</button></Link>
                <Link to={`http://localhost:3000/promotion/videos/`}><button>목록으로</button></Link>
                <Link to={`http://localhost:3000/promotion/videos/${url+1}`}><button>다음</button></Link>
            </div>
        </div>
    );
};

export default PromotionVideoDetail;