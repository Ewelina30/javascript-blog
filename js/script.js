const templates = {
  articleLink: document.querySelector('#template-article-link').innerHTML,
  tagLink: document.querySelector('#template-tag-link').innerHTML,
  authorLink: document.querySelector('#template-author-link').innerHTML,
  authorRigthtColumnLink: document.querySelector('#template-author-right-column-link').innerHTML
}

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
      optAuthorsListSelector = '.authors.list',
      optTagsListSelector = '.tags.list',
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

    for(let article of articles){

    /* find tags wrapper */

    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    console.log (tagsWrapper);

    /* make html variable with empty string */

      let html = '';

    /* get tags from data-tags attribute */

    const articleTags = article.getAttribute('data-tags');
    console.log (articleTags);

    /* split tags into array */

    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);

    /* START LOOP: for each tag */

    for(let tag of articleTagsArray){

      /* generate HTML of the link */

      const linkHTMLData = {tag: tag, tag: tag};
      const linkHTML = templates.tagLink(linkHTMLData);

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

generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(event);

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace('#tag-', '');

  /* find all tag links with class active */

  const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  console.log (tagLinks);

  /* START LOOP: for each active tag link */

  for(let tagLink of tagLinks){

    /* remove class active */

    tagLink.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const hreftagLinks = document.querySelectorAll('a[href="' + href + '"]');

  /* START LOOP: for each found tag link */

  for(let hrefTagLink of hreftagLinks){

    /* add class active */

    hrefTagLink.classList.add('active');

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');

}

function addClickListenersToTags(){
  /* find all links to tags */

  const tagLinks = document.querySelectorAll('.post-tags .list a');
  console.log(tagLinks);

  /* START LOOP: for each link */

  /* add tagClickHandler as event listener for that link */

  /* END LOOP: for each link */

  for(let tagLink of tagLinks){
    tagLink.addEventListener('click', tagClickHandler);

  }

}

addClickListenersToTags();

function generateAuthors(){

  /*  [NEW] create a new variable allAuthors with an empty object*/

  let allAuthors = {};

  /* find all articles */

  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);

  /* START LOOP: for every article: */

  for(let article of articles){

    /* find authors wrapper */

    const authorsWrapper = article.querySelector(optArticleAuthorSelector);
    console.log (authorsWrapper);

    /* make html variable with empty string */

    let html = '';

    /* get authors from data-author attribute */

    const author = article.getAttribute('data-author');
    console.log (author);

    /* generate HTML of the link */

    const linkHTMLData = {author: author, author: author};
    const linkHTML = templates.authorLink(linkHTMLData);

    console.log (linkHTML);

    /* add generated code to html variable */

    html = html + linkHTML;
    console.log(html);

    /* insert HTML of all the links into the  authorswrapper */

    authorsWrapper.insertAdjacentHTML('beforeend', html);

    /* END LOOP: for every article: */

    /* [NEW] check if this link is NOT already in allAuthors */

    if(!allAuthors.hasOwnProperty(author)){
      /* [NEW] add tag to allTags object */
      allAuthors[author] = 1;
    } else {
        allAuthors[author]++;
      }
  /* END LOOP: for each tag */
      console.log(allAuthors);
  }

  const authorListWrapper = document.querySelector(optAuthorsListSelector);
  console.log (authorListWrapper);

  /* [NEW] create variable for all links HTML code */

  /*let allAuthorsHTML = '';*/

  const allAuthorsData = {authors: []};

  /*[NEW] START LOOP: for each tag in allTags: */
  for(let author in allAuthors){
    /*[NEW] generate code of a link and add it to allTagsHTML */

   /* allAuthorsHTML = allAuthorsHTML + '<li>' + '<a href="#author-' + author + '">' + '<span class="author-name">' + author  + '(' + allAuthors[author] + ')' +  '</span>' + '</a>' + '</li>';
    console.log(allAuthorsHTML); */

    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author]
    });
  }

  /* [NEW] add html from allAuthorsTagsHTML to authorListWrapper */

  authorListWrapper.innerHTML = templates.authorRigthtColumnLink(allAuthorsData);
  console.log(allAuthorsData);
  /* authorListWrapper.innerHTML = allAuthorsHTML;
  console.log (authorListWrapper); */


  const authors = document.querySelectorAll('.authors a');
  console.log(authors);

  for(let author of authors){
    author.addEventListener('click', authorClickHandler);
  }

}

generateAuthors();

function authorClickHandler(event){

  /* prevent default action for this event */

  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */

  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */

  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "author" and extract tag from the "href" constant */

  const author = href.replace('#author-', '');
  console.log(author);

  /* find all author links with class active */

  const authorLinks = document.querySelectorAll('a.active[href^="#author-"]');
  console.log (authorLinks);

  /* START LOOP: for each active tag link */

  for(let authorLink of authorLinks){

    /* remove class active */

    authorLink.classList.remove('active');

    /* END LOOP: for each active tag link */

  }

  /* find all tag links with "href" attribute equal to the "href" constant */

  const hrefAuthorLinks = document.querySelectorAll('a[href="' + href + '"]');
  console.log(hrefAuthorLinks);

  /* START LOOP: for each found authorLink link */

  for(let hrefAuthorLink of hrefAuthorLinks){

    /* add class active */

    hrefAuthorLink.classList.add('active');
    console.log(hrefAuthorLink);

    /* END LOOP: for each found tag link */

  }

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks('[data-author="' + author + '"]');
}
