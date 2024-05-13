function GapDate(target) {
    let t = document.querySelector(target);
    // let stamp = new Date().getTime();   
    let stamp = Math.floor(window.performance.now() * 100); // 아이디 충돌 방지
    console.log(stamp);
    // console.log(t);
    let startDate = null;
    let endDate = null;
    this.init = function() {
        t.innerHTML = `<input type="date" id="startDate_${stamp}">
                        <div id="endDate_${stamp}"></div>`;


        startDate = document.querySelector(`#startDate_${stamp}`);
        endDate = document.querySelector(`#endDate_${stamp}`);
        startDate.oninput = function(e) {
            
            endDate.innerHTML = `${getDate(e.target.value)}일 경과`;
        }
    }

    let getDate = function(startDate) {
        return Math.round((new Date().getTime()
            - new Date(startDate).getTime()) 
            / (1000 * 60 * 60 * 24));
    }
}