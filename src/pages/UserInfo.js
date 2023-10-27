import {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom"
import "../profileboxcss.css"

const URL = `https://nameless-beach-23923-c2e8de3dcdd3.herokuapp.com/user`

const UserInfo = (props) => {
    const { userId } = useParams()
    const [user, setUser] = useState(null)

    const fetchUser = async () => {
        try {
            const response = await fetch(`${URL}/${userId}`);
            const data = await response.json();
            setUser(data);
            console.log("this is userinfo",data)
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    };
    
    useEffect(() => {
        fetchUser();
    }, []);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='profile-box'>
            <div className='profile-container'>
                <img className='profile-picture' src={user.profilePicture} alt={user.username} />
                <dic>
                    <h1 className='profile-name'>{user.username}</h1>
                    <div className='profile-name-loc-bio-social'>
                        <h4>Name: Person </h4>
                        <h4>Location Base: Location</h4>
                        <h4>Quick About Me:</h4>
                        <h4 className='p-s' >All social media logos</h4>
                    </div>
                </dic>
            </div>
        </div>
    );
};


export default UserInfo