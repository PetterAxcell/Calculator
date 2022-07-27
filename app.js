let options = {
    data: function(){
        return {
            currentNumber : "",
        }
    },
    template: `
    <div>
        <h1> CALCULATOR </h1>
        <Screen :newNumber=currentNumber> </Screen>
        <NumbersCalculator v-on:number="currentNumber=currentNumber + $event"></NumbersCalculator>
        <SymbolsCalculator></SymbolsCalculator>
    </div>
    `,
}

var app = Vue.createApp(options);

app.component('NumbersCalculator',{
    data: function()
    {
        return{
            
        }
    },
    emits:['number'],
    methods:{
        getNumber(x,y){
            let whichNumber = 3*(x-1)+y;
            this.$emit('number',whichNumber)
        }
    },
    template:
    `
    <div v-for="row in 3">
        <button v-on:click="getNumber(row, number)" v-for="number in 3">{{3*(row-1)+number}}</button>
    </div>
    `
})
app.component('Screen',{
    data: function()
    {
        return{
            textScreen : "",
        }
    },
    props:['newNumber'],
    watch:{
        newNumber:function(){
            this.textScreen = this.newNumber
        }
    },
    template:
    `
    <input type="text" v-model="textScreen">
    `
})
app.component('SymbolsCalculator',{
    template:
    `
    <button> + </button>
    <button> - </button>
    <button> x </button>
    <button> / </button>
    <button> = </button>

    `
})
const vm = app.mount('#app');