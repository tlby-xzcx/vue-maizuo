//全局混入
export const myMixin = {
    data() {
        return {
            count: 2021,
            city: {}
        }
    },
    mounted() {
        // console.log("欢迎--混入");
        if (localStorage.city) {
            this.city = JSON.parse(localStorage.city)
        }
    }
}

export const animate = {
    data() {
        return {
            animateClass: "enter"
        }
    },
    beforeRouterEnter(to, from, next) {
        next();
    },
    beforeRouterLeave(to, from, next) {
        this.animateClass = "leave";
        next();
    }
}