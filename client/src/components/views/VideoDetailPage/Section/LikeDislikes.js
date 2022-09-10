import React, { useEffect, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import Axios from 'axios';
function LikeDislikes(props) {
  let variable = {};

  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);

  const [LikeAction, setLikeAction] = useState(null);
  const [DislikeAction, setDislikeAction] = useState(null);

  if (props.videoId) {
    variable = { videoId: props.videoId, userId: props.userId };
  } else {
    variable = { commentId: props.commentId, userId: props.userId };
  }

  useEffect(() => {
    Axios.post('/api/like/getLike', variable).then((response) => {
      if (response.data.success) {
        setLikes(response.data.likes.length);
        response.data.likes.map((like) => {
          if (like.userId === props.userId) {
            setLikeAction('liked');
          }
        });
      } else {
        alert('Likes 정보를 가져오는데 실패했습니다.');
      }
    });

    Axios.post('/api/like/getDislike', variable).then((response) => {
      if (response.data.success) {
        setLikes(response.data.dislikes.length);
        response.data.likes.map((dislike) => {
          if (dislike.userId === props.userId) {
            setDislikeAction('disliked');
          }
        });
      } else {
        alert('Dislikes 정보를 가져오는데 실패했습니다.');
      }
    });
  }, []);

  const onLike = () => {
    console.log(variable);
    if (LikeAction === null) {
      Axios.post('/api/like/upLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes + 1);
          setLikeAction('liked');
          if (DislikeAction !== null) {
            setDislikes(Dislikes - 1);
            setDislikeAction(null);
          }
        } else {
          console.log(response.data.err);

          alert('Likes를 올리지 못했습니다.');
        }
      });
    } else {
      Axios.post('/api/like/unLike', variable).then((response) => {
        if (response.data.success) {
          setLikes(Likes - 1);
          setLikeAction(null);
        } else {
          alert('Likes를 내리지 못했습니다.');
        }
      });
    }
  };

  const onDislike = () => {
    if (DislikeAction === null) {
      Axios.post('/api/like/upDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes + 1);
          setDislikeAction('disliked');
          if (LikeAction !== null) {
            setLikes(Likes - 1);
            setLikeAction(null);
          }
        } else {
          alert('Dislikes를 올리지 못했습니다.');
        }
      });
    } else {
      Axios.post('/api/like/unDislike', variable).then((response) => {
        if (response.data.success) {
          setDislikes(Dislikes - 1);
          setDislikeAction(null);
        } else {
          alert('Disikes를 내리지 못했습니다.');
        }
      });
    }
  };

  return (
    <div>
      <span key="comment-basic-like">
        <Tooltip title="Like">
          <Icon type="like" theme={LikeAction === 'liked' ? 'filled' : 'outlined'} onClick={onLike} />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Likes}</span>
      </span>
      &nbsp;&nbsp;
      <span key="comment-basic-dislike">
        <Tooltip title="DisLike">
          <Icon type="dislike" theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'} onClick={onDislike} />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}>{Dislikes}</span>
      </span>
    </div>
  );
}

export default LikeDislikes;
