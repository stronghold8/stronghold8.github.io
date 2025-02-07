/* typing animation */
var typed = new Typed(".typing",{
    strings:["Programmer", "", "King", "", "Dreamer" , ""],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})





/* ============================================== Aside ============================================== */
const nav = document.querySelector(".nav"), //문서의 첫 번째 nav클래스 선택 (하나 밖에 없음)
  navList = nav.querySelectorAll("li"),     //nav클래스 내의 모든 li요소 선택 (nav클래스 안에 있는 것들만 있음)
  allSection = document.querySelectorAll(".section"), //문서의 모든 section클래스 (home 'section', about 'section'들을 선택)
  totalSection = allSection.length;

// 메뉴 클릭 이벤트 등록
for (let i = 0; i < navList.length; i++) {  //navList의 크기 내에서 이동.
  const a = navList[i].querySelector("a");  //nav의 각 요소는 해당하는 a태그 하나 선택, 그 태그마다 이벤트 설정
  a.addEventListener("click", function (e) {
    e.preventDefault(); // 기본 동작 방지
    if (this.classList.contains("active"))
      {
        removeContainer();
        return;
      }  //this = a

    // 이전 섹션에 back-section 클래스 추가
    for (let j = 0; j < navList.length; j++) {
      if (navList[j].querySelector("a").classList.contains("active")) {   //액티브인 aside의 a요소를 찾고
        const activeTarget = navList[j].querySelector("a").getAttribute("data-target"); //그 요소의 data-target을 저장. activeTarget = about 이런 식으로.
        updateBackSection(activeTarget); // 이전 섹션에만 back-section 추가
      }
      navList[j].querySelector("a").classList.remove("active");
    }

    // 현재 클릭한 메뉴 활성화
    this.classList.add("active");
    showSection(this); // 새로운 섹션 활성화  this = a

    // 반응형에서 aside 토글 버튼 처리 (옵션)
    if (window.innerWidth < 1200) {
      asideSectionTogglerBtn();
    }
    removeContainer()
  });
}

// back-section 업데이트 함수 (항상 하나만 유지)
function updateBackSection(targetId) {
  // 모든 섹션에서 back-section 제거
  allSection.forEach(section => section.classList.remove("back-section"));

  // 새롭게 지정된 섹션에 back-section 추가
  const section = document.getElementById(targetId);
  if (section) section.classList.add("back-section");
}

// 섹션 표시 함수
function showSection(element) {     //매개변수를 특정 a로 넘김
  const targetId = element.getAttribute("data-target"); // 특정 a의 data-target으로 대상 식별

  // 모든 섹션 비활성화
  allSection.forEach(section => section.classList.remove("active"));

  // 대상 섹션 활성화
  const targetSection = document.getElementById(targetId);
  if (targetSection) targetSection.classList.add("active");

  // URL 해시 업데이트
  history.pushState(null, null, `#${targetId}`);
}

// Nav 업데이트 함수 (선택적으로 사용 가능)
function updateNav(element) {
  const targetId = element.getAttribute("data-target");
  navList.forEach(navItem => {
    const a = navItem.querySelector("a");
    a.classList.toggle(
      "active",
      a.getAttribute("data-target") === targetId
    );
  });
}


/*
        // 버튼 클릭 이벤트 추가
const customButtons = document.querySelectorAll(".custom-button");

customButtons.forEach(button => {
  button.addEventListener("click", function () {
    const targetId = this.getAttribute("data-target"); // 버튼의 data-target 값

    setBackSection();

    // 섹션 활성화
    showSectionById(targetId);

    // Nav 메뉴 업데이트 (옵션)
    updateNavById(targetId);

    // URL 해시 업데이트
    history.pushState(null, null, `#${targetId}`);
  });
});

*/





