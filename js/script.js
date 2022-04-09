'use strict';
{
    const titleClickHandler = function(event) {
        event.preventDefault();
        const clickedElement = this;
        console.log('Link was clicked!');
        /* [DONE] remove class 'active' from all article links  */
        const activeLinks = document.querySelectorAll('.titles a.active');
        for(let activeLink of activeLinks){
            activeLink.classList.remove('active');
        }

        /* [DONE] add class 'active' to the clicked link */
        console.log('clickedElement:', clickedElement);
        clickedElement.classList.add('active');

        /* [DONE] remove class 'active' from all articles */
        const activeArticles = document.querySelectorAll('.post.active');
        for (let activeArticle of activeArticles){
            activeArticle.classList.remove('active')
        }

        /* [DONE] get 'href' attribute from the clicked link */
        const articleSelector = clickedElement.getAttribute('href')
        console.log('clicked href:', articleSelector)

        /* [DONE] find the correct article using the selector (value of 'href' attribute) */
        const targetArticle = document.querySelector(articleSelector)
        console.log('current article:', targetArticle)

        /* [DONE] add class 'active' to the correct article */
        targetArticle.classList.add('active')
    }

    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
        link.addEventListener('click', titleClickHandler);
    }

    const generateTitleLinks = function (){
        console.log("generate title links")
        /* [DONE] Remove content of titles list */
        const listOfTitles = document.querySelector(".list.titles")
        listOfTitles.innerHTML = ""
        /* For articles */
        /* Get article ID */
        /* Get article title */
        /* Create link */
        /* Add link to title list */
    }
    generateTitleLinks()
}