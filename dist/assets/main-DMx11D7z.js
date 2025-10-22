(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))s(o);new MutationObserver(o=>{for(const c of o)if(c.type==="childList")for(const i of c.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function r(o){const c={};return o.integrity&&(c.integrity=o.integrity),o.referrerPolicy&&(c.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?c.credentials="include":o.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function s(o){if(o.ep)return;o.ep=!0;const c=r(o);fetch(o.href,c)}})();const _="https://ceramic-api.onrender.com/api",g=`${_}/products`,h=`${_}/posts`;async function m(e=null){try{const t=e?`${g}/?category=${e}`:g,r=await fetch(t);if(!r.ok)throw new Error("Failed to fetch products");return await r.json()}catch(t){return console.error("Error fetching products:",t),[]}}async function v(){try{const e=await fetch(h);if(!e.ok)throw new Error("Failed to fetch posts");return await e.json()}catch(e){return console.error("Error fetching posts:",e),[]}}function p(e){const t=document.querySelector(".catalog_products_grid");t&&(t.innerHTML=e.map(r=>`
        <div class="catalog_product_card">
            <div class="catalog_product_image" style="background-image: url('${r.image}')"></div>
            <div class="catalog_product_info">
                <h3 class="catalog_product_name">${r.title}</h3>
                <p class="catalog_product_price">${r.price} ${r.currency}</p>
            </div>
        </div>
    `).join(""))}function y(e){const t=document.querySelector(".blog_posts_grid");t&&(t.innerHTML=e.map(r=>`
        <div class="blog_post_card">
            <div class="blog_post_top">
                <div class="blog_post_image" style="background-image: url('${r.image}')"></div>
                <div class="blog_post_content">
                    <h3 class="blog_post_title">${r.title}</h3>
                    <button class="blog_read_btn">Read More</button>
                </div>
            </div>
            <div class="blog_post_text">
                <p>${r.excerpt}</p>
            </div>
        </div>
    `).join(""))}async function L(){const e=document.querySelectorAll(".filter_btn");if(!document.querySelector(".catalog_products_grid"))return;const r=document.querySelector(".filter_btn.active"),s=r?r.textContent.toLowerCase():"tea",o=await m(s);p(o),e.forEach(c=>{c.addEventListener("click",async()=>{e.forEach(a=>a.classList.remove("active")),c.classList.add("active");const i=c.textContent.toLowerCase(),n=await m(i);p(n)})})}async function b(){const e=await v();y(e)}document.addEventListener("DOMContentLoaded",function(){const e=document.getElementById("hamburger_menu"),t=document.getElementById("mobile_menu"),r=document.getElementById("mobile_menu-close");e&&t&&r&&(e.addEventListener("click",function(){t.classList.add("active")}),r.addEventListener("click",function(){t.classList.remove("active")}),t.addEventListener("click",function(l){l.target===t&&t.classList.remove("active")}));const s=document.querySelectorAll(".gallery_image"),o=document.querySelectorAll(".indicator"),c=document.querySelector(".gallery_arrow:first-child"),i=document.querySelector(".gallery_arrow:last-child");let n=0;function a(l){s.forEach((d,u)=>{d.classList.toggle("active",u===l)}),o.forEach((d,u)=>{d.classList.toggle("active",u===l)})}c&&i&&(c.addEventListener("click",function(){n=(n-1+s.length)%s.length,a(n)}),i.addEventListener("click",function(){n=(n+1)%s.length,a(n)})),o.forEach((l,d)=>{l.addEventListener("click",function(){n=d,a(n)})}),a(0);const f=window.location.pathname;f.includes("catalog.html")?L():f.includes("blog.html")&&b()});