// 이전 섹션을 back-section으로 설정
function setBackSection() {
  // 모든 섹션에서 기존의 back-section 제거
  allSection.forEach(section => section.classList.remove("back-section"));

  const currentActive = document.querySelector(".section.active");
  console.log("Current Active Section:", currentActive); // 디버깅 메시지
  if (currentActive) {
    currentActive.classList.add("back-section");
    console.log("Back Section added:", currentActive); // 디버깅 메시지
  } else {
    console.warn("No active section found.");
  }
}

// 섹션 활성화 함수 (ID로 직접 활성화)
function showSectionById(targetId) {
  allSection.forEach(section => section.classList.remove("active"));

  const targetSection = document.getElementById(targetId);
  if (targetSection) targetSection.classList.add("active");
}

// Nav 메뉴 업데이트 함수 (ID 기준)
function updateNavById(targetId) {
  navList.forEach(navItem => {
    const a = navItem.querySelector("a");
    a.classList.toggle(
      "active",
      a.getAttribute("data-target") === targetId
    );
  });
}




    const navTogglerBtn = document.querySelector(".nav-toggler"),
        aside = document.querySelector(".aside");
        navTogglerBtn.addEventListener("click", () => 
        {
            asideSectionTogglerBtn();
        })
        function asideSectionTogglerBtn()
        {
            aside.classList.toggle("open");
            navTogglerBtn.classList.toggle("open");
            for(let i = 0; i<totalSection; i++)
            {
                allSection[i].classList.toggle("open");
            }
        }

        window.addEventListener("load", () => {
            const hash = window.location.hash; // 현재 URL의 해시 값 가져오기
            if (hash) {
                const target = document.querySelector(hash);
                if (target) {
                    // 모든 섹션 초기화
                    allSection.forEach(section => section.classList.remove("active"));
                    // 해시 섹션 활성화
                    target.classList.add("active");
        
                    // 네비게이션도 업데이트
                    updateNav(document.querySelector(`a[href="${hash}"]`));
                }
            }
        });



/* ============================================== 개인 로그  ============================================== */

async function loadExperience() {
    try {
      const response = await fetch('json/log.json'); // JSON 파일 경로
      const data = await response.json();
  
      // 기존 타임라인의 shadow-dark 내부에 새 항목 추가
      const experienceTimeline = document.querySelector('.experience .timeline.shadow-dark');
      
      data.experience.forEach(item => {
        const newItem = `
          <div class="timeline-item">
            <div class="circle-dot"></div>
            <h3 class="timeline-date"><i class="fa fa-calendar"></i> ${item.date}</h3>
            <h4 class="timeline-title">${item.title}</h4>
            <p class="timeline-text">${item.text}</p>
          </div>
        `;
        experienceTimeline.innerHTML += newItem; // 새로운 항목 추가
      });
    } catch (error) {
      console.error('JSON 데이터를 로드하는 중 오류 발생:', error);
    }
  }
  
  // 페이지 로드 시 실행
  document.addEventListener('DOMContentLoaded', loadExperience);
  

  // 초기화 함수: 첫 로딩 시 home 활성화
function initializeActiveSection() {
  const defaultSectionId = "home"; // 초기 활성화할 섹션 ID
  const defaultNav = document.querySelector(`a[data-target="${defaultSectionId}"]`);

  // 모든 섹션 초기화
  allSection.forEach(section => {
    section.classList.remove("active", "back-section");
  });

  // 모든 네비게이션 항목 초기화
  navList.forEach(navItem => {
    navItem.querySelector("a").classList.remove("active");
  });

  // home 섹션과 관련 네비게이션 항목 활성화
  if (defaultNav) {
    defaultNav.classList.add("active");
    const defaultSection = document.getElementById(defaultSectionId);
    if (defaultSection) defaultSection.classList.add("active");
  }
}

// 페이지 로드 시 초기화
window.addEventListener("DOMContentLoaded", initializeActiveSection);



/* ============================================== 연혁  ============================================== */

