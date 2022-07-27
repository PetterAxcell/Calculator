let options = {
    data: function(){
        return {
        }
    },
    template: `
    <div>
        <h1> CALCULATOR </h1>
        <Screen> </Screen>
        <NumbersCalculator></NumbersCalculator>
        <SymbolsCalculator></SymbolsCalculator>
    </div>
    `,
}

var app = Vue.createApp(options);

app.component('NumbersCalculator',{
    template:
    `
    <div v-for="row in 3">
        <button v-for="number in 3">{{row*number}}</button>
    </div>
    `
})
app.component('Screen',{
    template:
    `
    <input type="text">
    `
})
app.component('SymbolsCalculator',{
    template:
    `
    <button> + </button>
    <button> - </button>
    <button> x </button>
    <button> / </button>

    `
})
const vm = app.mount('#app');