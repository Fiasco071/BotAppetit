import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { updateAComment } from "../../store/comment";
import { useHistory } from 'react-router-dom'

const UpdateForm = ({comment, edit}) => {
    const history = useHistory()
    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user.id)

    const [content, setContent] = useState(comment.content);
    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [showErrors, setShowErrors] = useState(false);

    // console.log('-=-=-=-=-=-==-==-==',comment.user_id )

    const submitUpdateForm = async (e) => {
        e.preventDefault();

        setHasSubmitted(true);
        setShowErrors(true);

        const data = {
            content,
            recipe_id: comment.id
        };

        if (validationErrors.length === 0) {

            // lets fix below lines////////
            let update = await dispatch(updateAComment(data));
            if (update) {
                setContent('')
                setValidationErrors([]);
                setHasSubmitted(false);
                edit.setShowEdit('');
                history.push('/')
            }
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
        <div className="update-form-wrapper">
        {comment.user_id == userId && (
            <form onSubmit={(e) => submitUpdateForm(e)}
            className='comment-update-form'
            >
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
                <button type="submit" className="update-button">
                    SUBMIT
                </button>
            </form>
        )}
        </div>
    );
}

export default UpdateForm