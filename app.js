const range = document.getElementById('range')
const rangeV = document.getElementById('rangeV')
  setValue = ()=>{
    const newValue = Number( (range.value - range.min) * 100 / (range.max - range.min) )
    const newPosition = 10 - (newValue * 0.2);
    rangeV.innerHTML = `<span>${range.value}</span>`;
    rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
};

document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);

/* Toogle navbar */
const navBar = () => {
  const navbar = document.querySelector('.icon-navbar')
  const navMenu = document.querySelector('.header-menu')

  navbar.addEventListener('click', () => {
    navMenu.classList.toggle('nav-active')
  })

}
navBar()

/* Toggle tab */
const tabBar = () => {
  const tabBar = document.getElementById('icon-tab')
  const tabMenu = document.querySelector('.tab-lifestyle_nav')

  tabBar.addEventListener('click', () => {
    tabMenu.classList.toggle('tab-active')
  })
}
tabBar()