async function loadEducation() {
    try {
      const response = await fetch('json/timeline.json'); // JSON 파일 경로
      const data = await response.json();
  
      // 기존 타임라인의 shadow-dark 내부에 새 항목 추가
      const educationTimeline = document.querySelector('.education .timeline.shadow-dark');
      
      data.education.forEach(item => {
        const newItem = `
          <div class="timeline-item">
            <div class="circle-dot"></div>
            <h3 class="timeline-date"><i class="fa fa-calendar"></i> ${item.date}</h3>
            <h4 class="timeline-title">${item.title}</h4>
            <p class="timeline-text">${item.text}</p>
          </div>
        `;
        educationTimeline.innerHTML += newItem; // 새로운 항목 추가
      });
    } catch (error) {
      console.error('JSON 데이터를 로드하는 중 오류 발생:', error);
    }
  }
  
  // 페이지 로드 시 실행
  document.addEventListener('DOMContentLoaded', loadEducation);



  function glitch(element) {
    let count = 0
    setInterval(() => {
      // element
      const skew = Math.random() * 20 - 10
      // element::before
      const top1 = Math.random() * 100
      const btm1 = Math.random() * 100
      // element::after
      const top2 = Math.random() * 100
      const btm2 = Math.random() * 100

      //element.style.setProperty('--skew', `${skew}deg`)
      element.style.setProperty('--t1', `${top1}%`)
      element.style.setProperty('--b1', `${btm1}%`)
      element.style.setProperty('--t2', `${top2}%`)
      element.style.setProperty('--b2', `${btm2}%`)

      
      
    }, 100)
  }

  const h1 = document.querySelector('.custom-text')
  glitch(h1)





/* ============================================== Contents-Container============================================== */
//카테고리 별로 컨테이너를 로딩하는 기능
const contents = document.querySelector("#contents"), //content section으로 접근
  contentsList = contents.querySelectorAll(".content-item.padd-15");  //content-item들을 모두 선택
  
for (let i = 0; i < contentsList.length; i++) //item개수만큼 반복해서 항목을 생성한다.
{
  const a = contentsList[i].querySelector(".content-item-inner"); //각 item에서 하나 안으로 접근
  a.addEventListener("click", function(e) //클릭 이벤트를 설정
  {
    e.preventDefault(); // 기본 동작 방지
    if (this.classList.contains("active")) return; //this = a = 해당 item inner
    showContainer(this); //item들마다 각각 다른 container를 show.
  })

  
};

function showContainer(element)
{
  const contentId = element.getAttribute("data-target"); //contentId = javascript
  const contentsContainer = document.querySelector(`.contents-container#${contentId}`);
  contentsContainer.classList.add("active");  
};

function removeContainer()
{
  const contentsContainer = document.querySelector(".contents-container.active");
  if(contentsContainer == null)
  {
    return;
  }
  else
  {
    contentsContainer.classList.remove("active");
    closePost();
  }
}

/* ============================================== Category-inner-boxes ============================================== */
//카테고리 클릭 시, 포스트 아이템들을 박스로 만들어서 미리보기로 show

const categories = ['javascript', 'data-structure', 'ai', 'java', 'network', 'math', 'blog', 'minecraft', 'chinese', 'japanese', 'cpp', 'python'];

