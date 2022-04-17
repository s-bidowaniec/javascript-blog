'use strict';
{
  /* Constant  parameters */
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorsSelector = '.post-author',
    optTagsListSelector = '.sidebar .tags';

  /* Titles */
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
      activeArticle.classList.remove('active');
    }

    /* [DONE] get 'href' attribute from the clicked link */
    const articleSelector = clickedElement.getAttribute('href');
    console.log('clicked href:', articleSelector);

    /* [DONE] find the correct article using the selector (value of 'href' attribute) */
    const targetArticle = document.querySelector(articleSelector);
    console.log('current article:', targetArticle);

    /* [DONE] add class 'active' to the correct article */
    targetArticle.classList.add('active');
  };
  const generateTitleLinks = function (customSelector = ''){
    console.log('generate title links');
    /* [DONE] remove content of titles list */
    let listOfTitles = document.querySelector(optTitleListSelector);
    listOfTitles.innerHTML = '';
    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    console.log('optArticleSelector: ', optArticleSelector);
    console.log('customSelector: ', customSelector);
    console.log('articles: ', articles);
    for (let article of articles){
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log('article ID: ', articleId);
      /* [DONE] get the title from the title element */
      const articleTitle = document.querySelector('#'+articleId+ ' '+optTitleSelector).innerHTML;
      console.log('article title: ', articleTitle);
      /* [DONE] create HTML of the link */
      // <li><a href="#article-1"><span>Article 1</span></a></li>
      const articleLink = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
      console.log('article link: ', articleLink);
      /* [DONE] insert link into titleList */
      listOfTitles.innerHTML += articleLink;
    }
    const links = document.querySelectorAll('.titles a');

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };

  /* Tags */
  const generateTags = function(){
    //console.log('start generateTags function');
    /* [DONE] create a new variable allTags with an empty array */
    let allTags = [];
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log('articles: ', articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      console.log('article: ', article);
      /* [DONE] find tags wrapper */
      const articleTagsWrapper = article.querySelector(optArticleTagsSelector);
      console.log('article tag wrapper: ', articleTagsWrapper);
      /* [DONE] make html variable with empty string */
      let html = '';
      /* [DONE] get tags from data-tags attribute, split tags into array */
      const articleTags = article.getAttribute('data-tags').split(' ');
      console.log('article tags: ', articleTags);
      /* START LOOP: for each tag */
      for (let tag of articleTags) {
        /* [DONE] generate HTML of the link */
        const htmlLink = `<li><a href="#tag-${tag}">${tag}</a></li>`;
        console.log('html link: ', htmlLink);
        /* [DONE] add generated code to html variable */
        html += htmlLink;
        /* [DONE] check if this link is NOT already in allTags */
        if(allTags.indexOf(htmlLink) == -1) {
          /* [DONE] add generated code to allTags array */
          allTags.push(htmlLink);
        }
        /* END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      articleTagsWrapper.innerHTML = html;
      console.log('article tags wrapper innerHTML: ', articleTagsWrapper.innerHTML);
      /* END LOOP: for every article: */
      /* [DONE] find list of tags in right column */
      const tagList = document.querySelector(optTagsListSelector);
      /* [DONE] add html from allTags to tagList */
      tagList.innerHTML = allTags.join(' ');
    }
  };
  const tagClickHandler = function(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    //console.log(tag);
    /* [DONE] find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');
    /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks) {
      /* [DONE] remove class active */
      activeLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll('a[href="#tag-'+tag+'"]');
    console.log(tagLinks);
    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* [DONE] add class active */
      tagLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  };
  const addClickListenersToTags = function(){
    /* [DONE] find all links to tags */
    const tagLinks = document.querySelectorAll('a[href^="#tag-"]');
    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {
      /* [DONE] add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  };

  /* Authors */
  const generateAuthors = function(){
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* [DONE] find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorsSelector);
      /* [DONE] get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      /* [DONE] generate HTML of the link */
      const authorLink = `by <a href="#author-${articleAuthor.replace(' ', '-')}">${articleAuthor}</a>`;
      /* [DONE] insert HTML of all the links into the authors wrapper */
      authorWrapper.innerHTML = authorLink;
      /* END LOOP: for every article: */
    }
  };
  const authorClickHandler = function(event){
    /* [DONE] prevent default action for this event */
    event.preventDefault();
    /* [DONE] make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    /* [DONE] make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');
    /* [DONE] make a new constant "tag" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    /* [DONE] find all tag links with class active */
    const activeLinks = document.querySelectorAll('a.active[href^="#author-"]');
    /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks) {
      /* [DONE] remove class active */
      activeLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll('a[href="#author-'+author+'"]');
    /* START LOOP: for each found tag link */
    for (let authorLink of authorLinks) {
      /* [DONE] add class active */
      authorLink.classList.add('active');
      /* END LOOP: for each found tag link */
    }
    /* [DONE] execute function "generateTitleLinks" with article selector as argument */
    console.log(author.replace('-', ' '));
    generateTitleLinks('[data-author~="' + author + '"]');
  };
  const addClickListenersToAuthors = function(){
    /* [DONE] find all links to author */
    const authorLinks = document.querySelectorAll('a[href^="#author-"]');
    /* START LOOP: for each link */
    for (let authorLink of authorLinks) {
      /* [DONE] add authorClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);
      /* END LOOP: for each link */
    }
  };

  /* Script */
  generateTitleLinks();
  generateTags();
  addClickListenersToTags();
  generateAuthors();
  addClickListenersToAuthors();

}