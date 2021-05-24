# Lab 4 

*compli-pet*

[deployed url](https://snowxposts.netlify.app)

[api github url](https://github.com/dartmouth-cs52-21S/platform-api-snow-kang)

[netlify client url](https://snowxposts.netlify.app/)

[heroku api url](https://compli-pet-platform-server.herokuapp.com/)

## What Worked Well
- I really am happy with my overall design this time! I spent a lot of time adjusting the style to make it feel more clean than my previous labs which were always super busy (I still snuck a rainbow gradient into this lab though, I couldn't resist). 
-I learned a lot of new things like filtering, page transitions, and toast notifications! Yayyy 

## What Didn't
- I don't like that it sometimes shows previous posts before loading the current post; sometimes it runs smoothly and sometimes it shudders before settling in place. I'm planning on going to an office hours before the next lab to hopefully sort it out. I also got confused while adding the check for valid image urls. Not sure if I did that correctly.

## Extra Credit
- Not a blog; a pet appreciation page ! <3
- Fallback pictures in both the main screen as well as in the inner edit screen 
    - In the main screen, when the url is broken it shows a fallback silhouette of the animal or if no tag exists for it, an amiguous creature silhouette
    - In the edit screen, when the url is broken it changes a speech bubble above the animal icon to ask the user to reset the url - this gave me a lot of issues and I don't think I did it in the most React-friendly way; pointers here would be really appreciated D:
- Learned page animations using react-router-transition
- Used toast notifications to notify user when any field was left unfilled - I also remove these notifications upon changing pages 
- Used react-modal for a fun display that shows up when you try to delete a post
- Filter by tag (animal type!) 
- Preview while editing of both the card that will show in the All Posts page as well as the text that will shows in the single Post preview page
    - Instantly shows fallback silhouette when link is broken
    - Instantly shows real image when the link is valid
- Lots of animations and effects everywhere
- Image Upload with AWS S3

## Screenshots
![screen1](https://user-images.githubusercontent.com/38738497/118359030-7a125e00-b54f-11eb-9129-2c84bf61c41f.PNG)
![screen2](https://user-images.githubusercontent.com/38738497/118359031-7a125e00-b54f-11eb-95ce-19edaefbd0d6.PNG)
![screen3](https://user-images.githubusercontent.com/38738497/118359034-7aaaf480-b54f-11eb-94f4-c265b42fb089.PNG)
![screen4](https://user-images.githubusercontent.com/38738497/118359035-7b438b00-b54f-11eb-88f9-675287a377b5.PNG)

