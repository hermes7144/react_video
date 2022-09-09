import Axios from 'axios';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import SingleComment from './SingleComment';
import ReplyComment from './ReplyComment';
function Comment(props) {
  const user = useSelector((state) => state.user);
  console.log(user);

  const [CommentValue, setCommentValue] = useState('');

  const onChange = (e) => {
    e.preventDefault();
    setCommentValue(e.currentTarget.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: CommentValue,
      writer: user.userData._id,
      postId: props.postId,
    };

    Axios.post('/api/comment/saveComment', variables).then((response) => {
      if (response.data.success) {
        props.refreshFunction(response.data.result);
        setCommentValue('');
      } else {
        alert('댓글 저장에 실패했습니다.');
      }
    });
  };
  return (
    <div>
      <br />
      <p>Replies</p>
      <hr />
      {props.commentLists &&
        props.commentLists.map(
          (comment, index) =>
            !comment.responseTo && (
              <React.Fragment>
                <SingleComment refreshFunction={props.refreshFunction} comment={comment} postId={props.postId} />
                <ReplyComment refreshFunction={props.refreshFunction} parentCommentId={comment._id} commentLists={props.commentLists} postId={props.postId} />
              </React.Fragment>
            )
        )}

      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea style={{ width: '100%', borderRadius: '5px' }} onChange={onChange} value={CommentValue} placeholder="코멘트를 작성해 주세요" />
        <br />
        <button style={{ width: '20%', height: '52px' }}>Submit</button>
      </form>
    </div>
  );
}

export default Comment;