for (let i = 0; i < categories.length; i++){
  const category = categories[i];
  const parentElement = document.querySelector(`.contentsGroup .contents-container#${category} .row.items`);
  fetch(`json/contents/${category}/${category}.json`)
    .then(response => {
      if (!response.ok){
        console.log(`${category} 파일 없음`);
        return null;
      }
      return response.json();
    })
    .then(data=> {
      data.forEach((item) => {
        // 각 항목에 대한 새로운 div 요소 생성
      const newDiv = document.createElement("div");
      newDiv.classList.add("content-item", "padd-15");  // 항목에 해당하는 클래스 추가
      newDiv.dataset.fileName = item["file-name"];

      const innerDiv = document.createElement("div");
      innerDiv.classList.add("content-item-inner");

      const iconDiv = document.createElement("div");
      iconDiv.classList.add("icon");
      
      const svgIconDiv = document.createElement("img");
      svgIconDiv.src = (`images/contents-logo/${item["icon"]}`);
      svgIconDiv.classList.add("mysvg");
      iconDiv.appendChild(svgIconDiv);

      const titleElement = document.createElement("h4");
      titleElement.textContent = item.title;
      const contentsElement = document.createElement("p");
      contentsElement.textContent = item.date;

      //3개를 전부 content-item-inner에 append
      innerDiv.appendChild(iconDiv);
      innerDiv.appendChild(titleElement);
      innerDiv.appendChild(contentsElement);
      
      //content-item-inner을 content-item padd-15에 append
      newDiv.appendChild(innerDiv);

      // 완성된 newDiv를 부모 요소에 추가
      parentElement.appendChild(newDiv);
      })
    })
    .catch(error => console.error("Error loading JSON:", error));  // 에러 처리
    
}

/* ============================================== Post Contents============================================== */
//실제 포스트 내용을 show.
//이벤트 델리게이션
for (let i = 0; i < categories.length; i++){
  const category = categories[i];
  const postArea = document.querySelector(`.contentsGroup .contents-container#${category} .row.items`);

  postArea.addEventListener("click", function(e){
    if(e.target && (
      e.target.classList.contains("mysvg")
      || e.target.classList.contains("icon")
      || e.target.classList.contains("content-item-inner")
      || e.target.tagName === "H4"
      || e.target.tagName === "P"
      )
    ){
      const contentItem= e.target.closest(".content-item");
      const target_container = contentItem.closest(".contents-container");
      const target_category = target_container.id;
      
      if(contentItem) {
        const fileName = contentItem.dataset.fileName;
  
        
        showPost(fileName, target_category);
      }
    }
  })
}


function showPost(fileName, target_category)
{
  if(fileName){
    openPost();
    fetch(`json/contents/${target_category}/${fileName}`)
    .then(response => {
      if(!response.ok) {
        throw new Error("파일 없음");
      }
      return response.json();
    })
    .then(data => {
      
      loadPost(data,target_category);


      
    })
    .catch(error => {
      console.log("에러 발생:", error.message);
    })
  }
}

function loadPost(data, target_category)
{
  const postContainer = document.querySelector(`.postGroup .post-container`);
  const title = postContainer.querySelector(".section-title.padd-15 .a");
  const sub_Title = postContainer.querySelector(".post-subtitle.padd-15 .b");
  const content = postContainer.querySelector(".post-text.padd-15 .c");
  const buttonCat = postContainer.querySelector(".back-to-category-button .buttonCat");
/*
  const titleDiv = document.createElement("h2");
  titleDiv.textContent = data.title;
  
  const sub_titleDiv = document.createElement("h3");
  sub_titleDiv.textContent = data.subTitle;

  const textDiv = document.createElement("p");
  textDiv.textContent = data.content;

  title.appendChild(titleDiv);
  sub_Title.appendChild(sub_titleDiv);
  content.appendChild(textDiv);
*/
  title.textContent = data.title;
  sub_Title.textContent = data.subTitle;
  content.textContent = data.content;
  buttonCat.textContent = target_category;
  content.style.whiteSpace = "pre-line";
}



function openPost()
{
  const postContainer = document.querySelector(`.postGroup .post-container`)
  postContainer.classList.add("active");
}

function closePost()
{
  const postContainer = document.querySelector(".post-container.active");
  if(postContainer == null)
  {
    return;
  }
  else
  {
    postContainer.classList.remove("active");
  }
}

function removePost()
{
  closePost();
}




/*
const contentId = element.getAttribute("data-target"); //contentId = javascript
  const contentsContainer = document.querySelector(`.contents-container#${contentId}`);
  contentsContainer.classList.add("active"); */