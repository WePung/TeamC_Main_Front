import React from 'react';
import videoList from '../../utils/VideoDummyData';
import {Link} from 'react-router-dom';
import { Image, List } from 'antd';

const PromotionVideoItem = () => {
    return (
        <List
        itemLayout="horizontal"
        dataSource={videoList}
        renderItem={(item) => (
          <List.Item>
            <Image preview={false} width={277} height={122} src={item.src} />
            <List.Item.Meta
              title={<Link to={`/promotion/videos/${item.videoId}`}>{item.videoTitle}</Link>}
              description={item.videoContent}
            />
          </List.Item>
        )}
      />
    );
};

export default PromotionVideoItem;