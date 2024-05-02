import {useParams} from 'react-router-dom';

const Post = () => {
  const {postId} = useParams();
  return (
    <div>
      post {postId} page and comment for it
    </div>
  );
};

export default Post;