'use strict';
{
  /* Templates */
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    authorsGroupLink: Handlebars.compile(document.querySelector('#template-author-group-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    tagCloudLinks : Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
  };


  /* Constant  parameters */
  const opts = {
    tagSizes: {
      count: 5,
      classPrefix: 'tag-size-',
    },
  };
  const select = {
    all: {
      articles: '.post',
      linksTo: {
        tags: 'a[href^="#tag-"]',
        authors: 'a[href^="#author-"]',
      },
      activeLinksTo: {
        tags: 'a.active[href^="#tag-"]',
        authors: 'a.active[href^="#author-"]',
      },
    },
    article: {
      tags: '.post-tags .list',
      author: '.post-author',
      title: '.post-title',
    },
    listOf: {
      titles: '.titles',
      tags: '.tags.list',
      authors: '.authors.list',
    },
  };


  /* Titles */

  const titleClickHandler = function(event) {
    event.preventDefault();
    const clickedElement = this;
    // console.log('Link was clicked!');
    /* [DONE] remove class 'active' from all article links  */
    const activeLinks = document.querySelectorAll(select.listOf.titles+' a.active');
    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
    /* [DONE] add class 'active' to the clicked link */
    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');
    /* [DONE] remove class 'active' from all articles */
    const activeArticles = document.querySelectorAll(select.all.articles+'.active');
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
    let listOfTitles = document.querySelector(select.listOf.titles);
    listOfTitles.innerHTML = '';
    /* get all articles */
    const articles = document.querySelectorAll(select.all.articles + customSelector);
    // console.log('select.all.articles: ', select.all.articles);
    // console.log('customSelector: ', customSelector);
    // console.log('articles: ', articles);
    /* [START LOOP] for each article */
    for (let article of articles){
      /* [DONE] get the article id */
      const articleId = article.getAttribute('id');
      console.log('article ID: ', articleId);
      /* [DONE] get the title from the title element */
      const articleTitle = document.querySelector('#'+articleId+ ' '+select.article.title).innerHTML;
      console.log('article title: ', articleTitle);
      /* [DONE] create HTML of the link */
      const linkHTMLData = {id: articleId, title: articleTitle};
      const linkHTML = templates.articleLink(linkHTMLData);
      console.log('article link: ', linkHTML);
      /* [DONE] insert link into titleList */
      listOfTitles.innerHTML += linkHTML;
    }
    /* Add link click event */
    const links = document.querySelectorAll(select.listOf.titles+' a');
    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }
  };


  /* Tags */

  const calculateTagsParams = function(tags){
    /* get min and max value of tag occurrence in tag array */
    const params = {
      'max': 0,
      'min': 999999,
    };
    console.log(tags);
    for (let tag in tags){
      if (tags[tag]<params.min){
        params.min = tags[tag];
      } else if (tags[tag]>params.max){
        params.max = tags[tag];
      }
    }
    return params;
  };


  const calculateTagClass = function(count, params){
    /* calculate tag occurrence class:
    * GLOBAL opts.tagSizes.count - number of border values
    * params.min, params.max - range of tags occurrence
    * count - tag occurrence count
    * */
    const tagClass = Math.round(((count-params.min)/((params.max-params.min)/(opts.tagSizes.count-1)))+1);
    return opts.tagSizes.classPrefix + tagClass;
  };


  const generateTags = function(){
    //console.log('start generateTags function');
    /* [DONE] create a new variable allTags with an empty object */
    let allTags = {};
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    //console.log('articles: ', articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      console.log('article: ', article);
      /* [DONE] find tags wrapper */
      const articleTagsWrapper = article.querySelector(select.article.tags);
      console.log('article tag wrapper: ', articleTagsWrapper);
      /* [DONE] make html variable with empty string */
      let html = '';
      /* [DONE] get tags from data-tags attribute, split tags into array */
      const articleTags = article.getAttribute('data-tags').split(' ');
      console.log('article tags: ', articleTags);
      /* START LOOP: for each tag */
      for (let tag of articleTags) {
        /* [DONE] generate HTML of the link */
        // const htmlLink = `<li><a href="#tag-${tag}">${tag}</a></li>`;
        const tagLinkData = {tag: tag};
        const tagLinkHTML = templates.tagLink(tagLinkData);
        console.log('tag html link: ', tagLinkHTML);
        /* [DONE] add generated code to html variable */
        html += tagLinkHTML;
        /* [DONE] check if this link is NOT already in allTags */
        if(!allTags[tag]) {
          /* [DONE] add generated code to allTags array */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
        /* END LOOP: for each tag */
      }
      /* [DONE] insert HTML of all the links into the tags wrapper */
      articleTagsWrapper.innerHTML = html;
      console.log('article tags wrapper innerHTML: ', articleTagsWrapper.innerHTML);
      /* END LOOP: for every article: */
      /* [DONE] find list of tags in right column (HTML Wrapper) */
      const tagList = document.querySelector(select.listOf.tags);
      console.log(allTags);
      /* tags occurrence (max min) */
      const tagsParams = calculateTagsParams(allTags);
      console.log('tagsParams:', tagsParams);
      /* START LOOP: for each tag in allTags: */
      const tagsData = {'tags': {}};
      for (let tag in allTags){
        /* [DONE] generate tag parameters for tag cloud HTML template */
        tagsData['tags'][tag] = {
          'tagClass': calculateTagClass(allTags[tag], tagsParams),
          'tagName': tag,
        };
        /* END LOOP: for each tag in allTags: */
      }
      /* [DONE] create tag cloud HTML */
      // console.log(tagsData);
      // console.log(templates.tagCloudLinks(tagsData));
      tagList.innerHTML = templates.tagCloudLinks(tagsData);
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
    const activeLinks = document.querySelectorAll(select.all.activeLinksTo.tags); //'a.active[href^="#tag-"]'
    /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks) {
      /* [DONE] remove class active */
      activeLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const tagLinks = document.querySelectorAll(select.all.linksTo.tags.replace('"]', tag+'"]'));  //'a[href="#tag-'+tag+'"]'
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
    const tagLinks = document.querySelectorAll(select.all.linksTo.tags);
    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {
      /* [DONE] add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);
      /* END LOOP: for each link */
    }
  };


  /* Authors */

  const generateAuthors = function(){
    /* [DONE] create a new variable allAuthors with an empty object */
    let allAuthors = {};
    /* [DONE] find all articles */
    const articles = document.querySelectorAll(select.all.articles);
    /* START LOOP: for every article: */
    for (let article of articles) {
      /* [DONE] find author wrapper */
      const authorWrapper = article.querySelector(select.article.author);
      /* [DONE] get author from data-author attribute */
      const articleAuthor = article.getAttribute('data-author');
      /* count authors */
      if (!allAuthors[articleAuthor]){
        allAuthors[articleAuthor] = 1;
      } else {
        allAuthors[articleAuthor]++;
      }
      /* [DONE] generate HTML of the link */
      // const authorLink = `by <a href="#author-${articleAuthor.replace(' ', '-')}">${articleAuthor}</a>`;
      const authorData = {authorId: articleAuthor.replace(' ', '-'), authorName: articleAuthor};
      const authorLink = templates.authorLink(authorData);
      /* [DONE] insert HTML of all the links into the authors wrapper */
      authorWrapper.innerHTML = authorLink;
      /* END LOOP: for every article: */
    }
    /* create authors data for HTML tempate */
    const authorsData = {'authors': {}};
    for (let author in allAuthors){
      authorsData['authors'][author] = {
        'authorId': author,
        'authorName': author.replace('-', ' '),
        'authorArticlesCount': allAuthors[author],
      };
    }
    /* add authors links to HTML */
    const authorsLinkWrapper = document.querySelector(select.listOf.authors);
    authorsLinkWrapper.innerHTML = templates.authorsGroupLink(authorsData);
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
    const activeLinks = document.querySelectorAll(select.all.activeLinksTo.authors);
    /* START LOOP: for each active tag link */
    for (let activeLink of activeLinks) {
      /* [DONE] remove class active */
      activeLink.classList.remove('active');
      /* END LOOP: for each active tag link */
    }
    /* [DONE] find all tag links with "href" attribute equal to the "href" constant */
    const authorLinks = document.querySelectorAll(select.all.linksTo.authors.replace('"]',author+'"]'));
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
    const authorLinks = document.querySelectorAll(select.all.linksTo.authors);
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