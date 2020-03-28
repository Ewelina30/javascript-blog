'use strict';

document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});

const titleClickHandler = function(event){

    event.preventDefault();
    const clickedElement = this;

    /* hide active link and make clicked link active */
    const activeLink = document.querySelector('.titles a.active');
    if(activeLink) activeLink.classList.remove('active');
    clickedElement.classList.add('active');

    /* find active article and hide it */
    const activeArticle = document.querySelector('article.active');
    if(activeArticle) activeArticle.classList.remove('active');

    /* find article related to clicked link and make it active */
    const articleSelector = clickedElement.getAttribute('href');
    const targetArticle = document.querySelector(articleSelector)
    targetArticle.classList.add('active');
}

const optArticleSelector = '.post',
      optTitleSelector = '.post-title',
      optTitleListSelector = '.titles',
      optArticleTagsSelector = '.post-tags .list',
      optArticleAuthorSelector = '.post .post-author';


function generateTitleLinks(customSelector = ''){

  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
        titleList.innerHTML = '';

    /* for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    let html = '';
    for (let article of articles) {


    /* get the article id */
    const articleId = article.getAttribute('id');

    /* find the title element *//* get the title from the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
          console.log(articleTitle);

    /* create HTML of the link */

    const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* insert link into titleList */

     html = html + linkHTML;

   }

    titleList.innerHTML = html;
}

generateTitleLinks();

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}

function generateTags(){

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */

    for (let article of articles) {

    /* find tags wrapper */

     const tagsWrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */

    let html = '';

    /* get tags from data-tags attribute */

     const articleTags = article.getAttribute('data-tags');

    /* split tags into array */

    const articleTagsArray = articleTags.split('  ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */

     for (let tag of articleTagsArray) {

      /* generate HTML of the link */

      const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';

      /* add generated code to html variable */

      html = html + linkHTML;
      console.log(html);

    /* END LOOP: for each tag */

     }

    /* insert HTML of all the links into the tags wrapper */

    tagsWrapper.insertAdjacentHTML('beforeend', html);

  /* END LOOP: for every article: */
  }

  const tags = document.querySelectorAll('.post-tags .list li a');

 for(let tag of tags){
   tag.addEventListener('click', tagClickHandler);
 }   
}
generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

   const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('a.active[href^="#tag-"]');

  /* make a new constant "tag" and extract tag from the "href" constant */

   const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

   const tagLinks = document.querySelectorAll('.active');

  /* START LOOP: for each active tag link */

   for (let tagLink of tagLinks) {

    /* remove class active */

     tagLink.classList.remove('active');

  /* END LOOP: for each active tag link */

    }

  /* find all tag links with "href" attribute equal to the "href" constant */

    const hrefTagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each found tag link */

  for (let hrefTagLink of hrefTagLinks) {

    /* add class active */

      hrefTagLink.classList.add('active');

  /* END LOOP: for each found tag link */

   }

  /* execute function "generateTitleLinks" with article selector as argument */

   generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags(){

  /* find all links to tags */

   const links = document.querySelectorAll('.post-tags .list a');

  /* START LOOP: for each link */

   for (let link of links) {

    /* add tagClickHandler as event listener for that link */

     link.addEventListener('click', titleClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {

  /* find all authors */

  const authors = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every author: */

  for (let author of authors) {

    /* find authors wrapper */

    const authorsWrapper = author.querySelector(optArticleAuthorSelector);

    /* make html variable with empty string */

   let html = '';

   /* get authors from data-author attribute */

    const articleAuthor = author.getAttribute('data-author');

    /* generate HTML of the link */

    const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';

    /* add generated code to html variable */

   html = html + linkHTML;

   /* insert HTML of all the links into author wrapper */

    authorsWrapper.insertAdjacentHTML('beforeend', html);

    /* END LOOP: for every article: */
    }
  }

  generateAuthors();

  function authorClickHandler(event) {

    /* prevent default action for this event */

    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */

    const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element  */

    const href = this.getAttribute('href');

  /* make a new constant "author" and extract author from the "href" constant */

    const author = href.replace('#author-', '');

  /* find all author links with class active */

    const activeAuthorLinks = document.querySelectorAll('a.active[href^="#author-"]');

  /* START LOOP: for each active author link */

  for (let activeAuthorLink of activeAuthorLinks) {

    /* remove class active */

    activeAuthorLink.classList.remove('active');

    /* END LOOP: for each active tag link */

    }

  /* find all author links with "href" attribute equal to the "href" constant */

    const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found author link */

    for (let hrefAuthorLink of hrefAuthorLinks) {

    /* add class active */

    hrefAuthorLink.classList.add('active');

    /* END LOOP: for each found tag link */

    }

  /* execute function "generateTitleLinks" with article selector as argument */

    generateTitleLinks('[data-author="' + author + '"]');
}

function addClickListenersToAuthors() {

  /* find all links to authors */

    const authorLinks = document.querySelectorAll(optArticleAuthorSelector + '.post-author a, .list.authors a');

  /* START LOOP: for each link */

    for (let authorLink of authorLinks) {

    /* add authorClickHandler as event listener for that link */

    authorLink.addEventListener('click', authorClickHandler);

    /* END LOOP: for each link */

  }
}
addClickListenersToAuthors();
