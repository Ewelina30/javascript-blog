document.getElementById('test-button').addEventListener('click', function(){
  const links = document.querySelectorAll('.titles a');
  console.log('links:', links);
});

const titleClickHandler = function(event){
  event.preventDefault();
  const clickedElement = this;
  console.log('Link was clicked!', event);


  /*  [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
}

  /*  [IN PROGRESS] add class 'active' to the clicked link */

    console.log('clickedElement (with plus): ' + clickedElement);
    clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.article a.active');

  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
}


  /* get 'href' attribute from the clicked link */

    const articleSelector = article;
    article = clickedElement.getAttribute('.title a');
    console.log(articleSelector);

  /* find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = querySelector;
    document.querySelector('href');
    console.log = (targetArticle);


  /* add class 'active' to the correct article */

  console.log('clickedElement (with plus): ' + clickedElement);
  clickedElement.classList.add('active');

}

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
