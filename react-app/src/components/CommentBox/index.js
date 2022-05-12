import './index.css'
import { useState, useEffect } from "react";
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addAComment, deleteAComment, getAllComments } from "../../store/comment";
import UpdateForm from './UpdateForm';


const CommentBox = () => {
    // const { id } = useParams()
    const id = 1;
    const dispatch = useDispatch()
    const history = useHistory()

    const comments = useSelector(state => Object.values(state.comments))
    const userId = useSelector(state => state.session.user.id)

    const [content, setContent] = useState('');
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showErrors, setShowErrors] = useState(false);
    const [showEdit, setShowEdit] = useState('');
    const prop = { showEdit, setShowEdit };



    useEffect(() => {
        dispatch(getAllComments(id))
    }, [dispatch])

    const submitForm = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        setShowErrors(true);

        const data = {
            content,
            recipe_id: id
        };

        if (!validationErrors.length) {
            // lets fix below lines////////
            setContent('')
            setShowEdit('');
            setValidationErrors([]);
            setHasSubmitted(false);
            await dispatch(addAComment(data));
            history.push('/')
            /////////////////////////
        }
    };



    useEffect(() => {
        const errors = [];
        if (content.length <= 0) errors.push("We may need to think of what to write first...");
        if (content.length >= 250) errors.push("Gather your thoughts, It's way too long...")
        setValidationErrors(errors);
    }, [content]);

    return (
        <>
            <div className='comment-form-wrapper'>
                {!showEdit && (
                    <form onSubmit={(e) => submitForm(e)}>
                        <textarea
                            name="content"
                            className="comment-input"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            placeholder="Write a comment here..."
                        ></textarea >
                        <div>
                            {showErrors && hasSubmitted && (
                                <ul className="errors comment-error">
                                    {validationErrors.map((error) => (
                                        <li key={error}>{error}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button type="submit" className="comment-submit-button">
                            SUBMIT
                        </button>
                    </form>
                )}
            </div >
            {comments.slice(0).reverse()?.map(comment => (
                <div className="comment-indv-box" key={comment.id}>
                    <p>{comment.content}</p>
                    <div className='comment-owner-info'>
                        <p>{comment.comment_owner?.username}</p>
                        <p>{comment.created_at.split(" ")[2]} {comment.created_at.split(" ")[1]} {comment.created_at.split(" ")[3]}</p>
                        {showEdit !== '' && +showEdit === +comment.id && (
                            <div className='comment-edit-form'>
                                <UpdateForm className='updateform' comment={comment} edit={prop} />
                            </div>
                        )}
                        {comment.user_id == userId && (
                            <div className='editdel-button-box'>
                                <p
                                    onClick={() => setShowEdit(`${comment.id}`)}
                                    className='comment-update-button'>F</p>
                                <p
                                    onClick={() => (dispatch(deleteAComment(comment.id)))}
                                    className='comment-delete-button'>X</p>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}

export default CommentBox