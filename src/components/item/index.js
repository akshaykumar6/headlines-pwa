import { h } from 'preact';
import style from './style';

const Item = (props) => {
  // console.log('props ::',props);
  let data = props.data;
  let itemStyle = {
    'background-image': `url(${data.urlToImage})`
  }
  return(
	<a className={style.newsItem} href={data.url} target="_blank" style={itemStyle}>
    {/* <img src={data.urlToImage} class={style.newsImg} /> */}
    <div class={style.newsContent}>
      <span class={style.newsTitle}>{data.title}</span>
      {/* <p>{data.description}</p> */}
    </div>
  </a>
  );
};

export default Item;