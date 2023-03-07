import faviconURL from "../utils/faviconURL";

export default function gridItem(title: string, url: string, id: string) {
  const wrapper = document.createElement('div');

  wrapper.innerHTML = `<button class="btn bg-transparent" data-id="${id}">
    <svg width="16" height="16" xmlns="https://www.w3.org/2000/svg" stroke="white" id="${id}" data-id="${id}">
      <path d="M15.3765 3.64109C15.3657 3.65188 15.3515 3.65525 15.3406 3.66537C15.3305 3.67617 15.3271 3.69034 15.3163 3.70113L14.3384 4.6787C14.3384 4.67937 14.3384 4.67937 14.3384 4.67937L4.68719 14.3296C4.68652 14.3302 4.68516 14.3316 4.68449 14.3323L4.68246 14.3343C4.65471 14.362 4.6202 14.3748 4.58907 14.3964C4.54914 14.4247 4.51395 14.4591 4.46659 14.4787L4.4632 14.48C4.46252 14.4807 4.46185 14.4807 4.46049 14.4814L0.92198 15.9487C0.839422 15.9831 0.752803 16 0.666861 16C0.493623 16 0.323092 15.9319 0.195194 15.8044C0.00436203 15.6134 -0.0524816 15.3267 0.051055 15.0778L1.52087 11.5338V11.5331C1.52154 11.5325 1.52222 11.5325 1.52222 11.5318C1.55538 11.4522 1.60343 11.3793 1.66568 11.3173L11.3223 1.66166C11.3223 1.66166 11.3223 1.66099 11.323 1.66099C11.323 1.66099 11.323 1.66099 11.3237 1.66031L12.3009 0.683421C12.3103 0.673301 12.3239 0.670602 12.334 0.661157C12.3442 0.649688 12.3482 0.634846 12.359 0.623377C13.1914 -0.207792 14.5441 -0.207792 15.3765 0.623377C16.2082 1.45589 16.2075 2.80992 15.3765 3.64109ZM2.37082 12.9654L1.89983 14.0995L3.03467 13.6293L2.37082 12.9654ZM4.21147 12.9202L12.9248 4.20712L11.794 3.07573L3.07933 11.7888L4.21147 12.9202ZM14.4338 1.56654C14.1212 1.25485 13.6143 1.25485 13.3017 1.56654C13.2922 1.57666 13.2787 1.58003 13.2685 1.5888C13.2584 1.60027 13.2543 1.61511 13.2435 1.62658L12.7367 2.13324L13.8674 3.26463L14.3736 2.75864C14.3844 2.74785 14.3987 2.74448 14.4095 2.73436C14.4196 2.72356 14.423 2.70939 14.4338 2.6986C14.7458 2.38624 14.7458 1.8789 14.4338 1.56654Z" fill-rule="evenodd" fill="#212529"></path>
    </svg>
  </button>`;

  wrapper.innerHTML += `<div class="item" tabIndex="0" aria-disabled="false" id="${id}">
  <a class="item-content h-align" href="${url}" title="${title}" rel="noopener noreferrer">
    <img src="${faviconURL(url)}" alt="${title}" />
    <p>${title}</p>
  </a>
</div>`;

  wrapper.dataset.id = id;
  wrapper.classList.add('item')
  return wrapper
}