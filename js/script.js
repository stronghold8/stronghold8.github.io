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



/* ============================================== hash reset ============================================== */
