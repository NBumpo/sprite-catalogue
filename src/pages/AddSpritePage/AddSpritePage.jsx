import { useState } from 'react'

import tokenService from '../../utils/tokenService'
import PageHeader from "../../components/Header/Header"

export default function AddSpritePage({ loggedUser, handleLogout, addSprite }) {



    const [title, setTitle] = useState('')
    const [caption, setCaption] = useState('')
    const [photo, setPhoto] = useState('')
    const [spriteType, setSpriteType] = useState('')

    

    async function addSprite(formData) {
        try {
          // HTTP REQUEST IS GOING TO THE SERVER
          const response = await fetch("/api/posts", {
            method: "POST",
            body: formData,
            headers: {
              // convention for sending jwts in a fetch request
              Authorization: "Bearer " + tokenService.getToken(),
              // We send the token, so the server knows who is making the
              // request
            },
          });
    
          const data = await response.json();
          // ====================================================
          // The HTTP cycle has been completed
          // and we have a parsed response from the server (data)
          console.log(data, " <- response data from the server");
    
          // Now we can update the state!
          //setPosts([data.post, ...posts]);
        } catch (err) {
          console.log(err);
        }
      }

    function handleTitleInput(e) {

        setTitle(e.target.value)
      
        
    }
    function handleCaptionInput(e) {
        
        setCaption(e.target.value)
       
        
    }
    function handleTypeInput(e) {
       
        setSpriteType(e.target.value)
        
    }

    function handleFileInput(e) {

        setPhoto(e.target.files[0])
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
        // Are we sending over a file? Yes, so what format should the data be in? formData
        // Preparing the data to be send to the server by a fetch request (POST)
        const formData = new FormData();
        formData.append('caption', caption)
        formData.append('photo', photo)
        formData.append('title', title)
        formData.append('spriteType', spriteType)
        // ======================================
        // Make the Api call, addPost is a prop from the feedPage
        // that makes the fetch request
        addSprite(formData)
        navigate('/')
        }catch(err){
            console.log(err)
        }
       
    }
    return (

        <main>


            <PageHeader handleLogout={handleLogout} loggedUser={loggedUser} />
            <h1>Add Sprite</h1>
            <section className="formwrapper">
            
            <form onSubmit={handleSubmit}>
                <input type='title' name='title' placeholder="Title" onChange={handleTitleInput}></input>
                <input type='caption' name='caption' placeholder="Caption" onChange={handleCaptionInput}></input>
                <input type='file' onChange={handleFileInput} className="choosefilebtn" required></input>
                <select type='spriteType' name='spriteType' onChange={handleTypeInput} className="addspriteselect">
                    <option value='Player'>Player</option>
                    <option value='NPC'>NPC</option>
                    <option value='Enemy'>Enemy</option>
                    <option value='Structure'>Structure</option>
                    <option value='Effect'>Effect</option>
                    <option value='Item'>Item</option>
                    <option value='Icon'>Icon</option>
                </select>
                <button type='submit' className='addspritesubmit'>
                    Upload
                </button>

            </form>
            </section>
        </main>

    )



}