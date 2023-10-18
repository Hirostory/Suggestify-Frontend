import {useState, useEffect} from 'react'
import { useNavigate, useParams } from "react-router-dom"

const URL = `http://localhost:3000/user`

const UserShow = (props) => {
    const params = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await fetch(`${URL}/${params.id}`);
                const data = await response.json();
                setUser(data);
                console.log(data)
            } catch (error) {
                console.error('Error fetching user:', error);
            }
        };

        fetchUser();
    }, [params.id]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>{user.username}</h1>
            <img src={user.profilePicture} alt={user.username} />

            <div>
                <h2>Collections:</h2>
                <ul>
                    {user.collectionsName.map((collection) => (
                        <li key={collection._id}>
                            <h2>{collection.name}</h2>
                            <img src={collection.image}/>
                            <p>{collection.description}</p>
                        </li>

                    ))}
                </ul>
            </div>
        </div>
    );
};


export default UserShow