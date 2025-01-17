/* typing animation */
var typed = new Typed(".typing",{
    strings:["Programmer", "", "King", "", "Dreamer" , ""],
    typeSpeed:100,
    BackSpeed:60,
    loop:true
})
/* ============================================== Aside ============================================== */
const nav = document.querySelector(".nav"), //1. 클래스 nav로 접근
    navList = nav.querySelectorAll("li"),   //2. nav클래스 안의 li 클래스를 모두 NodeList로 반환
    totalNavList = navList.length,  //3. li클래스들이 있는 NodeList의 요소 개수로 totalNavList 확인
    allSection = document.querySelectorAll(".section"), //4. section클래스를 모두 NodeList로 반환
        /*allSection은 모든 섹션을 NodeList화한다. li클래스랑은 별개로 움직인다. 
        ==> (2,3)이 시점에서 li 클래스와 section 클래스의 순서는 완전히 일치해야 한다. */
    totalSection = allSection.length;
    for(let i = 0; i<totalNavList; i++)
    {
        const a = navList[i].querySelector("a");
        a.addEventListener("click", function()
        {
            if (this.classList.contains("active")) return;
            removeBackSection();
            for(let j = 0; j<totalNavList; j++)
            {
                if(navList[j].querySelector("a").classList.contains("active"))
                {
                    addBackSection(j);
                    //allSection[j].classList.add("back-section")
                }
                navList[j].querySelector("a").classList.remove("active");
            }
            this.classList.add("active")
            showSection(this);
            if(window.innerWidth < 1200)
            {
                asideSectionTogglerBtn();
            }
        })
    }
    function removeBackSection()
    {
        for(let i = 0; i<totalSection; i++)
            {
                allSection[i].classList.remove("back-section");
            }
    }
    function addBackSection(num)
    {
        allSection[num].classList.add("back-section");
    }
    function showSection(element)
    {
        for(let i = 0; i<totalSection; i++)
        {
            allSection[i].classList.remove("active");
        }
        const target = element.getAttribute("href").split("#")[1];
        document.querySelector("#" + target).classList.add("active");
        history.pushState(null, null, "#" + target); // URL 해시 업데이트
    }
    function updateNav(element)
    {
        for(let i=0; i<totalNavList; i++)
        {
            navList[i].querySelector("a").classList.remove("active");
            const target = element.getAttribute("href").split("#")[1];
            if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
            {
                navList[i].querySelector("a").classList.add("active");
            }
        }
    }
    document.querySelector(".hire-me").addEventListener("click", function()
    {
        const sectionIndex = this.getAttribute("data-section-index");
        //console.log(sectionIndex);

        removeBackSection();

        showSection(this);
        updateNav(this);
        
        addBackSection(sectionIndex);
    })
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

      element.style.setProperty('--skew', `${skew}deg`)
      element.style.setProperty('--t1', `${top1}%`)
      element.style.setProperty('--b1', `${btm1}%`)
      element.style.setProperty('--t2', `${top2}%`)
      element.style.setProperty('--b2', `${btm2}%`)
      element.style.setProperty('--scale', `1`)

      count++

      if (count % 15 === 0) {
        const bigSkew = Math.random() * 180 - 90
        element.style.setProperty('--skew', `${bigSkew}deg`)
      }

      if (count % 30 === 0) {
        const bigScale = 1 + Math.random() / 2
        element.style.setProperty('--scale', `${bigScale}`)
      }
    }, 100)
  }

  const h1 = document.querySelector('.custom-text')
  glitch(h1)