import { useState, useEffect } from 'react'
import PageHeader from "../../components/Header/Header"
import SpritePostFeed from "../../components/SpritePostFeed/SpritePostFeed"

import tokenService from "../../utils/tokenService";

export default function HomePage({ loggedUser, handleLogout }) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // This useEffect is called when the page loads

        // Don't forget to call the function
        getPosts();
    }, []);

    // C(R)UD
    async function getPosts() {
        try {
            const response = await fetch("/api/posts", {
                method: "GET",
                headers: {
                    // convention for sending jwts in a fetch request
                    Authorization: "Bearer " + tokenService.getToken(),
                    // We send the token, so the server knows who is making the
                    // request
                },
            });

            const data = await response.json();
            // AFTER THIS WE HAVE THE DATA BACK FROM SERVER
            // CHECK THE DATA then update state!
            console.log(data);
            setPosts(data.posts);
        } catch (err) {
            console.log(err);
        }
    }

    async function deletePost(postId) {

        try {
            const responseFromTheServer = await fetch(`/api/posts/${postId}`, {
                method: "DELETE",
                headers: {

                    Authorization: "Bearer " + tokenService.getToken(),
                },
            });

            const data = await responseFromTheServer.json()
            console.log("Sprite was deleted")
            console.log(data)
            getPosts();

        } catch (err) {
            console.log(err)
        }

    }



        return (

            <main>
                <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />

                <h1>HOME</h1>


                <SpritePostFeed posts={posts} deletePost={deletePost} />
            </main>

        )



    }