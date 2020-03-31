'use strict';

  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  };

function titleClickHandler(event){
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
      optArticleAuthorSelector = '.post .post-author',
      optTagsListSelector = '.tags.list',
      optAuthorsListSelector = '.authors.list',
      optCloudClassCount = '5',
      optCloudClassPrefix = 'tagsize-';

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

    //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';

    /* HANDLEBARS implimintation (instead of const linkHTML) */
    const linkHTMLData = {id: articleId, title: articleTitle};
    const linkHTML = templates.articleLink(linkHTMLData);

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

function calculateTagsParams(tags) {
  const params = {
    max: '0',
    min: '999999'
  };
  for (let tag in tags) {
    console.log(tag + ' is used ' + tags[tag] + ' times ');
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    }if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  return params;
  }
}

function calculateAuthorsParams(authors) {
  const params = {
    max: '0',
    min: '999999'
  };
  for (let author in authors) {
    console.log(author + ' is used ' + authors[author] + ' times ');
    if (authors[author] > params.max) {
      params.max = authors[author];
    }
    if (authors[author] < params.min) {
      params.min = authors[author];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor( percentage * (optCloudClassCount - 1) + 1 );
  const classValue = optCloudClassPrefix + classNumber;
  return classValue;

}

function calculateAuthorClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);
  const classValue = optCloudClassPrefix + classNumber;
  return classValue;
}


function generateTags(){
    /*  [NEW] create a new variable allTags with an empty array */
    let allTags = {};
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
    const articleTagsArray = articleTags.split(' ');
    console.log(articleTagsArray);
    /* START LOOP: for each tag */
     for (let tag of articleTagsArray) {

    /* generate HTML of the link */
    //const linkHTML = '<li><a href="#tag-' + tag + '">' + tag + '</a></li>';
    const linkHTMLData = { id: tag, title: tag };
    const linkHTML = templates.tagLink(linkHTMLData);
    console.log(linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;
    console.log(html);
    /* [NEW] check if this link is NOT already in allTags */
     if (!allTags.hasOwnProperty(tag)){
    /* [NEW] add tag to allTags object */
      allTags[tag] = 1;
     } else {
      allTags[tag]++;
    }
    /* END LOOP: for each tag */
     }
    /* insert HTML of all the links into the tags wrapper */
     tagsWrapper.insertAdjacentHTML('beforeend', html);
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams)

  /* [NEW] create variable for all links HTML code */
  //let allTagsHTML = '';

    /* HANDLEBARS implimintation (instead of const allTagsHTML) */
    const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */
  for(let tag in allTags){

  //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag],tagsParams) + '" href="#tag-' + tag + '">' + tag + ' (' + allTags[tag] + ')</a></li>';
  //console.log('tagLinkHTML:', tagLinkHTML);

  /* [NEW] generate code of a link and add it to allTagsHTML */
    //allTagsHTML += tagLinkHTML;
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams)
    });

  /* [NEW] END LOOP: for each tag in allTags: */
  }

  /*[NEW] add HTML from allTagsHTML to tagList */
  //tagList.innerHTML = allTagsHTML;
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}
generateTags();

function tagClickHandler(event){

  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
   const clickedElement = this;
   console.log('clickedElement:', clickedElement);
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  /* make a new constant "tag" and extract tag from the "href" constant */
   const tag = href.replace('#tag-','');
  /* find all tag links with class active */
   const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');
  /* START LOOP: for each active tag link */
   for (let tagLink of tagLinks) {
    /* remove class active */
     tagLink.classList.remove('active');
  /* END LOOP: for each active tag link */
    }
  /* find all tag links with "href" attribute equal to the "href" constant */
    const hrefTagLinks = document.querySelectorAll('a[href="' + href + '"]');
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

   const links = document.querySelectorAll('.post-tags .list a, .list.tags a');

  /* START LOOP: for each link */

   for (let link of links) {

    /* add tagClickHandler as event listener for that link */

     link.addEventListener('click', tagClickHandler);

  /* END LOOP: for each link */
  }
}

addClickListenersToTags();

function generateAuthors() {
  /* [NEW] create a new variable allTags with an empty array */
    let allAuthors = {};
  /* find all authors */
  const authors = document.querySelectorAll(optArticleSelector);
  /* START LOOP: for every author: */
  for (let author of authors){
  /* find authors wrapper */
    const authorsWrapper = author.querySelector(optArticleAuthorSelector);
  /* make html variable with empty string */
    let html = '';
  /* get authors from data-author attribute */
   const articleAuthor = author.getAttribute('data-author');
  /* generate HTML of the link */
    //const linkHTML = '<li><a href="#author-' + articleAuthor + '">' + articleAuthor + '</a></li>';

    /* HANDLEBARS implimintation (instead of const linkHTML) */
    const linkHTMLData = { id: articleAuthor, title: articleAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);
    console.log(linkHTML);

  /* add generated code to html variable */
    html = html + linkHTML;

  /* [NEW] check if this link is NOT already in allAuthors */
      if (!allAuthors.hasOwnProperty(articleAuthor)) {
  /* [NEW] add author to allAuthors object */
      allAuthors[articleAuthor] = 1;
    }else{
      allAuthors[articleAuthor]++;
    }
    /* insert HTML of all the links into author wrapper */
    authorsWrapper.insertAdjacentHTML('beforeend', html);
    /* END LOOP: for every article: */
  }
  /* [NEW] find list of authors in right column */
  const authorList = document.querySelector('.authors');

  const authorParams = calculateAuthorsParams(allAuthors);
  console.log('authorsParams', authorParams);

  /*[NEW] create variable for all links HTML code */
  //let allAuthorsHTML = '';

  /* HANDLEBARS implimintation */
  const allAuthorsData = { authors: [] };

  /*[NEW] Start loop: for each author in allAuthors: */
  for (let articleAuthor in allAuthors) {

  //const authorLinkHTML = '<li><a class="' + calculateAuthorClass(allAuthors[articleAuthor], authorParams) + '" href="#author-' + articleAuthor + '">' + articleAuthor + ' (' + allAuthors[articleAuthor] + ')</a></li>';

  // /*[NEW] generate code of a link and add it to allAuthorsHTML */
  //allAuthorsHTML += authorLinkHTML;

  allAuthorsData.authors.push({
    articleAuthor: articleAuthor,
    count: allAuthors[articleAuthor],
    className: calculateAuthorClass(allAuthors[articleAuthor], authorParams)
  });

  /*[NEW] generate code of a link and add it to allAuthorsHTML */
  //allAuthorsHTML += authorLinkHTML;

  /*[NEW] End loop */
}
  /* [NEW] add html from allAuthorsHTML to authorList */
  //authorList.innerHTML = allAuthorsHTML;
  authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
}

  generateAuthors();

  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();
    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;
    console.log('clickedElement:', clickedElement);
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
