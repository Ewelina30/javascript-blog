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

const links = document.querySelectorAll('.titles a');

for(let link of links){
  link.addEventListener('click', titleClickHandler);
}
