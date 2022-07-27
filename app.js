let options = {
    data: function(){
        return {
            newText : "",
            symbols : ['+', '-', 'x', '/', '='],
            currentSymbol : ""
        }
    },
    methods:{
        CheckSymbol(){
            //This function checks if there are a symbol
            let flag = false;
            for (let i =0; i<this.symbols.length; i++){
                if(this.newText.charAt(this.newText.length - 1) == this.symbols[i]){flag=true;}
            }
            return flag
        },
        AddSymbol(sym){
            //Add a symbol or replace the last symbol
            let flag = this.CheckSymbol()
            if(flag){this.newText = this.newText.substring(0, this.newText.length - 1) + sym}
            else{this.newText = this.newText + sym}
        },
        AddNumber(number){
            //Add a number
            this.newText=this.newText + number
        }
    },
    template: `
    <div>
        <h1> CALCULATOR </h1>
        <Screen :text=newText :symbolsVector=symbols> </Screen>
        <NumbersCalculator v-on:number="AddNumber($event)"></NumbersCalculator>
        <SymbolsCalculator :symbolsVector=symbols v-on:newSymbol="AddSymbol($event)"></SymbolsCalculator>
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
    props:['text'],
    watch:{
        text:function(){
            this.textScreen = this.text
            this.calculate()
        }
    },
    methods:{
        calculate(){
            
        }
    },
    template:
    `
    <input type="text" v-model="textScreen">
    `
})
app.component('SymbolsCalculator',{
    data: function()
    {
        return{
            
        }
    },
    props: ['symbolsVector'],
    emits:['newSymbol'],
    methods:{
        getSymbol(x){
            this.$emit('newSymbol',x)
        }
    },
    template:
    `
    <button v-for="symbol in symbolsVector" v-on:click="getSymbol(symbol)" >{{symbol}}</button>

    `
})
const vm = app.mount('#app');