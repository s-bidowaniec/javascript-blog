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
        console.log("generate title links");
        /* [DONE] Remove content of titles list */
        const listOfTitles = document.querySelector(".list.titles");
        listOfTitles.innerHTML = "";
        /* For articles */
        const articles = document.querySelectorAll('.post');
        for (let article of articles){
            /* [DONE] Get article ID */
            let articleId = article.getAttribute("id");
            console.log("article ID: ", articleId);
            /* [DONE] Get article title */
            let articleTitle = document.querySelector('#'+articleId+ ' .post-title').innerHTML;
            console.log("article title: ", articleTitle);
            /* Create link */
            // [DONE] <li><a href="#article-1"><span>Article 1</span></a></li>
            let articleLink = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
            console.log("article link: ", articleLink);
            /* Add link to title list */
            
        }
    }
    generateTitleLinks()
}