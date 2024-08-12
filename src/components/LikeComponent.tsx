import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LikeComponent = () =>{
    const[liked, setLiked] = useState(false);
    const[loading, setLoading] = useState(false);
    const[error,setError]= useState("");

    const handleLikeClick = async () => {
        setLoading(true);
       try {
        await callBackendService(); 
        setLiked(!liked);
       } catch (error) {
        setError("Error");
       }
       finally{
        setLoading(false);
       }

    }

    return (
        <div>
            <button
            className={
                `like-button${liked ? ' liked' : ''}${loading ? ' loading' : ''}`
            }
            onClick={handleLikeClick}
            disabled={loading}
            >
                {loading ? <><span><AiOutlineLoading3Quarters className="spinner"/>{liked? "Liked" : "Like"}</span></>:
                <>
                <span> <FaHeart  className="heart-icon" /> {liked? "Liked" : "Like"}</span>  
                </>
                }

                
            </button>
            {error && <div>Error</div>}

        </div>
    )
} 

const callBackendService = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000)); // Mock backend call
};

export default LikeComponent;
